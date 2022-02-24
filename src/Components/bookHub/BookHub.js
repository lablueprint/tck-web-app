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
  SEARCHING
    1. add searchTerms state to CardDisplay
    2. pass setSearchTerms to SearchBar
      - SearchBar will change the state of searchTerms
    3. use searchTerms as a filtering parameter before we display cards

    FILTERING PIPELINE
      1. map an array of promises using (books, isMatch)
      2.

  NOTES:
    - base('creator').select only looks at authored field
      - use another variable/function to include illustrator in formula
    - restrcture "matching" code
    - make sure cards are properly set after filtering
    - fix maxRecords in base('creator').select call

  <SearchBar setSearchTerms={setSearchTerms}>

  */
function CardsDisplay() {
  const [books, setBooks] = useState([]);
  const [cards, setCards] = useState([]);
  const [searchTerms, setSearchTerms] = useState(''); // searchTerms should be all lowercase !!
  const [defaultSearch, setDefaultSearch] = useState(true);

  const [matchedBooks, setMatchedBooks] = useState([]);

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
  function Filter(table, field) {
    // Query Airtable {table} for records whose {field} value matches the search term
    // This will mainly be for Creator table
    base(table).select({
      filterByFormula: `IF(FIND(LOWER("${searchTerms}"), LOWER(name)) != 0, ${field}, '')`,
      maxRecords: 3,
      view: 'Grid view',
    }).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        console.log('Retrieved', record.get('id'));
        console.log(record.get('name'));
        console.log(record.get('authored'));
        console.log(record.get('illustrated'));

        // store record
        /*

        const matchedBooks = [1,2,3,4]
        const arr2 = [5,6,7]
        const arr3 = [...arr1, ...arr2]

        In Creators table, each record's authored/illustrated field is an array of bookIds,
        but we want to store the book record in our matchedBook state

        book.get('title');

        for authoredId in bookIdRetrieved:
          for each book in books:
            if book.id == authoredId:
              add book to matchedBooks

        matchedBooks := array of Book object/records
              book.get('title')
              book.get(...)

        */
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
      if (err) { console.error(err); }
    });

    console.log('matched');
    console.log(matchedBooks);
  }

  const searchByTerm = () => {
    if (defaultSearch) {
      // title/description/identity
      const matched = books.filter(isMatch);
      setMatchedBooks(matched);
    } else {
      // we can figure out how to filter both fields at once later
      Filter('Creator', 'authored');
      Filter('Creator', 'illustrated');
      console.log(matchedBooks);
    }

    setCards(matchedBooks);
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

  /*
  const searchByTerm = async () => {
    // console.log(defaultSearch);
    const toFilter = await Promise.all(books.map(isMatch));
    const filtered = cards.filter((_, index) => toFilter[index]);
    setCards(filtered);
    // console.log(cards);
  };
  */

  useEffect(() => {
    if (!books.length) { getCards(); }
    if (searchTerms) {
      //  (async () => searchByTerm())();
      searchByTerm();
    } else {
      setCards(books);
    }
  }, [books, searchTerms, defaultSearch]);

  return (
    <div>
      <SearchBar setSearchTerms={setSearchTerms} setDefaultSearch={setDefaultSearch} />

      <div className="library-display">
        {cards.filter(isMatch).map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.fields.title !== undefined ? card.fields.title : 'MISSING TITLE'}
            author={card.fields.author !== undefined ? card.fields.author[0] : 'MISSING AUTHOR'}
            image={card.fields.image !== undefined ? card.fields.image[0].url : 'MISSING IMAGE'}
          />
        ))}
      </div>

    </div>
  );
}

export default CardsDisplay;
