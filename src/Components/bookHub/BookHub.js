import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import BookCard from './BookCard';
import { gradeRangeMetadata, ageRangeMetadata } from '../Filtering/RangeFilter';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function CardsDisplay({
  searchTerms, searchCategory, alignment, rangeInput, multiSelectInput,
}) {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const getCards = () => {
    base('Book').select({ view: 'Grid view' }).all()
      .then((records) => {
        setAllBooks(records);
      });
  };

  const isMatchTitleDescIdentity = (book) => {
    // Filter function for books stored in 'books' state
    /* FOR FUTURE DEV
        On Airtable, there is identity_tags and identity. We may need to change this
        code to reflect that depending on final design.
          - identities = identity_tags.map(tag => tag.toLowerCase())
          - any(identities.map(identity => identity.includes(lowercaseTerms)))
    */
    if (!book) return false;
    let title = book.get('title');
    let desc = book.get('description');
    let identity = book.get('identity');

    // need to error check before using toLowerCase()
    title = (title) ? title.toLowerCase() : '';
    desc = (desc) ? desc.toLowerCase() : '';
    identity = (identity) ? identity.toLowerCase() : '';

    let match = false;
    const lowercaseTerms = searchTerms.toLowerCase();

    if (searchCategory === 'title') match = title.includes(lowercaseTerms);
    if (searchCategory === 'description') match = desc.includes(lowercaseTerms);
    if (searchCategory === 'identity') match = identity.includes(lowercaseTerms);

    if (searchCategory === 'all') {
      match = title.includes(lowercaseTerms)
              || desc.includes(lowercaseTerms)
              || identity.includes(lowercaseTerms);
    }

    return match;
  };

  const SearchFilter = (table, field) => new Promise((resolve, reject) => {
    // Query Airtable {table} for records whose {field} value matches the search term
    // This will mainly be for Creator table
    const lowercaseTerms = searchTerms.toLowerCase();

    base(table).select({
      filterByFormula: `IF(FIND(LOWER("${lowercaseTerms}"), LOWER(name)) != 0, ${field}, '')`,
      view: 'Grid view',
    }).all()
      .then((records) => {
        const res = [];
        records.forEach((record) => {
          const bookIds = record.get(field); // array of strings (bookId)
          bookIds.forEach((bookId) => {
            const book = allBooks.find((x) => x.get('id') === bookId);
            res.push(book);
          });
        });
        resolve(res);
      })
      .catch((err) => { reject(err); });
  });

  const searchByTerm = async () => {
    let matched = [];
    const isTitleDescIdentity = searchCategory === 'all'
                              || searchCategory === 'title'
                              || searchCategory === 'description'
                              || searchCategory === 'identity';

    const isAuthorIllustrator = searchCategory === 'all'
                              || searchCategory === 'author'
                              || searchCategory === 'illustrator';

    if (isTitleDescIdentity) {
      matched.push(...allBooks.filter(isMatchTitleDescIdentity));
    }
    if (isAuthorIllustrator) {
      let res;
      if (searchCategory === 'author' || searchCategory === 'all') {
        res = await SearchFilter('Creator', 'authored');
        matched.push(...res);
      }
      if (searchCategory === 'illustrator' || searchCategory === 'all') {
        res = await SearchFilter('Creator', 'illustrated');
        matched.push(...res);
      }

      matched.filter((book) => book); // Remove undefined values
      matched = [...new Set(matched)]; // Remove duplicates
    }

    setFilteredBooks(matched);
  };

  /* We will separate useEffect for *hopefully* clearer code */
  // Grab books from Airtable if nothing is in local state
  useEffect(() => { if (!allBooks.length) { getCards(); } }, [allBooks]);

  // Search function
  useEffect(() => {
    if (alignment === 'Search') {
      if (searchTerms) {
        (async () => searchByTerm())();
      } else {
        setFilteredBooks(allBooks);
      }
    }
  }, [allBooks, searchTerms, searchCategory, alignment]);

  // Filter function
  useEffect(() => {
    if (alignment === 'Filter') {
      const validGradeTags = gradeRangeMetadata.slice(
        gradeRangeMetadata.indexOf(rangeInput.grade.min),
        gradeRangeMetadata.indexOf(rangeInput.grade.max) + 1,
      );
      const validAgeTags = ageRangeMetadata.slice(
        ageRangeMetadata.indexOf(rangeInput.age.min),
        ageRangeMetadata.indexOf(rangeInput.age.max) + 1,
      );

      setFilteredBooks(allBooks.filter(
        (record) => {
          const incomingGradeTags = gradeRangeMetadata.slice(
            gradeRangeMetadata.indexOf(record.fields.grade_min),
            gradeRangeMetadata.indexOf(record.fields.grade_max) + 1,
          );
          const incomingAgeTags = ageRangeMetadata.slice(
            ageRangeMetadata.indexOf(`${record.fields.age_min}`),
            ageRangeMetadata.indexOf(`${record.fields.age_max}`) + 1,
          );

          return ((incomingAgeTags.some((val) => validAgeTags.indexOf(val) !== -1)
      && incomingGradeTags.some((value) => validGradeTags.indexOf(value) !== -1))
      && (multiSelectInput['race/ethnicity'].length === 0
         || (record.fields['race/ethnicity'] !== undefined
           ? record.fields['race/ethnicity'].some((value) => multiSelectInput['race/ethnicity'].indexOf(value) !== -1)
           : false))
      && (multiSelectInput.religion.length === 0
        || (record.fields.religion !== undefined
          ? record.fields.religion.some((value) => multiSelectInput.religion.indexOf(value) !== -1)
          : false))
      && (multiSelectInput.identity_tags.length === 0
        || (record.fields.identity_tags !== undefined
          ? record.fields.identity_tags.some((value) => multiSelectInput['identity tags'].indexOf(value)
           !== -1)
          : false
        ))
      && (multiSelectInput['theme/lessons'].length === 0
        || (record.fields['theme/lessons'] !== undefined
          ? record.fields['theme/lessons'].some((value) => multiSelectInput['theme/lessons'].indexOf(value)
           !== -1)
          : false
        ))
      && (multiSelectInput.book_type.length === 0
        || (record.fields.book_type !== undefined
          ? record.fields.book_type.some((value) => multiSelectInput['Book type'].indexOf(value)
           !== -1)
          : false
        ))
      && (multiSelectInput.genre.length === 0
        || (record.fields.genre !== undefined
          ? record.fields.genre.some((value) => multiSelectInput.genre.indexOf(value) !== -1)
          : false)));
        },

      ));
    }
  }, [rangeInput, multiSelectInput, alignment]);

  return (
    <div>
      <div className="library-display">
        {filteredBooks.map((card) => (
          (card)
            ? (
              <BookCard
                key={card.id}
                id={card.id}
                title={card.fields.title !== undefined ? card.fields.title : 'MISSING TITLE'}
                author={card.fields.author !== undefined ? card.fields.author : ['MISSING CREATOR']}
                image={card.fields.image !== undefined ? card.fields.image[0].url : 'MISSING IMAGE'}
              />
            ) : null
        ))}
      </div>

    </div>
  );
}

export default CardsDisplay;

CardsDisplay.propTypes = {
  searchTerms: PropTypes.string.isRequired,
  searchCategory: PropTypes.string.isRequired,
  alignment: PropTypes.string.isRequired,
  rangeInput: PropTypes.objectOf(PropTypes.object).isRequired,
  multiSelectInput: PropTypes.objectOf(PropTypes.object).isRequired,
};

/*
  NOTES:
    - inefficient lookup of a Creator's authored/illustrated
      - maybe put all books into a some data structure that has fast lookup and pass it
        to searchByTerm???
          - books is a Map<bookId, book> instead of Array
      - hard to see the current algorithm will be too slow for our purposes
         without having a big amount of data alr
*/
