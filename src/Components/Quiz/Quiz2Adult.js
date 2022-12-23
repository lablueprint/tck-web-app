import React from 'react';
import propTypes from 'prop-types';
import {
  Grid, Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProgressBar from './ProgressBar';
import GradeSlider from './GradeSlider';

export default function Quiz2Adult({
  parentCallback02A,
  bookFilters, setBookFilters, dispatch,
}) {
  const callback = (min, max) => {
    setBookFilters({ ...bookFilters, minGrade: min, maxGrade: max });
  };

  const callbackSlider = (isDisabled) => {
    parentCallback02A(isDisabled);
  };

  return (
    <div style={{ paddingBottom: 200, background: '#FAFAFA' }}>
      <h1 style={{ fontFamily: 'DM Sans' /* marginTop: '20px', */, color: '#444444' }}>
        What grade levels are you looking for?
      </h1>
      <Grid container justifyContent="center" sx={{ paddingTop: 15 }}>
        <GradeSlider parentCallbackButton={callbackSlider} parentCallback={callback} />
      </Grid>
      <div style={{
        marginTop: '250px',
        display: 'flex',
        justifyContent: 'center',
        padding: '3em 0 3em 0',
      }}
      >
        <Button
          disabled={false}
          variant="contained"
          onClick={() => dispatch({ type: 'parent back' })}
          sx={{
            background: '#f79927',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            '&.MuiButtonBase-root:hover': {
              bgcolor: '#F99E16',
            },
          }}
        >
          <ArrowBackIcon />
        </Button>
        <ProgressBar
          progress={17}
          sx={{ flex: '0 1 60%' }}
        />
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
Quiz2Adult.propTypes = {
  parentCallback02A: propTypes.func.isRequired,
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
