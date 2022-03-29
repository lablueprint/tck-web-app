/* eslint-disable */
import React, { useState } from 'react';
import {
  ToggleButton, ToggleButtonGroup,
} from '@mui/material';

import './BookBrowser.css';
function BookBrowser() {
  const [alignment, setAlignment] = useState('Search');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <div className="Browser">
      <div className="BrowserHead">
        <div className="BrowserQuote">Browse For Books</div>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          sx={{ margin: '3vh 3vw auto' }}
        >
          <ToggleButton value="Search">Search</ToggleButton>
          <ToggleButton value="Filter">Filter</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="BrowserBody">
        {(alignment) ? `I AM ${alignment}ING` : 'no thang'}
        DSfdsfSDFDSFWEFDFdsfEWFEFERFSDFSDF

        searchingf
        {'\n'}
        defaultf
        {'\n'}
        DSfdsfSDFDSFWEFDFdsfEWFEFERFSDFSDFfs
        {'\n'}
        defaultsd
        {'\n'}
        fields
        searchingf
        {'\n'}
        defaultf
        {'\n'}
        DSfdsfSDFDSFWEFDFdsfEWFEFERFSDFSDFfs
        {'\n'}
        defaultsd
        {'\n'}
        fields
        searchingf
        {'\n'}
        defaultf
        {'\n'}
        DSfdsfSDFDSFWEFDFdsfEWFEFERFSDFSDFfs
        {'\n'}
        defaultsd
        {'\n'}
        fields
      </div>
    </div>
  );
}

export default BookBrowser;

/**
 * Browser holds the entire component
 *  - BrowserHead
 *      Holds the toggle and "Browse For Books"
 *  - BrowserBody
 *      IF THIS IS EASY ALL I SHOULD NEED TO DO IS SWAP THE COMPONENTS OUT
 *      Search
 *        Search bar
 *      Filter
 *        ranges, checks, whateva
 *      
 *  ?? Results body ???
 *
 *  COMPROMISES
 *   Neue Haas Grotesk Text Pro -> IBM PLEX
 *      Change if find out a way to get the original font,
 *      otherwise similar + free Google Font will be used
 */
