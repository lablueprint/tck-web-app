/* eslint-disable max-len */
import React, { useState } from 'react';
import propTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import {
  Box,
} from '@mui/material';
import illusion from '../../Assets/Images/illusion.png';
// import QuizButton from './QuizButton';

// import { Link } from 'react-router-dom';

export default function Quiz5({ /* bookfilters, setBookFilters */ setIllusions, parentCallback05 }) {
  const [isDisabled, setIsDisabled] = useState();
  const handleClick = (val) => {
    // eslint-disable-next-line no-param-reassign
    // console.timeLog('val');
    setIsDisabled(false);
    parentCallback05(isDisabled);
    console.log(val);
    setIllusions(val);
    // silly = val;
    // console.log('silly:');
    // console.log(silly);
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
            {/* <FormControlLabel control={<Radio value={3} onChange={(e) => handleClick(e.target.value)} />} label="Depending on the situation, I can be either silly or serious" />
            <FormControlLabel control={<Radio value={4} onChange={(e) => handleClick(e.target.value)} />} label="I am usually serious, but I can be silly sometimes" />
            <FormControlLabel control={<Radio value={5} onChange={(e) => handleClick(e.target.value)} />} label="I am almost always serious" /> */}
          </RadioGroup>
        </FormControl>
        {/* <QuizButton value={1} buttonCaption="A younger person" onChange={(e) => handleClick(e.target.value)} />
        <QuizButton value={2} buttonCaption="An older person" onChange={(e) => handleClick(e.target.value)} /> */}
      </Box>
    </div>
  );
}
Quiz5.propTypes = {
  // setBookFilters: propTypes.func.isRequired,
  // bookFilters: propTypes.shape({
  //   bookId: propTypes.string.isRequired,
  //   'race/ethnicity': propTypes.arrayOf(propTypes.string).isRequired,
  //   minAge: propTypes.number.isRequired,
  //   maxAge: propTypes.number.isRequired,
  //   minGrade: propTypes.number.isRequired,
  //   maxGrade: propTypes.number.isRequired,
  //   genre: propTypes.arrayOf(propTypes.string).isRequired,
  //   book_type: propTypes.arrayOf(propTypes.string).isRequired,
  // }).isRequired,
  setIllusions: propTypes.func.isRequired,
  parentCallback05: propTypes.isRequired,
};
