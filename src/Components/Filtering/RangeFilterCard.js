import React/* , { useRef } */ from 'react';
import propTypes from 'prop-types';
import Slider from '@mui/material/Slider';

const minDistance = 0;
function RangeFilterCard({
  filterTitle, optionsArray, setData, data,
}) {
  const marks = optionsArray.map((element, index) => {
    if (index === 0 || index === optionsArray.length - 1) {
      return { value: index, label: optionsArray[index] };
    }

    return { value: index };
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
    <div style={{ flex: '0 0 35%', margin: '1vh auto 1vh auto' }}>
      <p style={{ textAlign: 'left' }}>{filterTitle}</p>
      <div>
        <Slider
          sx={{
            '& .MuiSlider-rail': {
              height: '2.5px',
            },
            '& .MuiSlider-track': {
              height: '3px',
            },
          }}
          name={filterTitle}
          Label={() => 'Minimum distance'}
          marks={marks}
          value={filterTitle === 'Age' ? data.age : data.grade}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          getAriaValueText={(value) => optionsArray[value + 1]}
          valueLabelFormat={(value) => optionsArray[value + 1]}
          disableSwap
          min={0}
          max={optionsArray.length - 1}
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
  optionsArray: propTypes.arrayOf(propTypes.string),
};

RangeFilterCard.defaultProps = {
  filterTitle: '',
  optionsArray: [],
};
export default RangeFilterCard;
