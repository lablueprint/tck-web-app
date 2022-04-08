import React, { useState } from 'react';
import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import propTypes from 'prop-types';
import { Search } from '@mui/icons-material';
import RangeFilter from './RangeFilter';
import MultSelectElem from './MultiselectFilters';

const gradeRangeMetadata = ['0 to Pre-K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
const ageRangeMetadata = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

export default function Filter({ setRangeState, setMultiSelectInput }) {
  // const [anchorEl, setAnchorEl] = useState(null);
  const [tempRangeFilterData, setTempRangeFilterData] = useState({
    age:
    { min: ageRangeMetadata[0], max: ageRangeMetadata[18] },
    grade: { min: gradeRangeMetadata[0], max: gradeRangeMetadata[12] },
  });
  const [tempMultiSelect, setTempMultiSelect] = useState({
    Ethnicity: [],
    Religion: [],
    Gender: [],
    Sexuality: [],
  });
  // const open = Boolean(anchorEl);

  const handleSave = () => {
    setRangeState(tempRangeFilterData);
    setMultiSelectInput(tempMultiSelect);
  };
  /*
  const handleClick = (event) => {
    // console.log(tempRangeFilterData);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  */
  const handleCancel = () => {
    console.log('L + ratio');
    setTempRangeFilterData({
      age:
      { min: ageRangeMetadata[0], max: ageRangeMetadata[18] },
      grade: { min: gradeRangeMetadata[0], max: gradeRangeMetadata[12] },
    });
    setTempMultiSelect({
      Ethnicity: [],
      Religion: [],
      Gender: [],
      Sexuality: [],
    });
    setRangeState({
      age:
      { min: ageRangeMetadata[0], max: ageRangeMetadata[18] },
      grade: { min: gradeRangeMetadata[0], max: gradeRangeMetadata[12] },
    });
    setMultiSelectInput({
      Ethnicity: [],
      Religion: [],
      Gender: [],
      Sexuality: [],
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 100 }}>

      <RangeFilter
        rangeFilterData={tempRangeFilterData}
        setRangeFilterData={setTempRangeFilterData}
      />

      <MultSelectElem
        setTempMultiSelect={setTempMultiSelect}
        tempMultiSelect={tempMultiSelect}
      />

      <div className="Buttons">
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
