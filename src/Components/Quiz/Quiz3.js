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

export default function Quiz3({ slideCaption }) {
  const [filters, setFilters] = useState([]);
  const getFilters = () => {
    base('Book Tag Metadata').select({
      filterByFormula: `IF(FIND("${'race/ethnicity'}", name) !=0, options, '')`,
      view: 'Grid view',
    }).all()
      .then((records) => {
        setFilters(records);
      });
  };
  useEffect(getFilters, []);
  const results = filters[0].fields.options;
  // console.log(results);
  const options = results ? results.split(',') : null;
  // console.log(options);
  return (
    <div>
      <h1>
        {slideCaption}
        Which races/ethnicities do you want to see represented?
      </h1>
      {options.map((option) => (
        <QuizButton buttonCaption={option} />
      ))}
    </div>
  );
}
Quiz3.propTypes = {
  slideCaption: propTypes.string.isRequired,
};
