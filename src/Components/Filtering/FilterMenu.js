import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import propTypes from 'prop-types';
import { Search, ChevronLeft } from '@mui/icons-material';
import MultiselectFilter from './MultiselectFilter';
import RangeFilter from './RangeFilter';
import './Filtering.css';
import { ageRangeMetadata, gradeRangeMetadata } from '../../Constants';
import base from '../../airtable';

const styles = {
  homepageButton: {
    textTransform: 'none',
    fontFamily: 'DM Sans',
  },
  resetButton: {
    textTransform: 'none',
    marginRight: '2.5em',
    fontFamily: 'DM Sans',
  },
  searchButton: {
    borderRadius: '12px',
    padding: '0.7em 1.25em',
    textTransform: 'none',
    fontFamily: 'DM Sans',
  },
};

export default function FilterMenu({ setRangeState, setMultiSelectInput }) {
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

  const [multiselectMetadata, setMultiselectMetadata] = useState([]);

  const getMetadata = () => {
    base('Book Tag Metadata').select({ view: 'Grid view' }).all()
      .then((records) => {
        setMultiselectMetadata(records);
      });
  };

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

  useEffect(getMetadata, []);

  return (
    <div className="menu-wrapper">
      <div className="range-filter-grid">
        <RangeFilter
          filterLabel="Age"
          input={tempRangeFilterData}
          setInput={setTempRangeFilterData}
          filterOptions={ageRangeMetadata}
        />
        <RangeFilter
          filterLabel="Grade"
          input={tempRangeFilterData}
          setInput={setTempRangeFilterData}
          filterOptions={gradeRangeMetadata}
        />
      </div>
      <div className="multiselect-grid">
        {multiselectMetadata && multiselectMetadata.map((option) => (
          <div className="multi-select-component" key={option.fields.id}>
            <MultiselectFilter
              filterLabel={option.fields.display}
              filterOptions={(option.fields.options)}
              input={tempMultiSelect}
              setInput={setTempMultiSelect}
              filterName={option.fields.name}
            />
          </div>
        ))}
      </div>
      <div className="filter-button-wrapper">
        <Button component={NavLink} to="/" sx={styles.homepageButton} startIcon={<ChevronLeft />}>
          Return to Homepage
        </Button>
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

FilterMenu.propTypes = {
  setMultiSelectInput: propTypes.func.isRequired,
  setRangeState: propTypes.func.isRequired,
};
