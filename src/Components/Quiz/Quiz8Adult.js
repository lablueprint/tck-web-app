import React from 'react';
import propTypes from 'prop-types';
import {
  Box, Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import QuizButton from './QuizButton';

export default function Quiz8Adult({
  bookFilters, setBookFilters, dispatch, issDisabled,
}) {
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
        <h1 style={{ fontFamily: 'DM Sans', marginTop: '150px', color: '#444444' }}>
          Please select your preferred book formats
        </h1>
        <p style={{ color: '#444444' }}>These will be used to rank your results but availability is not guaranteed!</p>
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
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: 'parent back' })}
          sx={{
            background: '#f79927',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            boxShadow: 'none',
            '&.MuiButtonBase-root:hover': {
              bgcolor: '#F99E16',
            },
          }}
        >
          <ArrowBackIcon />

        </Button>
        <ProgressBar variant="determinate" value={85} sx={{ flex: '0 1 60%' }} />
        <NavLink to="/quiz/results" style={{ textDecoration: 'none' }}>
          <Button
            disabled={issDisabled}
            variant="contained"
            onClick={() => dispatch({ type: 'parent' })}
            sx={{
              background: '#F99E16',
              boxShadow: 'none',
              borderRadius: '100px',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
            endIcon={<ArrowForwardIcon />}
          >
            <p style={{
              fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto', textTransform: 'none',
            }}
            >
              Your Results
            </p>
            {' '}

          </Button>
        </NavLink>
      </div>
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
  dispatch: propTypes.func.isRequired,
  issDisabled: propTypes.bool.isRequired,
};
