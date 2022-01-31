import React from 'react';
import TextField from '@mui/material/TextField';
import propTypes from 'prop-types';

function RangeFilterCard({ filterTitle, handleChange }) {
  return (
    <div>
      <p>{filterTitle}</p>
      <div style={{ display: 'flex', flexDirection: 'row', columnGap: 50 }}>
        <TextField
          id="outlined-number"
          label="Min"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          name={`${filterTitle}-min`}
          onChange={handleChange}
        />
        <p>to</p>
        <TextField
          id="outlined-number"
          label="Max"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          name={`${filterTitle}-max`}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

RangeFilterCard.propTypes = {
  filterTitle: propTypes.string,
  handleChange: propTypes.func.isRequired,
};

RangeFilterCard.defaultProps = {
  filterTitle: '',
};
export default RangeFilterCard;
