import React, { useState, useEffect } from 'react';
import RangeFilter from '../Filtering/RangeFilter';
import Card from './BookCard';

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
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filterInput, setFilterInput] = useState({
    age: { min: ageRangeMetadata[0], max: ageRangeMetadata[18] },
    grade: { min: gradeRangeMetadata[0], max: gradeRangeMetadata[12] },
  });
  const [userInput, setUserInput] = useState({
    Ethnicity: [],
    Religion: [],
    Gender: [],
    Sexuality: [],
  });

  const getCards = () => {
    base('Book').select({ view: 'Grid view' }).all()
      .then((records) => {
        setCards(records);
        setFilteredCards(records);
      });
  };

  useEffect(() => {
    const validGradeTags = gradeRangeMetadata.slice(
      gradeRangeMetadata.indexOf(filterInput.grade.min),
      gradeRangeMetadata.indexOf(filterInput.grade.max) + 1,
    );
    const validAgeTags = ageRangeMetadata.slice(
      ageRangeMetadata.indexOf(filterInput.age.min),
      ageRangeMetadata.indexOf(filterInput.age.max) + 1,
    );
    console.log(filterInput);
    console.log(userInput);
    console.log(cards);
    setFilteredCards(cards.filter(
      (record) => (record.fields.age_range.some((val) => validAgeTags.indexOf(val) !== -1)
      && record.fields.grade_range.some((value) => validGradeTags.indexOf(value) !== -1))
      && record.fields['race/ethnicity'].some((value) => userInput.Ethnicity.indexOf(value) !== -1)
      && record.fields.religion.some((value) => userInput.Religion.indexOf(value) !== -1)
      && record.fields.sexuality.some((value) => userInput.Sexuality.indexOf(value) !== -1)
      && record.fields.gender.some((value) => userInput.Gender.indexOf(value) !== -1),

    ));
  }, [filterInput, userInput]);

  useEffect(() => { getCards(); }, []);
  // useEffect(() => {

  //   console.log(userInput);
  // }, [userInput]);

  return (
    <div>
      <RangeFilter
        setFilterState={setFilterInput}
        setMultiSelect={setUserInput}
        MultiSelectInput={userInput}
      />
      <div className="library-display">
        {filteredCards.map((card) => (
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
