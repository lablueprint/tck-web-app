import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function MultiselectComponent({
  filterOptions, input, setInput, filterLabel, filterName,
}) {
  const result = filterOptions ? filterOptions.split(',') : null;
  const handleToggle = (val, label) => {
    setInput({ ...input, [label]: val });
  };

  return (
    filterOptions ? (
      <Autocomplete
        multiple
        options={result}
        filterSelectedOptions
        onChange={(event, value) => handleToggle(
          value,
          filterName,
          event,
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={filterLabel}
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
    identity_tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    religion: PropTypes.arrayOf(PropTypes.string).isRequired,
    genre: PropTypes.arrayOf(PropTypes.string).isRequired,
    'theme/lessons': PropTypes.arrayOf(PropTypes.string).isRequired,
    book_type: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setInput: PropTypes.func.isRequired,
  filterLabel: PropTypes.string.isRequired,
  filterName: PropTypes.string.isRequired,
};
