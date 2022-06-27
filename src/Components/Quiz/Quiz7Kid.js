import React from 'react';
import propTypes from 'prop-types';
import {
  Box,
} from '@mui/material';
import QuizButton from './QuizButton';

export default function Quiz7Kid({ setBookFilters, bookFilters }) {
  function HandleClick(name, checked) {
    if (checked) {
      setBookFilters((prevValue) => ({ ...prevValue, genre: prevValue.genre.concat(name) }));
    } else {
      setBookFilters((prevValue) => {
        const index = prevValue.genre.indexOf(name);
        prevValue.genre.splice(index, 1);
        return { ...prevValue, genre: prevValue.genre };
      });
    }
  }
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          Which of the following seem fun to you?
        </h1>
        <p>You can choose more than one.</p>
        {bookFilters.genre !== undefined
        && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          <QuizButton desiredArray={bookFilters.genre} desiredLabel="Adventure" buttonCaption="Going on a journey to a new place with your friends" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.genre} desiredLabel="Scary/Horror" buttonCaption="Suspenseful events iwth plot twists that may shock you" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.genre} desiredLabel="Sci-fi" buttonCaption="Going to outer space and exploring different planets" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.genre} desiredLabel="Fantasy" buttonCaption="Living in a magical world where you have powers" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.genre} desiredLabel="Romance" buttonCaption="Having a picnic with someone you really like" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.genre} desiredLabel="Afro-futurism" buttonCaption="Visiting an African realm with magic and advanced technology" onClick={(name, checked) => HandleClick(name, checked)} />
        </div>
        )}
      </Box>
    </div>
  );
}
Quiz7Kid.propTypes = {
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
