import React, { useState, useEffect } from 'react';
import Filter from '../Filtering/Filtering';
import BookCard from './BookCard';
import SearchBar from './SearchBar';

const gradeRangeMetadata = ['0 to Pre-K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
const ageRangeMetadata = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function CardsDisplay() {
  // Searching
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');
  const [defaultSearch, setDefaultSearch] = useState(true);

  // Filtering
  const [filteredCards, setFilteredCards] = useState([]);
  const [rangeInput, setRangeInput] = useState({
    age: { min: ageRangeMetadata[0], max: ageRangeMetadata[18] },
    grade: { min: gradeRangeMetadata[0], max: gradeRangeMetadata[12] },
  });
  const [multiSelectInput, setMultiSelectInput] = useState({
    Ethnicity: [],
    Religion: [],
    Gender: [],
    Sexuality: [],
  });

  const getCards = () => {
    base('Book').select({ view: 'Grid view' }).all()
      .then((records) => {
        setAllBooks(records);
        setFilteredCards(records);
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
    match = title.includes(searchTerms)
    || desc.includes(searchTerms)
    || identity.includes(searchTerms);
    return match;
  };

  const SearchFilter = (table, field) => new Promise((resolve, reject) => {
    // Query Airtable {table} for records whose {field} value matches the search term
    // This will mainly be for Creator table

    base(table).select({
      filterByFormula: `IF(FIND(LOWER("${searchTerms}"), LOWER(name)) != 0, ${field}, '')`,
      view: 'Grid view',
    }).all()
      .then((records) => {
        const res = [];
        records.forEach((record) => {
          const bookIds = record.get('authored'); // array of strings (bookId)
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
    setSearchTerms(searchTerms.toLowerCase());
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

  useEffect(() => {
    if (!allBooks.length) { getCards(); }
    if (searchTerms) {
      (async () => searchByTerm())();
    } else {
      setFilteredBooks(allBooks);
    }
  }, [allBooks, searchTerms, defaultSearch]);

  // Filter function
  useEffect(() => {
    const validGradeTags = gradeRangeMetadata.slice(
      gradeRangeMetadata.indexOf(rangeInput.grade.min),
      gradeRangeMetadata.indexOf(rangeInput.grade.max) + 1,
    );
    const validAgeTags = ageRangeMetadata.slice(
      ageRangeMetadata.indexOf(rangeInput.age.min),
      ageRangeMetadata.indexOf(rangeInput.age.max) + 1,
    );
    console.log(rangeInput);
    console.log(multiSelectInput);
    console.log(allBooks);

    setFilteredCards(allBooks.filter(
      (record) => (record.fields.age_range.some((val) => validAgeTags.indexOf(val) !== -1)
    && record.fields.grade_range.some((value) => validGradeTags.indexOf(value) !== -1))
    && (multiSelectInput.Ethnicity.length === 0
       || (record.fields['race/ethnicity'] !== undefined
         ? record.fields['race/ethnicity'].some((value) => multiSelectInput.Ethnicity.indexOf(value) !== -1)
         : true))
    && (multiSelectInput.Religion.length === 0
      || (record.fields.religion !== undefined
        ? record.fields.religion.some((value) => multiSelectInput.Religion.indexOf(value) !== -1)
        : true))
    && (multiSelectInput.Sexuality.length === 0
      || (record.fields.sexuality !== undefined
        ? record.fields.sexuality.some((value) => multiSelectInput.Sexuality.indexOf(value)
         !== -1)
        : true
      ))
    && (multiSelectInput.Gender.length === 0
      || (record.fields.gender !== undefined
        ? record.fields.gender.some((value) => multiSelectInput.Gender.indexOf(value) !== -1)
        : true)),

    ));
  }, [rangeInput, multiSelectInput]);

  useEffect(() => { getCards(); }, []);
  useEffect(() => {
  }, [filteredCards]);

  return (
    <div>
      <SearchBar setSearchTerms={setSearchTerms} setDefaultSearch={setDefaultSearch} />
      <Filter
        setRangeState={setRangeInput}
        setMultiSelectInput={setMultiSelectInput}
      />
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

/*
  NOTES:
    - inefficient lookup of a Creator's authored/illustrated
      - maybe put all books into a some data structure that has fast lookup and pass it
        to searchByTerm???
          - books is a Map<bookId, book> instead of Array
      - hard to see the current algorithm will be too slow for our purposes
         without having a big amount of data alr
*/
