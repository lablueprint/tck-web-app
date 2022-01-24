import React, { useState, useEffect } from 'react';
import Card from './Card';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function CardsDisplay() {
  const [cards, setCards] = useState([]);

  const getCards = () => {
    base('Book').select({ view: 'Grid view' }).all()
      .then((records) => {
        setCards(records);
        console.log(records);
      });
  };

  useEffect(getCards, []);

  return (
    <div className="library-display">
      {cards.map((card) => (
        <Card
          key={card.id}
          title={card.fields.title !== undefined ? card.fields.title : 'MISSING TITLE'}
          author={card.fields.author !== undefined ? card.fields.author[0] : 'MISSING AUTHOR'}
          image={card.fields.image !== undefined ? card.fields.image[0].url : 'MISSING IMAGE'}
        />
      ))}
    </div>
  );
}

export default CardsDisplay;
