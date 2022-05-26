import React from 'react';
import propTypes from 'prop-types';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const CustomQuizSlider = styled(Slider)({
  color: '#3477DE',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 32,
    width: 32,
    backgroundColor: '#3477DE',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 18,
    background: 'unset',
    padding: 0,
    width: 55,
    height: 55,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#3477DE',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const marks = [
  {
    value: -1,
    label: 'Pre-K',
  },
  {
    value: 12,
    label: '12',
  },
];

function valueLabelFormat(value) {
  const units = ['Pre-K', 'K', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];

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
        <CustomQuizSlider
          label={() => 'Minimum distance'}
          aria-label="Custom marks"
          marks={marks}
          value={value1}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          disableSwap
          min={-1}
          max={12}
        />
      </Box>
    </div>
  );
}

GradeSlider.propTypes = {
  parentCallbackButton: propTypes.isRequired,
  parentCallback: propTypes.isRequired,
};
