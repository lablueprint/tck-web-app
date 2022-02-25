import React, { useState, useEffect } from 'react';
import Card from './BookCard';
import SearchBar from './SearchBar';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

/*
  NOTES:
    - inefficient lookup of a Creator's authored/illustrated
      - maybe put all books into a some data structure that has fast lookup and pass it
        to searchByTerm???
          - books is a Map<bookId, book> instead of Array
      - hard to see the current algorithm will be too slow for our purposes
         without having a big amount of data alr

  <SearchBar setSearchTerms={setSearchTerms}>

  */
function CardsDisplay() {
  const [books, setBooks] = useState([]);
  const [cards, setCards] = useState([]);
  const [searchTerms, setSearchTerms] = useState(''); // searchTerms should be all lowercase !!
  const [defaultSearch, setDefaultSearch] = useState(true);

  // const [matchedBooks, setMatchedBooks] = useState([]);

  const getCards = () => {
    base('Book').select({ view: 'Grid view' }).all()
      .then((records) => {
        setBooks(records);
      });
  };

  /*
  const getCreator = async (tableName, entryId) => new Promise((resolve, reject) => {
    base(tableName).find(entryId, (err, creatorRecord) => {
      if (err) {
        reject();
      }
      resolve(creatorRecord);
    });
  });
  */

  const isMatch = (book) => {
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

  /*
    table: string for the airtable we wanna look at
    field: string for the field of the table we wanna look at
            authored
            illustrated

  */
  const Filter = (table, field) => new Promise((resolve, reject) => {
    // Query Airtable {table} for records whose {field} value matches the search term
    // This will mainly be for Creator table
    /*
    base(table).select({
      filterByFormula: `IF(FIND(LOWER("${searchTerms}"), LOWER(name)) != 0, ${field}, '')`,
      maxRecords: 3,
      view: 'Grid view',
    }).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        const bookId = record.get('authored'); // array of strings (bookId)

        for (let i = 0; i < bookId.length; i += 1) {
          for (let j = 0; j < books.length; j += 1) {
            if (bookId[i] === books[j].get('id')) {
              // newArr = [...oldArr, x]
              if (!matchedBooks.includes(books[j])) {
                setMatchedBooks([...matchedBooks, books[j]]);
              }
            }
          }
        }
      });
      fetchNextPage();
    }, (err) => {
      if (err) { reject(err); }
    });
    */
    base(table).select({
      filterByFormula: `IF(FIND(LOWER("${searchTerms}"), LOWER(name)) != 0, ${field}, '')`,
      view: 'Grid view',
    }).all()
      .then((records) => {
        console.log(records);
        const res = [];
        records.forEach((record) => {
          const bookIds = record.get('authored'); // array of strings (bookId)
          bookIds.forEach((bookId) => {
            const book = books.find((x) => x.get('id') === bookId);
            res.push(book);
          });
        });
        resolve(res);
      })
      .catch((err) => { reject(err); });
  });

  const searchByTerm = async () => {
    let matched = [];
    if (defaultSearch) {
      // title/description/identity
      matched = books.filter(isMatch);
      console.log(matched);
    } else {
      // we can figure out how to filter both fields at once later
      let res = await Filter('Creator', 'authored');
      matched.push(...res);
      res = await Filter('Creator', 'illustrated');
      matched.push(...res);

      // remove duplicates
      matched = [...new Set(matched)];
    }
    // setMatchedBooks(matched);
    console.log(matched);
    setCards(matched);

    /*
    base('Creator').select({
      // Selecting the first 3 records in Grid view:
      filterByFormula: `IF(FIND(LOWER("${searchTerms}"), LOWER(name)) != 0, authored, '')`,
      maxRecords: 3,
      view: 'Grid view',
    }).eachPage((records, fetchNextPage) => {
      // This function (`page`) will get called for each page of records.

      // Records is array of Creators whose names match the searchTerms
      records.forEach((record) => {
        console.log('Retrieved', record.get('id'));
        console.log(record.get('name'));
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    }, (err) => {
      if (err) { console.error(err); }
    });
    console.log('EXT');
    */
  };

  useEffect(() => {
    if (!books.length) { getCards(); }
    if (searchTerms) {
      (async () => searchByTerm())();
      // searchByTerm();
    } else {
      setCards(books);
    }
  }, [books, searchTerms, defaultSearch]);

  return (
    <div>
      <SearchBar setSearchTerms={setSearchTerms} setDefaultSearch={setDefaultSearch} />

      <div className="library-display">
        {cards.map((card) => (
          (card)
            ? (
              <Card
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
