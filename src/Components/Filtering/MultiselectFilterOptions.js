import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function MultiselectComponent({
  filterOptions, input, setInput, labelName,
}) {
  const result = filterOptions.split(/[, ]+/);
  console.log(result);
  const handleToggle = (val, label) => {
    setInput({ ...input, [label]: input[label].concat(val) });
  };
  return (
    <Autocomplete
      multiple
      options={result}
      filterSelectedOptions
      onChange={(event, value) => handleToggle(
        value,
        labelName,
        event,
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={labelName}
        />
      )}
    />
  );
}

MultiselectComponent.propTypes = {
  filterOptions: PropTypes.string.isRequired,
  input: PropTypes.shape({
    Ethnicity: PropTypes.arrayOf(PropTypes.string).isRequired,
    Religion: PropTypes.arrayOf(PropTypes.string).isRequired,
    Gender: PropTypes.arrayOf(PropTypes.string).isRequired,
    Sexuality: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setInput: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
};
