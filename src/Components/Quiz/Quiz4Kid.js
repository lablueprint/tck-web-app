import React from 'react';
import {
  Box,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import propTypes from 'prop-types';

export default function Quiz4Kid({ setSilly }) {
  const handleClick = (val) => {
    setSilly(val);
  };

  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          Which of the following best describes you?
        </h1>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel control={<Radio value={1} onChange={(e) => handleClick(e.target.value)} />} label="I am almost always silly" />
            <FormControlLabel control={<Radio value={2} onChange={(e) => handleClick(e.target.value)} />} label="I am usually silly, but I can be serious if I need to be" />
            <FormControlLabel control={<Radio value={3} onChange={(e) => handleClick(e.target.value)} />} label="I can be either silly or serious" />
            <FormControlLabel control={<Radio value={4} onChange={(e) => handleClick(e.target.value)} />} label="I am usually serious, but I can be silly sometimes" />
            <FormControlLabel control={<Radio value={5} onChange={(e) => handleClick(e.target.value)} />} label="I am almost always serious" />
          </RadioGroup>
        </FormControl>
      </Box>
    </div>
  );
}
Quiz4Kid.propTypes = {
  setSilly: propTypes.func.isRequired,
};
