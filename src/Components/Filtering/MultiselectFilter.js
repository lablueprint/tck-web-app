import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './Filtering.css';
import { styled } from '@mui/material/styles';

const CustomAutocomplete = styled(Autocomplete)({
  background: '#FFFFFF',
  border: '0.5px solid rgba(0, 0, 0, 0.3)',
  borderRadius: '5px',
});

export default function MultiselectFilter({
  filterOptions, input, setInput, filterLabel, filterName,
}) {
  const result = filterOptions ? filterOptions.split(',').map((element) => element.trim()) : null;
  const handleToggle = (val, label) => {
    setInput({ ...input, [label]: val });
  };
  return (
    filterOptions ? (
      <div>
        <p className="filterlabel-text">
          {filterLabel}
        </p>
        <CustomAutocomplete
          multiple
          options={result}
          filterSelectedOptions
          limitTags={1}
          onChange={(event, value) => handleToggle(
            value,
            filterName,
            event,
          )}
          value={input[filterName]}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
            />
          )}
        />
      </div>
    ) : null
  );
}

MultiselectFilter.propTypes = {
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
