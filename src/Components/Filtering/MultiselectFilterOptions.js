import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function MultiselectComponent({
  filterOptions, input, setInput, labelName,
}) {
  const result = filterOptions ? filterOptions.split(',') : null;
  const handleToggle = (val, label) => {
    setInput({ ...input, [label]: val });
  };

  // console.log(input);
  return (
    filterOptions ? (
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
            placeholder={filterOptions ? `'${filterOptions[0]}...'` : null}
            size="small"
          />
        )}
      />
    ) : null
  );
}

MultiselectComponent.propTypes = {
  filterOptions: PropTypes.string.isRequired,
  input: PropTypes.shape({
    'race/ethnicity': PropTypes.arrayOf(PropTypes.string).isRequired,
    'identity tags': PropTypes.arrayOf(PropTypes.string).isRequired,
    religion: PropTypes.arrayOf(PropTypes.string).isRequired,
    genre: PropTypes.arrayOf(PropTypes.string).isRequired,
    'theme/lessons': PropTypes.arrayOf(PropTypes.string).isRequired,
    'Book type': PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setInput: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
};
