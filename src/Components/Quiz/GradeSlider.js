import React from 'react';
import propTypes from 'prop-types';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

export const CustomRangeSlider = styled(Slider)({
  '& .MuiSlider-rail': {
    height: '12px',
    border: '2px solid #393EBA',
    background: 'white',
  },
  '& .MuiSlider-track': {
    height: '18px',
    background: '#393EBA',
    color: '#393EBA',
  },
  '& .MuiSlider-markLabel': {
    fontFamily: 'DM Sans',
    fontSize: 24,
    top: '45px',
    color: '#444444',
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 24,
    fontWeight: 'normal',
    fontFamily: 'DM Sans',
    top: 100,
    color: '#444444',
    backgroundColor: 'unset',
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: '#444444',
    },
  },
  '& .MuiSlider-thumb': {
    height: 55,
    width: 55,
    backgroundColor: '#393EBA',
    border: '2px solid #393EBA',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-mark': {
    background: '#444444',
    width: '6px',
    height: '6px',
  },
});

const units = ['Pre-K', 'K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];

const marks = units.map((element, index) => {
  if (index === 0) { return { value: index - 1, label: 'Pre-K' }; }
  if (index === units.length - 1) { return { value: index - 1, label: `${units[index]}` }; }
  return { value: index - 1 };
});

function valueLabelFormat(value) {
  return `${units[value + 1]}`;
}

const minDistance = 0;

export default function GradeSlider({ parentCallback, parentCallbackButton }) {
  const [value1, setValue1] = React.useState([-1, 12]);
  const [isDisabledSlider, setIsDisabledSlider] = React.useState();

  const handleChange1 = (event, newValue, activeThumb) => {
    setIsDisabledSlider(false);
    parentCallbackButton(isDisabledSlider);
    parentCallback(newValue[0], newValue[1]);

    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };
  return (
    <div>
      <Box sx={{ width: 550 }}>
        <CustomRangeSlider
          name="Grade"
          aria-label="Grade"
          marks={marks}
          value={value1}
          onChange={handleChange1}
          valueLabelDisplay="on"
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={(value) => {
            if (value === -1 || value === units.length - 2) { return ''; }
            if (value === 0) { return 'K'; }
            return `${units[value + 1]}`;
          }}
          disableSwap
          min={-1}
          max={units.length - 2}
          label={() => 'Minimum distance'}

        />
      </Box>
    </div>
  );
}

GradeSlider.propTypes = {
  parentCallbackButton: propTypes.isRequired,
  parentCallback: propTypes.isRequired,
};