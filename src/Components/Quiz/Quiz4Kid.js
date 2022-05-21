import React from 'react';
import {
  Box,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import propTypes from 'prop-types';
import VerySerious from '../../Assets/Images/TCK_Mood - Very Serious.svg';
import Serious from '../../Assets/Images/TCK_Mood - Serious.png';
import Neutral from '../../Assets/Images/TCK_Mood - Neutral.png';
import Silly from '../../Assets/Images/TCK_Mood - Silly.png';
import VerySilly from '../../Assets/Images/TCK_Mood - Very Silly.png';

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
            <div>
              <img src={VerySilly} alt="Very Silly Missing" />
              <FormControlLabel control={<Radio value={1} onChange={(e) => handleClick(e.target.value)} />} label="I am almost always silly" />
            </div>
            <div>
              <img src={Silly} alt="Silly Missing" />
              <FormControlLabel control={<Radio value={2} onChange={(e) => handleClick(e.target.value)} />} label="I am usually silly, but I can be serious if I need to be" />

            </div>
            <div>
              <img src={Neutral} alt="Neutral Missing" />
              <FormControlLabel control={<Radio value={3} onChange={(e) => handleClick(e.target.value)} />} label="I can be either silly or serious" />
            </div>
            <div>
              <img src={Serious} alt="Serious Missing" />
              <FormControlLabel control={<Radio value={4} onChange={(e) => handleClick(e.target.value)} />} label="I am usually serious, but I can be silly sometimes" />
            </div>
            <div>
              <img src={VerySerious} alt="Very Serious Missing" />
              <FormControlLabel control={<Radio value={5} onChange={(e) => handleClick(e.target.value)} />} label="I am almost always serious" />
            </div>
          </RadioGroup>
        </FormControl>
      </Box>
    </div>
  );
}
Quiz4Kid.propTypes = {
  setSilly: propTypes.func.isRequired,
};
