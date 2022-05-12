import React/* , { useRef } */ from 'react';
import propTypes from 'prop-types';
import Slider from '@mui/material/Slider';
import './Filtering.css';

const minDistance = 0;
function RangeFilterCard({
  filterTitle, optionsArray, setData, data,
}) {
  const marks = optionsArray.map((element, index) => {
    if (filterTitle === 'Grade') {
      if (index === 0) { return { value: index - 1, label: 'Pre-K' }; }
      if (index === optionsArray.length - 1) { return { value: index - 1, label: `${optionsArray[index]}` }; }
      return { value: index - 1 };
    }
    if (filterTitle === 'Age') {
      if (index === 0) {
        return { value: index - 1, label: `${optionsArray[index]}` };
      }
      if (index === optionsArray.length - 1) {
        return { value: index - 1, label: '18+' };
      }
    }
    return { value: index - 1 };
  });

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (filterTitle === 'Age') {
      if (activeThumb === 0) {
        setData((prevValue) => (
          { ...prevValue, age: [Math.min(newValue[0], data.age[1] - minDistance), data.age[1]] }));
      } else {
        setData((prevValue) => (
          { ...prevValue, age: [data.age[0], Math.max(newValue[1], data.age[0] + minDistance)] }));
      }
    } else if (filterTitle === 'Grade') {
      if (activeThumb === 0) {
        setData((prevValue) => (
          {
            ...prevValue,
            grade: [Math.min(newValue[0], data.grade[1] - minDistance), data.grade[1]],
          }));
      } else {
        setData((prevValue) => (
          {
            ...prevValue,
            grade: [data.grade[0], Math.max(newValue[1], data.grade[0] + minDistance)],
          }));
      }
    }
  };
  return (
    <div className="range-slider-wrapper">
      <p className="range-slider-title">
        {filterTitle === 'Grade' ? 'Reading Grade Level' : filterTitle}
      </p>
      <div>
        <Slider
          sx={{
            '& .MuiSlider-rail': {
              height: '2.5px',
            },
            '& .MuiSlider-track': {
              height: '3px',
            },
            '& .MuiSlider-markLabel': {
              // top: -10,
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
          }}
          name={filterTitle}
          Label={() => 'Minimum distance'}
          marks={marks}
          value={filterTitle === 'Age' ? data.age : data.grade}
          onChange={handleChange1}
          valueLabelDisplay="on"
          getAriaValueText={(value) => `${optionsArray[value + 1]}`}
          valueLabelFormat={(value) => {
            if (value === -1 || value === optionsArray.length - 2) { return ''; }
            if (filterTitle === 'Grade' && value === 0) { return 'K'; }
            return `${optionsArray[value + 1]}`;
          }}
          disableSwap
          min={-1}
          max={optionsArray.length - 2}
        />
      </div>
    </div>
  );
}

RangeFilterCard.propTypes = {
  filterTitle: propTypes.string,
  data: propTypes.shape(
    {
      age: propTypes.arrayOf(propTypes.number),
      grade: propTypes.arrayOf(propTypes.number),
    },
  ).isRequired,
  setData: propTypes.func.isRequired,
  optionsArray: propTypes.arrayOf(propTypes.string || propTypes.number),
};

RangeFilterCard.defaultProps = {
  filterTitle: '',
  optionsArray: [],
};
export default RangeFilterCard;
