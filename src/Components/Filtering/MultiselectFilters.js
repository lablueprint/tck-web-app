import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import MultiselectComponent from './MultiselectFilterOptions';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

// const filters = [
//   {
//     filterName: 'Ethnicity',
//     filterOptions: ['Black/African American', 'White', 'Asian',
// 'Hawaiian/Pacific Islander', 'Hispanic',
//       'American Indian/Alaska Native', 'Indian', 'American'],
//   },
//   {
//     filterName: 'Religion',
//     filterOptions: ['Christian', 'Muslim', 'Hindu', 'Jewish', 'Atheist'],
//   },
//   {
//     filterName: 'Gender',
//     filterOptions: ['Male', 'Female', 'Nonbinary', 'Other'],
//   },
//   {
//     filterName: 'Sexuality',
//     filterOptions: ['Gay', 'Straight', 'Bisexual', 'Other'],
//   },
// ];

export default function MultSelectElem({ setTempMultiSelect, tempMultiSelect }) {
  const [filters, setFilters] = useState([]);

  const getFilters = () => {
    base('Book Tag Metadata').select({ view: 'Grid view' }).all()
      .then((records) => {
        setFilters(records);
      });
  };

  useEffect(getFilters, []);

  return (
    <div style={{ width: '100%' }}>
      {filters.map((option) => (
        <div style={{ width: '100%', padding: '20px' }}>
          <MultiselectComponent
            filterOptions={option.fields.options}
            input={tempMultiSelect}
            setInput={setTempMultiSelect}
            labelName={option.fields.name}
          />
        </div>
      ))}
    </div>
  );
}

MultSelectElem.propTypes = {
  setTempMultiSelect: propTypes.func.isRequired,
  tempMultiSelect: propTypes.shape({
    Ethnicity: propTypes.arrayOf(propTypes.string).isRequired,
    Religion: propTypes.arrayOf(propTypes.string).isRequired,
    Gender: propTypes.arrayOf(propTypes.string).isRequired,
    Sexuality: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
};
