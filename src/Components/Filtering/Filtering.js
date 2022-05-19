import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import propTypes from 'prop-types';
import { Search, ChevronLeft } from '@mui/icons-material';
import MultSelectElem from './MultiselectFilters';
import './Filtering.css';
import RangeFilterCard from './RangeFilterCard';

export const gradeRangeMetadata = ['0 to Pre-K', 'Kindergarten', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
export const ageRangeMetadata = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

const styles = {
  homepageButton: {
    textTransform: 'none',
    marginLeft: '2.25em',
    fontFamily: 'DM Sans',
  },
  resetButton: {
    textTransform: 'none',
    marginRight: '2.5em',
    fontFamily: 'Arimo',
  },
  searchButton: {
    borderRadius: '12px',
    padding: '0.7em 1.25em',
    textTransform: 'none',
    fontFamily: 'Arimo',
  },
};

export default function Filter({ setRangeState, setMultiSelectInput }) {
  const [tempRangeFilterData, setTempRangeFilterData] = useState({
    age: [-1, 17],
    grade: [-1, 12],
  });
  const [tempMultiSelect, setTempMultiSelect] = useState({
    'race/ethnicity': [],
    identity_tags: [],
    religion: [],
    genre: [],
    'theme/lessons': [],
    book_type: [],
  });

  const handleSave = () => {
    setRangeState(tempRangeFilterData);
    setMultiSelectInput(tempMultiSelect);
  };

  const handleCancel = () => {
    setTempRangeFilterData({
      age: [-1, 17],
      grade: [-1, 12],
    });
    setTempMultiSelect({
      'race/ethnicity': [],
      identity_tags: [],
      religion: [],
      genre: [],
      'theme/lessons': [],
      book_type: [],
    });
    setRangeState({
      age: [-1, 17],
      grade: [-1, 12],
    });
    setMultiSelectInput({
      'race/ethnicity': [],
      identity_tags: [],
      religion: [],
      genre: [],
      'theme/lessons': [],
      book_type: [],
    });
  };

  return (
    <div className="filter-wrapper">
      <div className="range-filter-wrapper">

        <RangeFilterCard filterTitle="Age" setData={setTempRangeFilterData} data={tempRangeFilterData} optionsArray={ageRangeMetadata} />

        <RangeFilterCard filterTitle="Grade" setData={setTempRangeFilterData} data={tempRangeFilterData} optionsArray={gradeRangeMetadata} />
      </div>
      <MultSelectElem
        setTempMultiSelect={setTempMultiSelect}
        tempMultiSelect={tempMultiSelect}
      />

      <div className="filter-button-wrapper">
        <NavLink
          to="/"
          className="homepage-button"
        >
          <Button sx={styles.homepageButton} startIcon={<ChevronLeft />}>
            Return to Homepage
          </Button>
        </NavLink>
        <div className="cancel-and-go-button-wrapper">
          <Button onClick={handleCancel} sx={styles.resetButton}>
            Reset
          </Button>
          <Button
            type="button"
            variant="contained"
            startIcon={<Search />}
            onClick={handleSave}
            sx={styles.searchButton}
          >
            Go!
          </Button>
        </div>
      </div>

    </div>
  );
}

Filter.propTypes = {
  setMultiSelectInput: propTypes.func.isRequired,
  setRangeState: propTypes.func.isRequired,
};
