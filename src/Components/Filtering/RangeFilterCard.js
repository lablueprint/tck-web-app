import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import propTypes from 'prop-types';

function RangeFilterCard({
  filterTitle, optionsArray, handleChange, data,
}) {
  const minref = useRef();
  const maxref = useRef();
  return (
    <div>
      <p>{filterTitle}</p>
      <div style={{ display: 'flex', flexDirection: 'row', columnGap: 50 }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          ref={minref}
          options={optionsArray}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Min" />}
          onChange={(event, newValue) => { handleChange(minref.current.getAttribute('name'), newValue, event); }}
          defaultValue={filterTitle === 'Age' ? data.age.min : data.grade.min}
          name={filterTitle === 'Age' ? 'Age-min' : 'Grade-min'}
        />
        <p>to</p>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          ref={maxref}
          options={optionsArray}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Max" />}
          onChange={(event, newValue) => { handleChange(maxref.current.getAttribute('name'), newValue, event); }}
          defaultValue={filterTitle === 'Age' ? data.age.max : data.grade.max}
          name={filterTitle === 'Age' ? 'Age-max' : 'Grade-max'}
        />
      </div>
    </div>
  );
}

RangeFilterCard.propTypes = {
  filterTitle: propTypes.string,
  handleChange: propTypes.func.isRequired,
  data: propTypes.shape.isRequired,
  optionsArray: propTypes.arrayOf,
};

RangeFilterCard.defaultProps = {
  filterTitle: '',
  optionsArray: [],
};
export default RangeFilterCard;
