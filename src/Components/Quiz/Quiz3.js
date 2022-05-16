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

export default function Quiz3({ slideCaption, bookFilters, setBookFilters }) {
  const [filters, setFilters] = useState([]);

  const getFilters = () => {
    base('Book Tag Metadata').select({
      filterByFormula: `IF(FIND("${'race/ethnicity'}", name) !=0, options, '')`,
      view: 'Grid view',
    }).all()
      .then((records) => {
        setFilters(records[0].fields.options.split(','));
        setBookFilters({ ...bookFilters, 'race/ethnicity': filters });
      });
  };
  useEffect(getFilters, []);
  return (
    <div>
      <h1>
        {slideCaption}
      </h1>
      {filters.map((option) => (
        <QuizButton buttonCaption={option} />
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
