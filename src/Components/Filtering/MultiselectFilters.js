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
    <div style={{
      width: '90%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', margin: '1vh auto 1vh auto',
    }}
    >
      {filters && filters.map((option) => (
        <div style={{ width: '45%', margin: '1vh 1vw 1vh 1vw' }}>
          <MultiselectComponent
            key={option.fields.id}
            filterOptions={(option.fields.options)}
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
    'Race/Ethnicity': propTypes.arrayOf(propTypes.string).isRequired,
    'Identity Tags': propTypes.arrayOf(propTypes.string).isRequired,
    Religion: propTypes.arrayOf(propTypes.string).isRequired,
    Genre: propTypes.arrayOf(propTypes.string).isRequired,
    'Theme/Lessons': propTypes.arrayOf(propTypes.string).isRequired,
    'Book Type': propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
};