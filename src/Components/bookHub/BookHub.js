import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import BookList from '../BookList/BookList';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function CardsDisplay() {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');
  const [defaultSearch, setDefaultSearch] = useState(true);

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
    match = title.includes(searchTerms)
    || desc.includes(searchTerms)
    || identity.includes(searchTerms);
    return match;
  };

  const Filter = (table, field) => new Promise((resolve, reject) => {
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
      let res = await Filter('Creator', 'authored');
      matched.push(...res);
      res = await Filter('Creator', 'illustrated');
      matched.push(...res);

      matched.filter((book) => book); // Remove undefined values
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

  return (
    <div>
      <SearchBar setSearchTerms={setSearchTerms} setDefaultSearch={setDefaultSearch} />
      <BookList books={filteredBooks} />
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
