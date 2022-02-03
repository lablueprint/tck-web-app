/* eslint-disable max-len */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import propTypes from 'prop-types';
import RangeFilterCard from './RangeFilterCard';

function RangeFilter({ records }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterData, setFilterData] = useState({ age: { min: '', max: '' }, grade: { min: '', max: '' } });
  const open = Boolean(anchorEl);
  const handleSave = () => {
    console.log(filterData);
    console.log(records);
    // records.map((element) => (element.grade_range.length ? console.log(parseInt(element.fields.grade_range[0].split('th')[0], 10)) : 'nothing'));
    // records.filter((element) => (parseInt(element.fields.grade_range[0].split('th')[0], 10) >= filterData.grade.min
    // && parseInt(element.fields.grade_range[0].split(' ')[2].split('th')[0], 10) <= filterData.grade.max)
    // && parseInt(element.fields.age_range[0].split('-')[0], 10) >= filterData.age.min
    // && parseInt(element.fields.age_range[0].split('-')[0], 10) <= filterData.age.max);
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
          <RangeFilterCard filterTitle="Grade" data={filterData} handleChange={HandleChange} />
        </MenuItem>
        <MenuItem>
          <RangeFilterCard filterTitle="Age" data={filterData} handleChange={HandleChange} />
        </MenuItem>
        <MenuItem>
          <button
            type="button"
            // id="basic-button"
            // aria-controls={open ? 'basic-menu' : undefined}
            // aria-haspopup="true"
            // aria-expanded={open ? 'true' : undefined}
            onClick={handleSave}
          >
            Save
          </button>
        </MenuItem>
      </Menu>
    </div>
  );
}

RangeFilter.propTypes = {
  records: propTypes.arrayOf.isRequired,
};
export default RangeFilter;
