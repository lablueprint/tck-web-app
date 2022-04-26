import React, { useState } from 'react';
import {
  ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import { Tune, Search } from '@mui/icons-material';
import CardsDisplay from '../bookHub/BookHub';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filtering/Filtering';
import { ageRangeMetadata, gradeRangeMetadata } from '../Filtering/RangeFilter';

import './BookBrowser.css';

function BookBrowser() {
  const [alignment, setAlignment] = useState('Search');

  // Searching
  const [searchTerms, setSearchTerms] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');

  // Filtering
  const [rangeInput, setRangeInput] = useState({
    age: { min: ageRangeMetadata[0], max: ageRangeMetadata[18] },
    grade: { min: gradeRangeMetadata[0], max: gradeRangeMetadata[13] },
  });
  const [multiSelectInput, setMultiSelectInput] = useState({
    'race/ethnicity': [],
    identity_tags: [],
    religion: [],
    genre: [],
    'theme/lessons': [],
    book_type: [],
  });

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <div id="background">
      <div className="browser">
        <div className="browser-head">
          <div className="browser-quote">Browse For Books</div>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            sx={{ margin: '3vh 3vw auto' }}
          >
            <ToggleButton value="Search">
              <Search />
              Search
            </ToggleButton>
            <ToggleButton value="Filter">
              <Tune />
              Filter
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="browser-body">
          {
          (alignment === 'Search')
            ? (
              <SearchBar
                setSearchTerms={setSearchTerms}
                searchCategory={searchCategory}
                setSearchCategory={setSearchCategory}
              />
            )
            : (
              <div className="filter">
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
        searchCategory={searchCategory}
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
 *      Search
 *        Search bar
 *      Filter
 *        ranges, checks, whateva
 *
 *  Results body
 *
 *
 */
