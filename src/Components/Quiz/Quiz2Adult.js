/* eslint-disable max-len */
import React, { useState } from 'react';
import propTypes from 'prop-types';
import {
  Card, Grid,
} from '@mui/material';
import GradeSlider from './GradeSlider';
import ProgressAndArrows from './ProgressAndArrows';

// eslint-disable-next-line no-unused-vars
export default function Quiz2Adult({ bookFilters, setBookFilters }) {
  const [minData, setMinData] = useState(4);
  const [maxData, setMaxData] = useState(7);

  const callback = (min, max) => {
    setMinData(min);
    setMaxData(max);
    setBookFilters({ ...bookFilters, minGrade: minData });
    setBookFilters({ ...bookFilters, maxGrade: maxData });
  };

  return (
    <Card sx={{
      borderRadius: 5, margin: 4, boxShadow: 5, marginRight: 15, marginLeft: 15, paddingBottom: 5, paddingTop: 15,
    }}
    >
      <div style={{ paddingBottom: 200 }}>
        <h1>
          What grade levels are you looking for?
        </h1>
        <Grid container justifyContent="center" sx={{ paddingTop: 10 }}>
          <GradeSlider parentCallback={callback} />
        </Grid>
      </div>
      <ProgressAndArrows
        progress={17}
      />
    </Card>
  );
}
Quiz2Adult.propTypes = {
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
