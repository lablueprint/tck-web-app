import React, { useState } from 'react';
import {
  ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import { Tune, Search } from '@mui/icons-material';
import CardsDisplay from '../../Components/BookBrowser/BookHub';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Filter from '../../Components/Filtering/Filtering';

import './BookBrowser.css';

const styles = {
  toggleGroup: {
    margin: '6vh auto 6vh 4vw',
  },
};
function BookBrowser() {
  const [alignment, setAlignment] = useState('Search');

  // Searching
  const [searchTerms, setSearchTerms] = useState('');
  const [searchCategory, setSearchCategory] = useState('keyword');

  // Filtering
  const [rangeInput, setRangeInput] = useState({
    age: [-1, 17],
    grade: [-1, 12],
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
          <div className="browser-quote">Book Browser</div>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            sx={styles.toggleGroup}
          >
            <ToggleButton value="Filter">
              <Tune />
              Filter
            </ToggleButton>
            <ToggleButton value="Search">

              <Search />
              Search
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
