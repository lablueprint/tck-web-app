/* eslint-disable max-len */
import React from 'react';
import {
  Card, Grid,
} from '@mui/material';
import GradeSlider from './GradeSlider';

export default function QuizKidGradeSelect() {
  return (
    <Card sx={{
      borderRadius: 5, margin: 4, boxShadow: 5, marginRight: 15, marginLeft: 15, paddingBottom: 30, paddingTop: 10,
    }}
    >
      <div>
        <h1>
          What grade levels are you comfortable reading at?
        </h1>
        <Grid container justifyContent="center" sx={{ paddingTop: 10 }}>
          <GradeSlider />
        </Grid>
      </div>
    </Card>
  );
}
