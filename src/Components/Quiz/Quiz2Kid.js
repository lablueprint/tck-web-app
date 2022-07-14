import React from 'react';
import propTypes from 'prop-types';
import { Grid, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProgressAndArrows from './ProgressAndArrows';
import GradeSlider from './GradeSlider';

export default function Quiz2Kid({
  isDisabled02K, dispatch,
  parentCallback02K, bookFilters, setBookFilters,
}) {
  const callback = (min, max) => {
    setBookFilters({ ...bookFilters, minGrade: min, maxGrade: max });
  };

  const callbackSlider = (isDisabled) => {
    parentCallback02K(isDisabled);
  };

  return (
    <div style={{ paddingBottom: 200 }}>
      <h1>
        What grade levels are you comfortable reading at?
      </h1>
      <Grid container justifyContent="center" sx={{ paddingTop: 10 }}>
        <GradeSlider parentCallbackButton={callbackSlider} parentCallback={callback} />
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
        <Button
          disabled={isDisabled02K}
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
        <ProgressAndArrows
          progress={17}
          sx={{ flex: '0 1 60%' }}
        />
        <Button
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
    </div>
  );
}
Quiz2Kid.defaultProps = {
  setBookFilters: null,
  bookFilters: propTypes.shape({
    bookId: '',
    'race/ethnicity': [],
    minAge: 0,
    maxAge: 18,
    minGrade: -1,
    maxGrade: 12,
    genre: [],
    book_type: [],
  }),
};
Quiz2Kid.propTypes = {
  parentCallback02K: propTypes.isRequired,
  setBookFilters: propTypes.func,
  bookFilters: propTypes.shape({
    bookId: propTypes.string.isRequired,
    'race/ethnicity': propTypes.arrayOf(propTypes.string).isRequired,
    minAge: propTypes.number.isRequired,
    maxAge: propTypes.number.isRequired,
    minGrade: propTypes.number.isRequired,
    maxGrade: propTypes.number.isRequired,
    genre: propTypes.arrayOf(propTypes.string).isRequired,
    book_type: propTypes.arrayOf(propTypes.string).isRequired,
  }),
  dispatch: propTypes.func.isRequired,
  isDisabled02K: propTypes.bool.isRequired,
};
