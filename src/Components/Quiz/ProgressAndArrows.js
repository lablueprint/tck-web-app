/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  width: 850,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#F7992740',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#F79927',
  },
}));

export default function ProgressAndArrows({ progress, disabledStat }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center',
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        variant="contained"
        onClick={() => {
          console.log('clicked');
        }}
      />
      <BorderLinearProgress sx={{ marginRight: 4, marginLeft: 4 }} variant="determinate" value={progress} />
      <Button
        startIcon={<ArrowForwardIcon />}
        variant="contained"
        onClick={() => {
          console.log('clicked');
        }}
        disabled={disabledStat}
      />
    </div>
  );
}

ProgressAndArrows.propTypes = {
  progress: PropTypes.number.isRequired,
  disabledStat: PropTypes.isRequired,
};
