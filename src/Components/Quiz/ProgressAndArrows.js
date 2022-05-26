import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

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

export default function ProgressAndArrows({ progress }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center',
      }}
    >
      <BorderLinearProgress sx={{ marginRight: 4, marginLeft: 4 }} variant="determinate" value={progress} />
    </div>
  );
}

ProgressAndArrows.propTypes = {
  progress: PropTypes.number.isRequired,
};
