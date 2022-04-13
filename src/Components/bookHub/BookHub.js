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
  searchTerms, defaultSearch, alignment, rangeInput, multiSelectInput,
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
        - we may want to match by a combo of title, description, identity
            - refactor this to |= the _.includes() calls for each field
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
    match = title.includes(lowercaseTerms)
    || desc.includes(lowercaseTerms)
    || identity.includes(lowercaseTerms);
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
    // setSearchTerms(searchTerms.toLowerCase());
    if (defaultSearch) {
      // title/description/identity
      matched = allBooks.filter(isMatchTitleDescIdentity);
    } else {
      // we can figure out how to filter both fields at once later
      let res = await SearchFilter('Creator', 'authored');
      matched.push(...res);
      res = await SearchFilter('Creator', 'illustrated');
      matched.push(...res);

      matched = [...new Set(matched)];
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
  }, [allBooks, searchTerms, defaultSearch, alignment]);

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
          // console.log(record);
          const incomingGradeTags = gradeRangeMetadata.slice(
            gradeRangeMetadata.indexOf(record.fields.grade_min),
            gradeRangeMetadata.indexOf(record.fields.grade_max) + 1,
          );
          const incomingAgeTags = ageRangeMetadata.slice(
            ageRangeMetadata.indexOf(`${record.fields.age_min}`),
            ageRangeMetadata.indexOf(`${record.fields.age_max}`) + 1,
          );
          // console.log(incomingAgeTags);
          // console.log(validAgeTags);
          // console.log(incomingAgeTags.some((val) => validAgeTags.indexOf(val) !== -1));

          return ((incomingAgeTags.some((val) => validAgeTags.indexOf(val) !== -1)
      && incomingGradeTags.some((value) => validGradeTags.indexOf(value) !== -1))
      && (multiSelectInput['Race/Ethnicity'].length === 0
         || (record.fields['Race/Ethnicity'] !== undefined
           ? record.fields['Race/Ethnicity'].some((value) => multiSelectInput['Race/Ethnicity'].indexOf(value) !== -1)
           : false))
      && (multiSelectInput.Religion.length === 0
        || (record.fields.Religion !== undefined
          ? record.fields.Religion.some((value) => multiSelectInput.Religion.indexOf(value) !== -1)
          : false))
      && (multiSelectInput['Identity Tags'].length === 0
        || (record.fields['Identity Tags'] !== undefined
          ? record.fields['Identity Tags'].some((value) => multiSelectInput['Identity Tags'].indexOf(value)
           !== -1)
          : false
        ))
      && (multiSelectInput['Theme/Lessons'].length === 0
        || (record.fields['Theme/Lessons'] !== undefined
          ? record.fields['Theme/Lessons'].some((value) => multiSelectInput['Theme/Lessons'].indexOf(value)
           !== -1)
          : false
        ))
      && (multiSelectInput['Book Type'].length === 0
        || (record.fields['Book Type'] !== undefined
          ? record.fields['Book Type'].some((value) => multiSelectInput['Book Type'].indexOf(value)
           !== -1)
          : false
        ))
      && (multiSelectInput.Genre.length === 0
        || (record.fields.Genre !== undefined
          ? record.fields.Genre.some((value) => multiSelectInput.Genre.indexOf(value) !== -1)
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
                author={card.fields.author !== undefined ? card.fields.author[0] : 'MISSING AUTHOR'}
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
  defaultSearch: PropTypes.bool.isRequired,
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

    MERGING  👹👹👹👹👹👹👹👹👹👹
      - First need to refactor so that we only need filteredBooks for both features
        - add a prop that specifies whether we are searching or filtering
          - use this prop to determine which logic we need to use to populate filteredBooks
      = DONE

      - need to move <Filter/> into BookBrowser
        - Move all Filter logic state up into BookBrowser
          - pass them down as props instead
      = DONE

      - want to reset filteredBooks when we switch alignment?
        - search => filter: clear searchTerms in BookBrowser
        - filter => search:

      UI CHANGES
        filtering parameters should fit in "BrowserBody" in BookBrowser.js
          - this is the bottom half of the browser underneath the search/filter toggle
          - currently is a popup menu

*/
