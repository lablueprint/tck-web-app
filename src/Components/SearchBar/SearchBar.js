import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  TextField, Select, FormControl, InputLabel, MenuItem, Button,
} from '@mui/material';

import { Search } from '@mui/icons-material';

import './SearchBar.css';

const MENU_STYLE = { fontFamily: "'DM Sans', sans-serif" };

function SearchBar({ setSearchTerms, searchCategory, setSearchCategory }) {
  const [value, setValue] = useState('');

  const handleSelect = (e) => {
    setSearchCategory(e.target.value);
  };

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
            value={searchCategory}
            label="search by"
            onChange={handleSelect}
            sx={{
              background: '#EEEEEE', textAlign: 'left', borderRadius: '12px 0px 0px 12px', ...MENU_STYLE,
            }}
          >
            <MenuItem value="keyword" sx={MENU_STYLE}>All</MenuItem>
            <MenuItem value="title" sx={MENU_STYLE}>Title</MenuItem>
            <MenuItem value="description" sx={MENU_STYLE}>Description</MenuItem>
            <MenuItem value="identity" sx={MENU_STYLE}>Identity</MenuItem>
            <MenuItem value="author" sx={MENU_STYLE}>Author</MenuItem>
            <MenuItem value="illustrator" sx={MENU_STYLE}>Illustrator</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{
            width: '70%', position: 'relative', zIndex: '2', background: '#F9F9F9',
          }}
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
            width: '5%', borderRadius: '0 12px 12px 0', marginLeft: '-1vw', position: 'relative', zIndex: '1',
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
  searchCategory: PropTypes.string.isRequired,
  setSearchCategory: PropTypes.func.isRequired,
};
