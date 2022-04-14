import React, { useState } from 'react';
import {
  ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import CardsDisplay from '../bookHub/BookHub';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filtering/Filtering';
import { ageRangeMetadata, gradeRangeMetadata } from '../Filtering/RangeFilter';

import './BookBrowser.css';

function BookBrowser() {
  const [alignment, setAlignment] = useState('Search');

  const [searchTerms, setSearchTerms] = useState('');
  const [category, setCategory] = useState('title');

  // Filtering
  const [rangeInput, setRangeInput] = useState({
    age: { min: ageRangeMetadata[0], max: ageRangeMetadata[18] },
    grade: { min: gradeRangeMetadata[0], max: gradeRangeMetadata[13] },
  });
  const [multiSelectInput, setMultiSelectInput] = useState({
    'race/ethnicity': [],
    'identity tags': [],
    religion: [],
    genre: [],
    'theme/lessons': [],
    'Book type': [],
  });

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <div id="background">
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
          {
          (alignment === 'Search')
            ? (
              <SearchBar
                setSearchTerms={setSearchTerms}
                category={category}
                setCategory={setCategory}
              />
            )
            : (
              <div className="Filter">
                <Filter
                  setRangeState={setRangeInput}
                  setMultiSelectInput={setMultiSelectInput}
                />
              </div>
            )
        }

        </div>
      </div>
      <CardsDisplay
        searchTerms={searchTerms}
        category={category}
        alignment={alignment}
        rangeInput={rangeInput}
        multiSelectInput={multiSelectInput}
      />
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
 *
 *  TO-DO
 *  ------
 *    1. need to separate search bar from results
 *        Pass searchTerms and defaultSearch to CardsDisplay as props rather than having it as state
 *          <SearchBar setSearchTerms={setSearchTerms} setDefaultSearch={setDefaultSearch} />
 *          <CardsDisplay searchTerms={searchTerms} defaultSearch={defaultSearch}
 *        DONE
 *    2. Use JS and CSS instead of MaterialUI/ToggleButton to allow for easier styling??
 *       Or figure out how to customize the ToggleButton so it matches the Figma
 *
 *  COMPROMISES
 *   Neue Haas Grotesk Text Pro -> IBM PLEX
 *      Change if find out a way to get the original font,
 *      otherwise similar + free Google Font will be used
 */
