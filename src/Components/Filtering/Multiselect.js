import React from 'react';
import { Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import MultiSelectComponent from './MultiSelectComponent';

const filters = [
  {
    filterName: 'Ethnicity',
    filterOptions: ['Black/African American', 'White', 'Asian', 'Hawaiian/Pacific Islander', 'Hispanic',
      'American Indian/Alaska Native'],
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

export default function MultSelectElem() {
  return (
    <div>
      {filters.map((option) => (
        <div>
          <Typography>{option.filterName}</Typography>
          <MultiSelectComponent
            filterOptions={option.filterOptions}
          />
        </div>
      ))}
      <Button variant="contained">Apply</Button>
    </div>
  );
}
