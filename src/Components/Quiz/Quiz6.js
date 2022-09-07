import React from 'react';
import {
  Box, Button,
} from '@mui/material';
import propTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProgressBar from './ProgressBar';
import QuizButton from './QuizButton';
import { useWindowSize } from '../Navigation/Header';

export default function Quiz6({
  title, buttonCaptions, setBookFilters, bookFilters, dispatch,
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
      <Box sx={{ padding: 15 }}>
        <h1 style={{ fontFamily: 'DM Sans', marginTop: '20px', color: '#444444' }}>
          {title}
        </h1>
        <p style={{ color: '#444444' }}>You can choose more than one.</p>

        {bookFilters.genre !== undefined && (
          <div style={{ display: 'grid', gridTemplateColumns: size.width > 1024 ? 'repeat(3, minmax(0, 1fr))' : 'repeat(1, minmax(0, 1fr))' }}>
            {buttonCaptions.map((option) => (
              <QuizButton
                desiredLabel={option}
                buttonCaption={option}
                desiredArray={bookFilters.genre}
                key={option}
                onClick={(name, checked) => HandleClick(name, checked)}
              />
            ))}
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
        <ProgressBar variant="determinate" progress={80} sx={{ flex: '0 1 60%' }} />
        <Button
          disabled={false}
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
  dispatch: propTypes.func.isRequired,
};
