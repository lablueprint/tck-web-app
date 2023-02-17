import React, { useState } from 'react';
import {
  Tabs, Tab,
} from '@mui/material';
import { Tune, Search } from '@mui/icons-material';
import BookCardsDisplay from '../../Components/BookBrowser/BookCardsDisplay';
import SearchBar from '../../Components/SearchBar/SearchBar';
import FilterMenu from '../../Components/Filtering/FilterMenu';
import './BookBrowser.css';

const styles = {
  tab: {
    textTransform: 'none',
    fontFamily: 'DM Sans',
    fontWeight: 'bold',
    fontSize: '1em',
    paddingBottom: '0px',
  },
  tabGroup: {
    margin: '0 auto 3vh 4vw',
  },
};

function BookBrowser() {
  const [alignment, setAlignment] = useState('Filter');

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
    <div>
      <div className="browser-background">
        <div className="browser">
          <div className="browser-head">
            <div className="browser-quote">Book Search</div>
            <Tabs
              color="primary"
              value={alignment}
              onChange={handleChange}
              sx={styles.tabGroup}
            >
              <Tab
                value="Filter"
                label="Filter"
                icon={<Tune />}
                iconPosition="start"
                sx={styles.tab}
              />
              <Tab
                value="Search"
                label="Search"
                icon={<Search />}
                iconPosition="start"
                sx={styles.tab}
              />
            </Tabs>
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
              <FilterMenu
                setRangeState={setRangeInput}
                setMultiSelectInput={setMultiSelectInput}
              />
            )
        }
          </div>
        </div>
      </div>
      <BookCardsDisplay
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
