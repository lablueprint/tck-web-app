import React from 'react';
import propTypes from 'prop-types';
import MultiselectComponent from './MultiselectFilterOptions';

const filters = [
  {
    filterName: 'Ethnicity',
    filterOptions: ['Black/African American', 'White', 'Asian', 'Hawaiian/Pacific Islander', 'Hispanic',
      'American Indian/Alaska Native', 'Indian', 'American'],
  },
  {
    filterName: 'Religion',
    filterOptions: ['Christian', 'Muslim', 'Hindu', 'Jewish', 'Atheist'],
  },
  {
    filterName: 'Gender',
    filterOptions: ['Male', 'Female', 'Nonbinary', 'Other'],
  },
  {
    filterName: 'Sexuality',
    filterOptions: ['Gay', 'Straight', 'Bisexual', 'Other'],
  },
];

export default function MultSelectElem({ setTempMultiSelect, tempMultiSelect }) {
  return (
    <div style={{
      width: '90%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', margin: '1vh auto 1vh auto',
    }}
    >
      {filters.map((option) => (
        <div style={{ width: '45%', margin: '1vh 1vw 1vh 1vw' }}>
          <MultiselectComponent
            filterOptions={option.filterOptions}
            input={tempMultiSelect}
            setInput={setTempMultiSelect}
            labelName={option.filterName}
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
