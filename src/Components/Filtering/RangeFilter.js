import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import RangeFilterCard from './RangeFilterCard';

function RangeFilter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterData, setFilterData] = useState({ age: { min: '', max: '' }, grade: { min: '', max: '' } });
  const open = Boolean(anchorEl);
  const HandleSave = () => {
    console.log('Here');
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const HandleChange = (event) => {
    if (event.target.name === 'Age-min') {
      setFilterData((prevValue) => (
        { ...prevValue, age: { min: event.target.value, max: prevValue.age.max } }
      ));
    } else if (event.target.name === 'Age-max') {
      setFilterData((prevValue) => (
        { ...prevValue, age: { max: event.target.value, min: prevValue.age.min } }
      ));
    } else if (event.target.name === 'Grade-min') {
      setFilterData((prevValue) => (
        { ...prevValue, grade: { min: event.target.value, max: prevValue.grade.max } }
      ));
    } else if (event.target.name === 'Grade-max') {
      setFilterData((prevValue) => (
        { ...prevValue, grade: { max: event.target.value, min: prevValue.grade.min } }
      ));
    }
    console.log(filterData);
  };
  return (
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
          <RangeFilterCard filterTitle="Grade" handleChange={HandleChange} />
        </MenuItem>
        <MenuItem>
          <RangeFilterCard filterTitle="Age" handleChange={HandleChange} />
        </MenuItem>
        <MenuItem>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={HandleSave}
          >
            Save
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default RangeFilter;
