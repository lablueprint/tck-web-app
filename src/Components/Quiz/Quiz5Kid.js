/* eslint-disable max-len */
import React from 'react';
import {
  Box,
} from '@mui/material';
import illusion from '../../Assets/Images/illusion.png';
import QuizButton from './QuizButton';
// import { Link } from 'react-router-dom';

export default function Quiz5() {
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          What do you see in the picture below?
        </h1>
        <div><img src={illusion} alt="Illusion Missing" /></div>
        <QuizButton buttonCaption="A younger person" />
        <QuizButton buttonCaption="An older person" />
      </Box>
    </div>
  );
}
