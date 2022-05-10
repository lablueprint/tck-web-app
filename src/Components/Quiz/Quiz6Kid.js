/* eslint-disable max-len */
import React from 'react';
import {
  Box, Button, Avatar, Checkbox,
} from '@mui/material';
import propTypes from 'prop-types';
// import QuizButton from './QuizButton';
import Sample from '../../Assets/Images/DemoImgGenre.png';
// import { Link } from 'react-router-dom';

// const buttonCaptions = ['The lives of interesting and influential people',
//   'Fascinating facts about different topics such as nature, animals, or space',
//   'Important events of the past that shaped the world we live in today',
//   'A detailed retelling of a crucial period of time in an individual’s life',
//   'The case of a mysterious, unnatural phenomenon'];

export default function Quiz6Kid({ title, buttonCaptions }) {
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          {title}
          Which of the following would you be interested in reading about?
        </h1>
        <h3>You can choose more than one.</h3>
        <Button class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>{buttonCaptions[0]}</p>
        </Button>
        <Button class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>{buttonCaptions[1]}</p>
        </Button>
        <Button class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>{buttonCaptions[2]}</p>
        </Button>
        <Button class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>{buttonCaptions[3]}</p>
        </Button>
        <Button class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>{buttonCaptions[4]}</p>
        </Button>
      </Box>
    </div>
  );
}
Quiz6Kid.propTypes = {
  title: propTypes.string.isRequired,
  buttonCaptions: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
};
