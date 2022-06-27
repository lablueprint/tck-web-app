import React from 'react';
import {
  Box,
} from '@mui/material';
import propTypes from 'prop-types';
import QuizButton from './QuizButton';

export default function Quiz6({
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
        <p>You can choose more than one.</p>

        {bookFilters.genre !== undefined && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            <QuizButton
              desiredLabel={buttonCaptions[0]}
              buttonCaption={buttonCaptions[0]}
              desiredArray={bookFilters.genre}
              onClick={(name, checked) => HandleClick(name, checked)}
            />
            <QuizButton
              desiredLabel={buttonCaptions[1]}
              buttonCaption={buttonCaptions[1]}
              desiredArray={bookFilters.genre}
              onClick={(name, checked) => HandleClick(name, checked)}
            />
            <QuizButton
              desiredLabel={buttonCaptions[2]}
              buttonCaption={buttonCaptions[2]}
              desiredArray={bookFilters.genre}
              onClick={(name, checked) => HandleClick(name, checked)}
            />
            <QuizButton
              desiredLabel={buttonCaptions[3]}
              buttonCaption={buttonCaptions[3]}
              desiredArray={bookFilters.genre}
              onClick={(name, checked) => HandleClick(name, checked)}
            />
            <QuizButton
              desiredLabel={buttonCaptions[4]}
              buttonCaption={buttonCaptions[4]}
              desiredArray={bookFilters.genre}
              onClick={(name, checked) => HandleClick(name, checked)}
            />
          </div>
        )}
      </Box>
    </div>
  );
}
Quiz6.propTypes = {
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
