import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  TextField, Select, FormControl, InputLabel, MenuItem, Button,
} from '@mui/material';

import { Search } from '@mui/icons-material';

import './SearchBar.css';

const MENU_STYLE = { fontFamily: "'DM Sans', sans-serif" };

function SearchBar({ setSearchTerms, category, setCategory }) {
  const [value, setValue] = useState('');

  const handleSelect = (e) => {
    setCategory(e.target.value);
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
            value={category}
            label="search by"
            onChange={handleSelect}
            sx={{
              background: '#EEEEEE', textAlign: 'left', borderRadius: '12px 0px 0px 12px', ...MENU_STYLE,
            }}
          >

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
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

/* NOTES
  We now need to separate title, desc, identity sadge

  TO-DO:
    Create state in BookBrowser for Title, Author, Illustrator, Identity, or Book Description
      category, setCategory
      - represent as strings
          title, author, illustrator, identity, description
      - pass down setCategory to SearchBar
        - need to change MenuItem values to strings
      - pass down category to BookHub
        - separate category logic in there
    This will necessarily retire the defaultSearch state

      <div>
      <div className="Subtitle">Search by Title, Author, Illustrator,
      Identity, or Book Description</div>
      <div className="SearchBar">
        <FormControl
          variant="outlined"
          margin="none"
          sx={{ width: '20%', background: '#EEEEEE' }}
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
*/
