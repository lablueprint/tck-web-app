/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
// import Button from '@mui/material/Button';
import propTypes from 'prop-types';
import MultiSelectComponent from './MultiSelectComponent';

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

export default function MultSelectElem({ setMultiSelect, userInput }) {
  // console.log(userInput);

  return (
    <div>
      {filters.map((option) => (
        <div>
          <Typography>{option.filterName}</Typography>
          <MultiSelectComponent
            filterOptions={option.filterOptions}
            input={userInput}
            setInput={setMultiSelect}
            labelName={option.filterName}
          />
        </div>
      ))}
      {/* <Button variant="contained">Apply</Button> */}
    </div>
  );
}

MultSelectElem.propTypes = {
  setMultiSelect: propTypes.func.isRequired,
  userInput: propTypes.shape({
    Ethnicity: propTypes.arrayOf.isRequired,
    Religion: propTypes.arrayOf.isRequired,
    Gender: propTypes.arrayOf.isRequired,
    Sexuality: propTypes.arrayOf.isRequired,
  }).isRequired,
};
