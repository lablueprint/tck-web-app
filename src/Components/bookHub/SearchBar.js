import React, { } from 'react';
import { PropTypes } from 'prop-types';
import {
  TextField, Select, FormControl, InputLabel, MenuItem,
} from '@mui/material';

function SearchBar({ setSearchTerms, setDefaultSearch }) {
  const handleChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchTerms(e.target.value);
    }
  };

  return (
    <div>
      <FormControl variant="standard" autoWidth>
        <InputLabel id="search-by-label">search by</InputLabel>
        <Select
          labelId="search-by-label"
          id="search-by"
          defaultValue
          label="search by"
          onChange={(e) => setDefaultSearch(e.target.value)}
        >
          <MenuItem value>Title, Description, Identity</MenuItem>
          <MenuItem value={false}>Author, Illustrator</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="filled-basic"
        label="search"
        placeholder="Enter keyword"
        variant="filled"
        onKeyPress={handleChange}
      />
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  setSearchTerms: PropTypes.func.isRequired,
  setDefaultSearch: PropTypes.func.isRequired,
};

/* NOTES
  For finer granularity search
    - Just need to add more menu items
      - use string for value instead of bool
        - allows for beyond binary option
    - in BookHub, change defaultSearch<bool> to searchType<string>
      - use string to determine which field we want to search by
      - extension: multiple fields at once??
        - use searchTypes<Array<string>>

        e.g.
          if (searchTypes.includes('title')) {
            title = (title) ? title.toLowerCase() : '';
            match |= title.includes(searchTerms)
          }
*/
