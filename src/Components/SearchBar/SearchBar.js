import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  TextField, Select, FormControl, InputLabel, MenuItem, Button,
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
    <div>
      <div className="Subtitle">Search by Title, Author, Illustrator, Identity, or Book Description</div>
      <div className="SearchBar">
        <FormControl
          variant="outlined"
          margin="none"
          sx={{ width: '20%' }}
          size="small"
        >
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
          sx={{ width: '70%', position: 'relative', zIndex: '1' }}
          size="small"
          id="outlined-basic"
          hiddenLabel
          variant="outlined"
          margin="none"
          onKeyUp={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleGo}
          sx={{
            width: '5%', borderRadius: '0 12px 12px 0', marginLeft: '-1vh', position: 'relative', zIndex: '2',
          }}
          size="large"
          endIcon={<Search />}
        />

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
