import React from 'react';
import propTypes from 'prop-types';
import {
  Grid,
} from '@mui/material';
import GradeSlider from './GradeSlider';

export default function Quiz2Adult({ parentCallback02A, bookFilters, setBookFilters }) {
  const callback = (min, max) => {
    setBookFilters({ ...bookFilters, minGrade: min, maxGrade: max });
  };

  const callbackSlider = (isDisabled) => {
    parentCallback02A(isDisabled);
  };

  return (
    <div style={{ paddingBottom: 200 }}>
      <h1>
        What grade levels are you looking for?
      </h1>
      <Grid container justifyContent="center" sx={{ paddingTop: 10 }}>
        <GradeSlider parentCallbackButton={callbackSlider} parentCallback={callback} />
      </Grid>
    </div>
  );
}
Quiz2Adult.propTypes = {
  parentCallback02A: propTypes.isRequired,
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
