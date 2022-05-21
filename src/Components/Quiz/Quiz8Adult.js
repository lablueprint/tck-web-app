import React from 'react';
import propTypes from 'prop-types';
import {
  Box,
} from '@mui/material';
import QuizButton from './QuizButton';

export default function Quiz8Adult({ bookFilters, setBookFilters }) {
  const handleClick = (val) => {
    setBookFilters({ ...bookFilters, book_type: 'book_type'.push(val) });
  };
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          Please select your preferred book formats
        </h1>
        <h3>These will be used to rank your results but availability is not guaranteed!</h3>
        <QuizButton value="Picture Book" buttonCaption="Picture Book" onChange={(e) => handleClick(e.target.value)} />
        <QuizButton value="Chapter Book" buttonCaption="Chapter Book" onChange={(e) => handleClick(e.target.value)} />
        <QuizButton value="Early Reader" buttonCaption="Early Reader" onChange={(e) => handleClick(e.target.value)} />
        <QuizButton value="Middle Grade" buttonCaption="Middle Grade" onChange={(e) => handleClick(e.target.value)} />
        <QuizButton value="Young Adult" buttonCaption="Young Adult" onChange={(e) => handleClick(e.target.value)} />
        <QuizButton value="Series" buttonCaption="Series" onChange={(e) => handleClick(e.target.value)} />
        <QuizButton value="Anthology" buttonCaption="Anthology" onChange={(e) => handleClick(e.target.value)} />
        <QuizButton value="Board Book" buttonCaption="Board Book" onChange={(e) => handleClick(e.target.value)} />
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
