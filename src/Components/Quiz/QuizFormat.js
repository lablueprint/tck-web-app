/* eslint-disable max-len */
import React from 'react';
import {
  Box,
} from '@mui/material';
// import illusion from '../../Assets/Images/illusion.png';
import QuizButton from './QuizButton';
// import { Link } from 'react-router-dom';

export default function QuizFormat() {
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          Please select your preferred book formats
        </h1>
        <h3>These will be used to rank your results but availability is not guaranteed!</h3>
        <QuizButton buttonCaption="Picture Book" />
        <QuizButton buttonCaption="Chapter Book" />
        <QuizButton buttonCaption="Early Reader" />
        <QuizButton buttonCaption="Middle Grade" />
        <QuizButton buttonCaption="Chapter Book" />
        <QuizButton buttonCaption="Young Adult" />
        <QuizButton buttonCaption="Series" />
        <QuizButton buttonCaption="Anthology" />
        <QuizButton buttonCaption="Board Book" />
      </Box>
    </div>
  );
}
