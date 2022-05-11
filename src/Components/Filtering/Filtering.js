import React, { useState } from 'react';
import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import propTypes from 'prop-types';
import { Search } from '@mui/icons-material';
import MultSelectElem from './MultiselectFilters';
import './Filtering.css';
import RangeFilterCard from './RangeFilterCard';

export const gradeRangeMetadata = ['0 to Pre-K', 'Kindergarten', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
export const ageRangeMetadata = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export default function Filter({ setRangeState, setMultiSelectInput }) {
  const [tempRangeFilterData, setTempRangeFilterData] = useState({
    age: [0, 18],
    grade: [0, 13],
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
      age: [0, 18],
      grade: [0, 13],
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
      age: [0, 18],
      grade: [0, 13],
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
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', width: '100%', margin: '0vh auto',
      }}
      >

        <RangeFilterCard filterTitle="Grade" setData={setTempRangeFilterData} data={tempRangeFilterData} optionsArray={gradeRangeMetadata} />

        <RangeFilterCard filterTitle="Age" setData={setTempRangeFilterData} data={tempRangeFilterData} optionsArray={ageRangeMetadata} />
      </div>
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
