/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Card, Grid,
} from '@mui/material';
import GradeSlider from './GradeSlider';
import ProgressAndArrows from './ProgressAndArrows';

export default function Quiz2Kid() {
  // eslint-disable-next-line no-unused-vars
  const [disabledStat, setDisabledStat] = useState(true);

  return (
    <Card sx={{
      borderRadius: 5, margin: 4, boxShadow: 5, marginRight: 15, marginLeft: 15, paddingBottom: 5, paddingTop: 15,
    }}
    >
      <div style={{ paddingBottom: 200 }}>
        <h1>
          What grade levels are you comfortable reading at?
        </h1>
        <Grid container justifyContent="center" sx={{ paddingTop: 10 }}>
          <GradeSlider />
        </Grid>
      </div>
      <ProgressAndArrows
        progress={17}
        disabledStat={disabledStat}
      />
    </Card>
  );
}
