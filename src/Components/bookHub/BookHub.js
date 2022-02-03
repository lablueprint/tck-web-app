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

  NOTES:
    for now, we focus on the default behavior
      - search by title:string, desc:string, identity:string
    need to implement radio/toggle in order to test search by default / by creator

  <SearchBar setSearchTerms={setSearchTerms}>

  */
function CardsDisplay() {
  const [cards, setCards] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');

  const getCards = () => {
    base('Book').select({ view: 'Grid view' }).all()
      .then((records) => {
        setCards(records);
      });
  };

  useEffect(getCards, []);

  const isMatch = (book) => {
    // DEFAULT ROUTE, ADD OTHER FILTERING CRITERIA LATER
    const title = book.title.toLowerCase();
    const desc = book.title.toLowerCase();
    const identity = book.title.toLowerCase();
    let match;

    match = title.includes(searchTerms)
            || desc.includes(searchTerms)
            || identity.includes(searchTerms);

    return match;
  };

  return (
    <div>
      <SearchBar setSearchTerms={setSearchTerms} />

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
