import React from 'react';
import propTypes from 'prop-types';
import {
  Box,
} from '@mui/material';
import QuizButton from './QuizButton';

export default function Quiz8Adult({ bookFilters, setBookFilters }) {
  function HandleClick(name, checked) {
    if (checked) {
      setBookFilters((prevValue) => (
        { ...prevValue, book_type: prevValue.book_type.concat(name) }));
    } else {
      setBookFilters((prevValue) => {
        const index = prevValue.book_type.indexOf(name);
        prevValue.book_type.splice(index, 1);
        return { ...prevValue, book_type: prevValue.book_type };
      });
    }
  }
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          Please select your preferred book formats
        </h1>
        <h3>These will be used to rank your results but availability is not guaranteed!</h3>
        {bookFilters.book_type !== undefined
        && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          <QuizButton desiredArray={bookFilters.book_type} desiredLabel="Picture Book" buttonCaption="Picture Book" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.book_type} desiredLabel="Chapter Book" buttonCaption="Chapter Book" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.book_type} desiredLabel="Middle Grade Book" buttonCaption="Early Reader Book" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.book_type} desiredLabel="Picture Book" buttonCaption="Middle Grade" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.book_type} desiredLabel="YA Book" buttonCaption="YA Book" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.book_type} desiredLabel="Series" buttonCaption="Series" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.book_type} desiredLabel="Anthology" buttonCaption="Anthology" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.book_type} desiredLabel="Board Book" buttonCaption="Board Book" onClick={(name, checked) => HandleClick(name, checked)} />
        </div>
        )}
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
