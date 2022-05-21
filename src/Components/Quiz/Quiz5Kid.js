import React from 'react';
import propTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {
  Box,
} from '@mui/material';
import illusion from '../../Assets/Images/illusion.png';

export default function Quiz5({ setIllusions }) {
  const handleClick = (val) => {
    setIllusions(val);
  };
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          What do you see in the picture below?
        </h1>
        <div><img src={illusion} alt="Illusion Missing" /></div>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel control={<Radio value={1} onChange={(e) => handleClick(e.target.value)} />} label="A younger person" />
            <FormControlLabel control={<Radio value={2} onChange={(e) => handleClick(e.target.value)} />} label="An older person" />
          </RadioGroup>
        </FormControl>
      </Box>
    </div>
  );
}
Quiz5.defaultProps = {
  setIllusions: null,
};
Quiz5.propTypes = {
  setIllusions: propTypes.func,
};
