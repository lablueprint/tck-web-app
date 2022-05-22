import React, { useState } from 'react';
import propTypes from 'prop-types';
import {
  Card, Grid,
} from '@mui/material';
import GradeSlider from './GradeSlider';
import ProgressAndArrows from './ProgressAndArrows';

export default function Quiz2Kid({ parentCallback02K, bookFilters, setBookFilters }) {
  const [minData, setMinData] = useState();
  const [maxData, setMaxData] = useState();
  const [isDisabled02K, setisDisabled02K] = useState();

  const callback = (min, max) => {
    setMinData(min);
    setMaxData(max);
    setBookFilters({ ...bookFilters, minGrade: minData });
    setBookFilters({ ...bookFilters, maxGrade: maxData });
  };

  const callbackSlider = (isDisabled) => {
    setisDisabled02K(isDisabled);
    parentCallback02K(isDisabled02K);
  };

  const disabledStat = true;

  return (
    <Card sx={{
      borderRadius: 5,
      margin: 4,
      boxShadow: 5,
      marginRight: 15,
      marginLeft: 15,
      paddingBottom: 5,
      paddingTop: 15,
    }}
    >
      <div style={{ paddingBottom: 200 }}>
        <h1>
          What grade levels are you comfortable reading at?
        </h1>
        <Grid container justifyContent="center" sx={{ paddingTop: 10 }}>
          <GradeSlider parentCallbackButton={callbackSlider} parentCallback={callback} />
        </Grid>
      </div>
      <ProgressAndArrows
        progress={17}
        disabledStat={disabledStat}
      />
    </Card>
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
};
