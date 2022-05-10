/* eslint-disable max-len */
import React from 'react';
import {
  Box, Button, Avatar, Checkbox,
} from '@mui/material';
// import propTypes from 'prop-types';
// import QuizButton from './QuizButton';
import Sample from '../../Assets/Images/DemoImgGenre.png';
// import { Link } from 'react-router-dom';

export default function Quiz4Kid(/* {  title, buttonCaptions } */) {
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          {/* title */}
          Which of the following best describes you?
        </h1>
        <Button class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>I am almost always silly</p>
        </Button>
        <Button class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>I am usually silly, but I can be serious if I need to be</p>
        </Button>
        <Button class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>Depending on the situation, I can be either silly or serious</p>
        </Button>
        <Button class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>I am usually serious, but I can be silly sometimes</p>
        </Button>
        <Button class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>I am almost always serious</p>
        </Button>
      </Box>
    </div>
  );
}
