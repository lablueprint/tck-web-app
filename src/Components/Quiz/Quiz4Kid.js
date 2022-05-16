/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import {
  Box, Button, Avatar, Checkbox,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import propTypes from 'prop-types';
// import QuizButton from './QuizButton';
import Sample from '../../Assets/Images/DemoImgGenre.png';
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
export default function Quiz4Kid({ /* bookfilters, setBookFilters, */ silly, setSilly }/* {  title, buttonCaptions } */) {
  const handleClick = (val) => {
    // eslint-disable-next-line no-param-reassign
    setSilly(val);
    // silly = val;
    // console.log('silly:');
    // console.log(silly);
  };

  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          {/* title */}
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
            <FormControlLabel control={<Radio value={3} onChange={(e) => handleClick(e.target.value)} />} label="Depending on the situation, I can be either silly or serious" />
            <FormControlLabel control={<Radio value={4} onChange={(e) => handleClick(e.target.value)} />} label="I am usually serious, but I can be silly sometimes" />
            <FormControlLabel control={<Radio value={5} onChange={(e) => handleClick(e.target.value)} />} label="I am almost always serious" />
          </RadioGroup>
        </FormControl>
        {/* <Button class="button" sx={{ m: 7 }} value={0} size="large" variant="outlined" onClick={handleClick(0)} startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>I am almost always silly</p>
        </Button>
        <Button class="button" sx={{ m: 7 }} value={1} size="large" variant="outlined" onClick={handleClick(1)} startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>I am usually silly, but I can be serious if I need to be</p>
        </Button>
        <Button class="button" sx={{ m: 7 }} value={2} size="large" variant="outlined" onClick={handleClick(2)} startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>Depending on the situation, I can be either silly or serious</p>
        </Button>
        <Button class="button" sx={{ m: 7 }} value={1} size="large" variant="outlined" onClick={handleClick(1)} startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>I am usually serious, but I can be silly sometimes</p>
        </Button> */}
        {/* <Button class="button" sx={{ m: 7 }} value={3} size="large" variant="outlined" onClick={handleClick(3)} startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>I am almost always serious</p>
        </Button> */}
      </Box>
    </div>
  );
}
Quiz4Kid.propTypes = {
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
  setSilly: propTypes.func.isRequired,
  silly: propTypes.number.isRequired,
};
