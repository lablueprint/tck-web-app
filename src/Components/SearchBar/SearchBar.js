import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  TextField, Select, FormControl, InputLabel, MenuItem, Button,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Search, ChevronLeft } from '@mui/icons-material';

import './SearchBar.css';

const styles = {
  menu: {
    fontFamily: 'DM Sans',
  },
  formControl: {
    width: '12em',
  },
  selectMenu: {
    background: '#EEEEEE',
    textAlign: 'left',
    borderRadius: '12px 0px 0px 12px',
    fontFamily: 'DM Sans',
  },
  searchField: {
    position: 'relative',
    zIndex: '2',
    background: '#F9F9F9',
  },
  submitButton: {
    borderRadius: '0 12px 12px 0',
    marginLeft: '-1vw',
    position: 'relative',
    zIndex: '1',
  },
  homepageButton: {
    textTransform: 'none',
    fontFamily: 'DM Sans',
    margin: '3vh 0 0 0',
  },
};

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
    <div className="search-container">
      <div className="subtitle">Search by Title, Author, Illustrator, Identity, or Book Description</div>
      <div className="search-bar">
        <FormControl
          variant="outlined"
          margin="none"
          sx={styles.formControl}
          size="small"
        >
          <InputLabel id="search-by-label">Search By</InputLabel>
          <Select
            labelId="search-by-label"
            id="search-by"
            value={searchCategory}
            label="search by"
            onChange={handleSelect}
            sx={styles.selectMenu}
          >
            <MenuItem value="keyword" sx={styles.menu}>Keyword</MenuItem>
            <MenuItem value="title" sx={styles.menu}>Title</MenuItem>
            <MenuItem value="description" sx={styles.menu}>Description</MenuItem>
            <MenuItem value="identity" sx={styles.menu}>Identity</MenuItem>
            <MenuItem value="author" sx={styles.menu}>Author</MenuItem>
            <MenuItem value="illustrator" sx={styles.menu}>Illustrator</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={styles.searchField}
          size="small"
          id="outlined-basic"
          hiddenLabel
          variant="outlined"
          margin="none"
          onKeyUp={handleChange}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleGo}
          sx={styles.submitButton}
          size="large"
          endIcon={<Search />}
        />
      </div>
      <Button component={NavLink} to="/" sx={styles.homepageButton} startIcon={<ChevronLeft />}>
        Return to Homepage
      </Button>
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  setSearchTerms: PropTypes.func.isRequired,
  searchCategory: PropTypes.string.isRequired,
  setSearchCategory: PropTypes.func.isRequired,
};
