/* eslint-disable max-len */
import React from 'react';
import propTypes from 'prop-types';
import {
  Box,
} from '@mui/material';
// import illusion from '../../Assets/Images/illusion.png';
import QuizButton from './QuizButton';
// import { Link } from 'react-router-dom';

export default function Quiz8Adult({ bookFilters, setBookFilters }) {
  const handleClick = (val) => {
    // eslint-disable-next-line camelcase
    setBookFilters({ ...bookFilters, book_type: 'book_type'.push(val) });
  };
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          Please select your preferred book formats
        </h1>
        <h3>These will be used to rank your results but availability is not guaranteed!</h3>
        <QuizButton value="Picture Book" buttonCaption="Picture Book" onClick={(value) => handleClick(value)} />
        <QuizButton value="Chapter Book" buttonCaption="Chapter Book" onClick={(value) => handleClick(value)} />
        <QuizButton value="Early Reader" buttonCaption="Early Reader" onClick={(value) => handleClick(value)} />
        <QuizButton value="Middle Grade" buttonCaption="Middle Grade" onClick={(value) => handleClick(value)} />
        <QuizButton value="Young Adult" buttonCaption="Young Adult" onClick={(value) => handleClick(value)} />
        <QuizButton value="Series" buttonCaption="Series" onClick={(value) => handleClick(value)} />
        <QuizButton value="Anthology" buttonCaption="Anthology" onClick={(value) => handleClick(value)} />
        <QuizButton value="Board Book" buttonCaption="Board Book" onClick={(value) => handleClick(value)} />
      </Box>
    </div>
  );
}
Quiz8Adult.propTypes = {
  setBookFilters: propTypes.func.isRequired,
  bookFilters: propTypes.shape({
    bookId: propTypes.string.isRequired,
    'race/ethnicity': propTypes.arrayOf(propTypes.string).isRequired,
    minAge: propTypes.number.isRequired,
    maxAge: propTypes.number.isRequired,
    minGrade: propTypes.number.isRequired,
    maxGrade: propTypes.number.isRequired,
    genre: propTypes.arrayOf(propTypes.string).isRequired,
    book_type: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
};
