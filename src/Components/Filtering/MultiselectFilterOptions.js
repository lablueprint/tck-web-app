import React, { useEffect } from 'react';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MultiselectComponent({
  filterOptions, input, setInput, labelName,
}) {
  const handleToggle = (label, event) => {
    const {
      target: { value },
    } = event;
    setInput({ ...input, [label]: typeof value === 'string' ? value.split(',') : value });
  };
  useEffect(() => console.log(input), [input]);
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel>{labelName}</InputLabel>
      <Select
        multiple
        value={input[labelName]}
        onChange={(event) => handleToggle(
          labelName,
          event,
        )}
        input={<OutlinedInput label="Name" />}
      >
        {filterOptions.map((name) => (
          <MenuItem
            key={name}
            value={name}
          >
            {name}
          </MenuItem>
        ))}
        )
      </Select>
    </FormControl>
  );
}

MultiselectComponent.propTypes = {
  filterOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  input: PropTypes.shape({
    Ethnicity: PropTypes.arrayOf(PropTypes.string).isRequired,
    Religion: PropTypes.arrayOf(PropTypes.string).isRequired,
    Gender: PropTypes.arrayOf(PropTypes.string).isRequired,
    Sexuality: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setInput: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
};
