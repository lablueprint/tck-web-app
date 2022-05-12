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
      <div>
        <p style={{
          color: 'rgba(0, 0, 0, 0.5)', fontFamily: 'DM Sans', fontWeight: 'normal', textAlign: 'left', marginBottom: '0.2em',
        }}
        >
          {filterLabel}
        </p>
        <Autocomplete
          multiple
          sx={{
            background: '#FFFFFF',
            border: '0.5px solid rgba(0, 0, 0, 0.3)',
            height: '50px',
            borderRadius: '5px',
            '& .MuiAutocomplete-inputRoot': {
              height: '100%',
            },
          }}
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
              // placeholder={filterOptions ? `'${result[0]}...'` : null}
              size="small"
              sx={{ height: '50px' }}
            />
          )}
        />
      </div>
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
