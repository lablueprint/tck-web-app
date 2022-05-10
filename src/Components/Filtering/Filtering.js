import React, { useState } from 'react';
import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import propTypes from 'prop-types';
import { Search } from '@mui/icons-material';
import { RangeFilter, gradeRangeMetadata, ageRangeMetadata } from './RangeFilter';
import MultSelectElem from './MultiselectFilters';
import './Filtering.css';

export default function Filter({ setRangeState, setMultiSelectInput }) {
  const [tempRangeFilterData, setTempRangeFilterData] = useState({
    age:
    { min: ageRangeMetadata[0], max: ageRangeMetadata[18] },
    grade: { min: gradeRangeMetadata[0], max: gradeRangeMetadata[13] },
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
      age:
      { min: ageRangeMetadata[0], max: ageRangeMetadata[18] },
      grade: { min: gradeRangeMetadata[0], max: gradeRangeMetadata[13] },
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
      age:
      { min: ageRangeMetadata[0], max: ageRangeMetadata[18] },
      grade: { min: gradeRangeMetadata[0], max: gradeRangeMetadata[13] },
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

      <RangeFilter
        rangeFilterData={tempRangeFilterData}
        setRangeFilterData={setTempRangeFilterData}
      />

      <MultSelectElem
        setTempMultiSelect={setTempMultiSelect}
        tempMultiSelect={tempMultiSelect}
      />

      <div style={{ textAlign: 'right', textTransform: 'none', margin: '1vh 2vw 1vh 2vw' }}>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="contained"
          startIcon={<Search />}
          onClick={handleSave}
          sx={{ borderRadius: '12px' }}
        >
          Go!
        </Button>
      </div>

    </div>
  );
}

Filter.propTypes = {
  setMultiSelectInput: propTypes.func.isRequired,
  setRangeState: propTypes.func.isRequired,
};

/*

need to add functionality for cancel such that the fields reset when we press cancel
  -possible??? idk

OLD CODE:
<div style={{ display: 'flex', flexDirection: 'column', rowGap: 100 }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Filters
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <RangeFilter
            rangeFilterData={tempRangeFilterData}
            setRangeFilterData={setTempRangeFilterData}
          />

        </MenuItem>
        <MenuItem>
          <MultSelectElem
            setTempMultiSelect={setTempMultiSelect}
            tempMultiSelect={tempMultiSelect}
          />

        </MenuItem>
        <MenuItem>
          <button
            type="button"
            onClick={handleSave}
          >
            Save
          </button>
        </MenuItem>
      </Menu>
    </div>
 */
