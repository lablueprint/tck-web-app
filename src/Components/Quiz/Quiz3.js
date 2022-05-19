/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import QuizButton from './QuizButton';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function Quiz3({ slideCaption, setBookFilters }) {
  const [filters, setFilters] = useState([]);
  let filterVar;

  const getFilters = () => {
    base('Book Tag Metadata').select({
      filterByFormula: `IF(FIND("${'race/ethnicity'}", name) !=0, options, '')`,
      view: 'Grid view',
    }).all()
      .then((records) => {
        console.log(records);
        filterVar = records[0].fields.options.split(',').map((element) => element.trim());
        setFilters(filterVar);
      });
  };

  function HandleClick(event) {
    console.log(event.target.value);
    setBookFilters((prevValue) => ({ ...prevValue, 'race/ethnicity': prevValue['race/ethnicity'].concat(event.target.value) }));
  }
  useEffect(getFilters, []);
  return (
    <div>
      <h1>
        {slideCaption}
      </h1>
      {filters.map((option) => (
        <QuizButton buttonCaption={option} value={option} onClick={HandleClick} />
      ))}
    </div>
  );
}
Quiz3.propTypes = {
  slideCaption: propTypes.string.isRequired,
  setBookFilters: propTypes.func.isRequired,
  bookFilters: propTypes.shape({
    bookId: propTypes.string.isRequired,
    'race/ethnicity': propTypes.arrayOf(propTypes.string).isRequired,
    minAge: propTypes.number.isRequired,
    maxAge: propTypes.number.isRequired,
    minGrade: propTypes.number.isRequired,
    maxGrade: propTypes.number.isRequired,
    genre: propTypes.arrayOf(propTypes.string).isRequired,
    book_type: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
};
