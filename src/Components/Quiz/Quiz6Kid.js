import React from 'react';
import {
  Box,
} from '@mui/material';
import propTypes from 'prop-types';
import QuizButton from './QuizButton';

export default function Quiz6Kid({
  title, buttonCaptions, setBookFilters, bookFilters,
}) {
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
          {title}
        </h1>
        <h3>You can choose more than one.</h3>
        {bookFilters.genre !== undefined
        && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          <QuizButton buttonCaption={buttonCaptions[0]} desiredLabel="Autobiography" desiredArray={bookFilters.genre} onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton buttonCaption={buttonCaptions[1]} desiredLabel="Non-fiction" desiredArray={bookFilters.genre} onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton buttonCaption={buttonCaptions[2]} desiredLabel="Historical fiction" desiredArray={bookFilters.genre} onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton buttonCaption={buttonCaptions[3]} desiredLabel="Memoir" desiredArray={bookFilters.genre} onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton buttonCaption={buttonCaptions[4]} desiredLabel="Mystery" desiredArray={bookFilters.genre} onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton buttonCaption={buttonCaptions[5]} desiredLabel="Poetry" desiredArray={bookFilters.genre} onClick={(name, checked) => HandleClick(name, checked)} />
        </div>
        )}
      </Box>
    </div>
  );
}
Quiz6Kid.propTypes = {
  title: propTypes.string.isRequired,
  buttonCaptions: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
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
