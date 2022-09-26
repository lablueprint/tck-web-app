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
import { useWindowSize } from '../Navigation/Header';

export default function Quiz7Kid({
  setBookFilters, bookFilters,
  includeNav, dispatch, issDisabled,
}) {
  const size = useWindowSize();
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
    <div style={{ paddingBottom: 200, background: '#FAFAFA' }}>
      <Box sx={{ position: 'relative', bottom: '100px' }}>
        <h1 style={{ fontFamily: 'DM Sans', marginTop: '20px', color: '#444444' }}>
          Which of the following seem fun to you?
        </h1>
        <p style={{ color: '#444444' }}>You can choose more than one.</p>
        {bookFilters.genre !== undefined && size.width <= 640
        && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' }}>
          <QuizButton desiredArray={bookFilters.genre} desiredLabel="Adventure" buttonCaption="Going on a journey to a new place with your friends" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.genre} desiredLabel="Scary/Horror" buttonCaption="Suspenseful events iwth plot twists that may shock you" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.genre} desiredLabel="Sci-fi" buttonCaption="Going to outer space and exploring different planets" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.genre} desiredLabel="Fantasy" buttonCaption="Living in a magical world where you have powers" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.genre} desiredLabel="Romance" buttonCaption="Having a picnic with someone you really like" onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton desiredArray={bookFilters.genre} desiredLabel="Afro-futurism" buttonCaption="Visiting an African realm with magic and advanced technology" onClick={(name, checked) => HandleClick(name, checked)} />
        </div>
        )}
        {bookFilters.genre !== undefined
        && size.width > 640 && (
          <div style={{ display: 'grid', gridTemplateColumns: size.width < 1024 && size.width > 640 ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))' }}>
            <QuizButton desiredArray={bookFilters.genre} desiredLabel="Adventure" buttonCaption="Going on a journey to a new place with your friends" onClick={(name, checked) => HandleClick(name, checked)} />
            <QuizButton desiredArray={bookFilters.genre} desiredLabel="Scary/Horror" buttonCaption="Suspenseful events iwth plot twists that may shock you" onClick={(name, checked) => HandleClick(name, checked)} />
            <QuizButton desiredArray={bookFilters.genre} desiredLabel="Sci-fi" buttonCaption="Going to outer space and exploring different planets" onClick={(name, checked) => HandleClick(name, checked)} />
            <QuizButton desiredArray={bookFilters.genre} desiredLabel="Fantasy" buttonCaption="Living in a magical world where you have powers" onClick={(name, checked) => HandleClick(name, checked)} />
            <QuizButton desiredArray={bookFilters.genre} desiredLabel="Romance" buttonCaption="Having a picnic with someone you really like" onClick={(name, checked) => HandleClick(name, checked)} />
            <QuizButton desiredArray={bookFilters.genre} desiredLabel="Afro-futurism" buttonCaption="Visiting an African realm with magic and advanced technology" onClick={(name, checked) => HandleClick(name, checked)} />
          </div>
        )}
      </Box>
      {includeNav ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'child back' })}
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
          <ProgressBar variant="determinate" progress={85} />
          <NavLink to="/quiz/results" style={{ textDecoration: 'none' }}>
            <Button
              disabled={false}
              variant="contained"
              onClick={() => dispatch({ type: 'child' })}
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

      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'child back' })}
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
          <ProgressBar variant="determinate" progress={85} sx={{ flex: '0 1 60%' }} />
          <Button
            disabled={issDisabled}
            variant="contained"
            onClick={() => dispatch({ type: 'parent' })}
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
            <ArrowForwardIcon />
          </Button>
        </div>

      )}
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
  includeNav: propTypes.bool.isRequired,
  dispatch: propTypes.func.isRequired,
  issDisabled: propTypes.bool.isRequired,
};