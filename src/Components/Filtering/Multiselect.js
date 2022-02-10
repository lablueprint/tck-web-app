import React, { /* useState, useEffect */} from 'react';
import { Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import { PropTypes } from 'prop-types';
import MultiSelectComponent from './MultiSelectComponent';

export default function MultSelectElem({ filters /* records */ }) {
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
      <Button variant="contained"/* onClick={handleChange(option.filterName)} */>Apply</Button>
    </div>
  );
}
MultSelectElem.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    filterName: PropTypes.string,
    filterOptions: PropTypes.string,
  })).isRequired,
  // updateFilter: PropTypes.func.isRequired,
  // DemographicName: PropTypes.string.isRequired,
};
