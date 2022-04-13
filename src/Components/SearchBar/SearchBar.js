import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  TextField, Select, FormControl, InputLabel, MenuItem, InputAdornment, Button,
} from '@mui/material';

import { Search } from '@mui/icons-material';

import './SearchBar.css';

function SearchBar({ setSearchTerms, setDefaultSearch }) {
  const [value, setValue] = useState('');
  /*
  const handleChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchTerms(e.target.value);
    }
  };
*/

  const handleChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchTerms(e.target.value);
    }
    setValue(e.target.value);
  };

  const handleGo = () => {
    setSearchTerms(value);
  };

  return (
    <div style={{ display: 'inline-block', width: '90%' }}>
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
        fullWidth
        id="filled-basic"
        hiddenLabel
        placeholder="Search Titles, Authors, Identities..."
        variant="standard"
        margin="normal"
        onKeyUp={handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
        }}
      />
      <div className="Buttons">
        <Button
          type="submit"
          variant="contained"
          startIcon={<Search />}
          onClick={handleGo}
          sx={{ borderRadius: '12px' }}
        >
          Go!
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  setSearchTerms: PropTypes.func.isRequired,
  setDefaultSearch: PropTypes.func.isRequired,
};

/* NOTES
  Cancel will not clear the text field
    - For future development, one can use refs to access the text field, clear
      the text field when 'cancel' is pressed, but for now it'll just reset
      search results
*/
