import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import './QuizGroup.css';

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  width: '70vw',
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#F7992740',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#F79927',
  },
  '@media (max-width: 1024px)': {
    width: '60vw',
  },
}));

const styles = {
  progressBar: {
    marginRight: 4,
    marginLeft: 4,
  },
};

export default function ProgressBar({ progress }) {
  return (
    <div className="progress-bar-box">
      <BorderLinearProgress sx={styles.progressBar} variant="determinate" value={progress} />
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};
