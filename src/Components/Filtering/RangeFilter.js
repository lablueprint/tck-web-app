/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import propTypes from 'prop-types';
import RangeFilterCard from './RangeFilterCard';

const gradeRangeMetadata = ['0 to Pre-K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
const ageRangeMetadata = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

function RangeFilter({ records }) {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [filterName, setFilterName] = useState('');
  const [filterData, setFilterData] = useState({ age: { min: ageRangeMetadata[0], max: ageRangeMetadata[18] }, grade: { min: gradeRangeMetadata[0], max: gradeRangeMetadata[12] } });
  const open = Boolean(anchorEl);
  const handleSave = () => {
    let updatedRecords = [];
    // let GradeIndexArray=[...Array(13).keys()];
    // let AgeIndexArray=[...Array(19).keys()];
    const validGradeTags = gradeRangeMetadata.slice(gradeRangeMetadata.indexOf(filterData.grade.min), gradeRangeMetadata.indexOf(filterData.grade.max) + 1);
    const validAgeTags = ageRangeMetadata.slice(ageRangeMetadata.indexOf(filterData.age.min), ageRangeMetadata.indexOf(filterData.age.max) + 1);
    console.log(filterData);
    console.log(records);
    updatedRecords = records.filter((record) => (record.fields.age_range.some((val) => validAgeTags.indexOf(val) !== -1)));
    updatedRecords = updatedRecords.filter((rec) => (rec.fields.grade_range.some((value) => validGradeTags.indexOf(value) !== -1)));// fields.age_range();
    // updatedRecords = records.map((element) => (element.fields.grade_range.map((gradeArr) => (gradeArr.split(' ').filter((arrElement) => arrElement !== 'to')))));
    // updatedRecords = updatedRecords.map((element) => (element.flat()));
    // updatedRecords = updatedRecords.map((element) => (element.map((member) => { if (member !== 'pre-k') { return (member.charAt(0) - '0'); } return 0; })));
    console.log(updatedRecords);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const HandleChange = (name, newValue, event) => {
    if (name === 'Age-min') {
      setFilterData((prevValue) => (
        { ...prevValue, age: { min: newValue, max: prevValue.age.max } }
      ));
    } else if (name === 'Age-max') {
      setFilterData((prevValue) => (
        { ...prevValue, age: { max: newValue, min: prevValue.age.min } }
      ));
    } else if (name === 'Grade-min') {
      setFilterData((prevValue) => (
        { ...prevValue, grade: { min: newValue, max: prevValue.grade.max } }
      ));
    } else if (name === 'Grade-max') {
      setFilterData((prevValue) => (
        { ...prevValue, grade: { max: newValue, min: prevValue.grade.min } }
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
          <RangeFilterCard filterTitle="Grade" data={filterData} optionsArray={gradeRangeMetadata} handleChange={HandleChange} />
        </MenuItem>
        <MenuItem>
          <RangeFilterCard filterTitle="Age" data={filterData} optionsArray={ageRangeMetadata} handleChange={HandleChange} />
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
