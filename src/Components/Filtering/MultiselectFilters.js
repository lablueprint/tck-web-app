import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import MultiselectComponent from './MultiselectFilterOptions';
import './Filtering.css';
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
    <div className="multi-select-wrapper">
      {filters && filters.map((option) => (
        <div className="multi-select-component" key={option.fields.id}>
          <MultiselectComponent
            filterOptions={(option.fields.options)}
            input={tempMultiSelect}
            setInput={setTempMultiSelect}
            filterLabel={option.fields.display}
            filterName={option.fields.name}
          />
        </div>
      ))}
    </div>
  );
}

MultSelectElem.propTypes = {
  setTempMultiSelect: propTypes.func.isRequired,
  tempMultiSelect: propTypes.shape({
    'race/ethnicity': propTypes.arrayOf(propTypes.string).isRequired,
    identity_tags: propTypes.arrayOf(propTypes.string).isRequired,
    religion: propTypes.arrayOf(propTypes.string).isRequired,
    genre: propTypes.arrayOf(propTypes.string).isRequired,
    'theme/lessons': propTypes.arrayOf(propTypes.string).isRequired,
    book_type: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
};
