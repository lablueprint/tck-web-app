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
    base('Cards').select({ view: 'Grid view' }).all()
      .then((records) => {
        setCards(records);
      });
  };

  useEffect(getCards, []);

  return cards.map((card) => (
    <Card
      key={card.id}
      title={card.fields.title}
      author={card.fields.author}
      image={card.fields.image}
    />
  ));
}

export default CardsDisplay;
