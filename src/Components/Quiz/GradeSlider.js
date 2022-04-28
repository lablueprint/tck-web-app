import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: -1,
    label: 'Pre-k',
  },
  {
    value: 12,
    label: '12',
  },
];

function valuetext(value) {
  return `${value}`;
}

const minDistance = 0;

export default function GradeSlider() {
  const [value1, setValue1] = React.useState([4, 7]);

  const handleChange1 = (event, newValue, activeThumb) => {
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
    <Box sx={{ width: 550 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        aria-label="Custom marks"
        marks={marks}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={-1}
        max={12}
      />
    </Box>
  );
}
