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
    for now, we focus on the default behavior
      - search by title:string, desc:string, identity:string
    need to implement radio/toggle in order to test search by default / by creator

  <SearchBar setSearchTerms={setSearchTerms}>

  */
function CardsDisplay() {
  const [books, setBooks] = useState([]);
  // const [cards, setCards] = useState([]);
  const [searchTerms, setSearchTerms] = useState(''); // searchTerms should be all lowercase !!
  const [defaultSearch, setDefaultSearch] = useState(true);

  const getCards = () => {
    base('Book').select({ view: 'Grid view' }).all()
      .then((records) => {
        setBooks(records);
      });
  };

  const getCreator = async (tableName, entryId) => new Promise((resolve, reject) => {
    base(tableName).find(entryId, (err, creatorRecord) => {
      if (err) {
        reject();
      }
      resolve(creatorRecord);
    });
  });

  // promise chaining ❌, async/await ✅
  const isMatch = async (book) => {
    let title = book.get('title');
    let desc = book.get('description');
    let identity = book.get('identity');

    // need to error check before using toLowerCase()
    title = (title) ? title.toLowerCase() : '';
    desc = (desc) ? desc.toLowerCase() : '';
    identity = (identity) ? identity.toLowerCase() : '';

    let match = true;
    if (defaultSearch) {
      match = title.includes(searchTerms)
      || desc.includes(searchTerms)
      || identity.includes(searchTerms);
    } else {
      const authorId = book.get('author');
      const illustratorId = book.get('illustrator');
      const author = await getCreator('Creator', authorId);
      const illustrator = await getCreator('Creator', illustratorId);
      const authorName = (author.get('name')) ? author.get('name').toLowerCase() : '';
      const illustratorName = (illustrator.get('name')) ? illustrator.get('name').toLowerCase() : '';
      match = authorName.includes(searchTerms) || illustratorName.includes(searchTerms);
    }
    // console.log(`checking ${title}: ${match}`);
    // console.log(searchTerms);
    return match;
  };
  /*
  const searchByTerm = async () => {
    const toFilter = await Promise.all(books.map(isMatch));
    const filtered = cards.filter((value, index) => toFilter[index]);
    setCards(filtered);
  };
  */
  useEffect(() => {
    getCards();
    /*
    if (searchTerms) {
      searchByTerm();
    } else {
      setCards(books);
    } */
  }, [searchTerms, defaultSearch]);

  return (
    <div>
      <SearchBar setSearchTerms={setSearchTerms} setDefaultSearch={setDefaultSearch} />

      <div className="library-display">
        {books.filter(isMatch).map((card) => (
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
