import React from 'react';
import {
  Box, Button,
} from '@mui/material';
import propTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import QuizButton from './QuizButton';
import { useWindowSize } from '../Navigation/Header';

export default function Quiz6Kid({
  title, buttonCaptions, setBookFilters, bookFilters, dispatch, includeButtons,
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
    <div>
      <Box sx={{ position: 'relative', bottom: '100o' }}>
        <h1 style={{ fontFamily: 'DM Sans', marginTop: '150px', color: '#444444' }}>
          {title}
        </h1>
        <p style={{ color: '#444444' }}>You can choose more than one.</p>
        {bookFilters.genre !== undefined
        && (
        <div style={{ display: 'grid', gridTemplateColumns: size.width > 1024 ? 'repeat(3, minmax(0, 1fr))' : 'repeat(1, minmax(0, 1fr))' }}>
          <QuizButton buttonCaption={buttonCaptions[0]} desiredLabel="Autobiography" desiredArray={bookFilters.genre} onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton buttonCaption={buttonCaptions[1]} desiredLabel="Non-fiction" desiredArray={bookFilters.genre} onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton buttonCaption={buttonCaptions[2]} desiredLabel="Historical fiction" desiredArray={bookFilters.genre} onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton buttonCaption={buttonCaptions[3]} desiredLabel="Memoir" desiredArray={bookFilters.genre} onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton buttonCaption={buttonCaptions[4]} desiredLabel="Mystery" desiredArray={bookFilters.genre} onClick={(name, checked) => HandleClick(name, checked)} />
          <QuizButton buttonCaption={buttonCaptions[5]} desiredLabel="Poetry" desiredArray={bookFilters.genre} onClick={(name, checked) => HandleClick(name, checked)} />
        </div>
        )}
      </Box>
      {includeButtons ? (
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
          <Button
            disabled={false}
            variant="contained"
            onClick={() => dispatch({ type: 'child' })}
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
          <NavLink to="/quiz/results" style={{ textDecoration: 'none' }}>
            <Button
              disabled={false}
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
      )}
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
  dispatch: propTypes.func.isRequired,
  includeButtons: propTypes.bool.isRequired,
};
