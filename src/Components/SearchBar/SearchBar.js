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
    width: '20%',
  },
  selectMenu: {
    background: '#EEEEEE',
    textAlign: 'left',
    borderRadius: '12px 0px 0px 12px',
    fontFamily: 'DM Sans',
  },
  searchField: {
    width: '70%',
    position: 'relative',
    zIndex: '2',
    background: '#F9F9F9',
  },
  submitButton: {
    width: '5%',
    borderRadius: '0 12px 12px 0',
    marginLeft: '-1vw',
    position: 'relative',
    zIndex: '1',
  },
  homepageButton: {
    textTransform: 'none',
    fontFamily: 'DM Sans',
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
    <div className="SearchBar">
      <div className="Subtitle">Search by Title, Author, Illustrator, Identity, or Book Description</div>
      <FormControl
        variant="outlined"
        margin="none"
        sx={styles.formControl}
        size="small"
      >
        <InputLabel id="search-by-label">search by</InputLabel>
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
      />
      <Button
        type="submit"
        variant="contained"
        onClick={handleGo}
        sx={styles.submitButton}
        size="large"
        endIcon={<Search />}
      />

      <NavLink
        to="/"
        className="homepage-button"
      >
        <Button sx={styles.homepageButton} startIcon={<ChevronLeft />}>
          Return to Homepage
        </Button>
      </NavLink>
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  setSearchTerms: PropTypes.func.isRequired,
  searchCategory: PropTypes.string.isRequired,
  setSearchCategory: PropTypes.func.isRequired,
};
