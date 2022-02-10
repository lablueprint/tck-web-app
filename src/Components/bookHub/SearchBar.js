import React, { } from 'react';
import { PropTypes } from 'prop-types';
import {
  TextField, Select, FormControl, InputLabel, MenuItem,
} from '@mui/material';

function SearchBar({ setSearchTerms, setDefaultSearch }) {
  // const [value, setValue] = useState('');

  const handleChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // console.log(e.target.value);
      setSearchTerms(e.target.value);
      // setValue('');
    } else {
      console.log(e.target.value);
      // setValue(value + e.target.value);
    }
  };

  return (
    <div>
      <FormControl autoWidth>
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
        variant="standard"
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
