import React from 'react';
import propTypes from 'prop-types';
import { Slider } from '@mui/material';
import './Filtering.css';
import { styled } from '@mui/material/styles';

const CustomRangeSlider = styled(Slider)({
  '& .MuiSlider-rail': {
    height: '2.5px',
  },
  '& .MuiSlider-track': {
    height: '3px',
  },
  '& .MuiSlider-markLabel': {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'DM Sans',
    top: 46,
    backgroundColor: 'unset',
    color: '#000',
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
});

const minDistance = 0;
function RangeFilter({
  filterLabel, filterOptions, setInput, input,
}) {
  const marks = filterOptions.map((element, index) => {
    if (filterLabel === 'Grade') {
      if (index === 0) { return { value: index - 1, label: 'Pre-K' }; }
      if (index === filterOptions.length - 1) { return { value: index - 1, label: `${filterOptions[index]}` }; }
      return { value: index - 1 };
    }
    if (filterLabel === 'Age') {
      if (index === 0) {
        return { value: index - 1, label: `${filterOptions[index]}` };
      }
      if (index === filterOptions.length - 1) {
        return { value: index - 1, label: '18+' };
      }
    }
    return { value: index - 1 };
  });

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (filterLabel === 'Age') {
      if (activeThumb === 0) {
        setInput((prevValue) => (
          {
            ...prevValue,
            age: [Math.min(newValue[0], input.age[1] - minDistance), input.age[1]],
          }));
      } else {
        setInput((prevValue) => (
          {
            ...prevValue,
            age: [input.age[0], Math.max(newValue[1], input.age[0] + minDistance)],
          }));
      }
    } else if (filterLabel === 'Grade') {
      if (activeThumb === 0) {
        setInput((prevValue) => (
          {
            ...prevValue,
            grade: [Math.min(newValue[0], input.grade[1] - minDistance), input.grade[1]],
          }));
      } else {
        setInput((prevValue) => (
          {
            ...prevValue,
            grade: [input.grade[0], Math.max(newValue[1], input.grade[0] + minDistance)],
          }));
      }
    }
  };
  return (
    <div className="range-slider-wrapper">
      <p className="range-slider-title">
        {filterLabel === 'Grade' ? 'Reading Grade Level' : filterLabel}
      </p>
      <CustomRangeSlider
        name={filterLabel}
        getAriaLabel={() => (filterLabel === 'Grade' ? 'Reading Grade Level' : filterLabel)}
        marks={marks}
        value={filterLabel === 'Age' ? input.age : input.grade}
        onChange={handleChange1}
        valueLabelDisplay="on"
        getAriaValueText={(value) => `${filterOptions[value + 1]}`}
        valueLabelFormat={(value) => {
          if (value === -1 || value === filterOptions.length - 2) { return ''; }
          if (filterLabel === 'Grade' && value === 0) { return 'K'; }
          return `${filterOptions[value + 1]}`;
        }}
        disableSwap
        min={-1}
        max={filterOptions.length - 2}
      />
    </div>
  );
}

RangeFilter.propTypes = {
  filterLabel: propTypes.string,
  input: propTypes.shape(
    {
      age: propTypes.arrayOf(propTypes.number),
      grade: propTypes.arrayOf(propTypes.number),
    },
  ).isRequired,
  setInput: propTypes.func.isRequired,
  filterOptions: propTypes.arrayOf(propTypes.oneOfType([
    propTypes.string,
    propTypes.number])),
};

RangeFilter.defaultProps = {
  filterLabel: '',
  filterOptions: [],
};
export default RangeFilter;
