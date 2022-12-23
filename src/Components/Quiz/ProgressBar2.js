import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import './QuizGroup.css';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
  '@media (max-width: 750px)': {
    width: '60vw',
  },
}));

const styles = {
  progressBar: {
    marginRight: 4,
    marginLeft: 4,
  },
  progressButton: {
    background: '#f79927',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    boxShadow: 'none',
    '&.MuiButtonBase-root:hover': {
      bgcolor: '#F99E16',
    },
  },
};

export default function ProgressBar({
  progress, onBack, onForward, forwardDisabled,
}) {
  return (
    <div className="progress-button-box">
      <Button
        variant="contained"
        onClick={onBack}
        sx={styles.progressButton}
      >
        <ArrowBackIcon />
      </Button>
      <div className="progress-bar-box">
        <BorderLinearProgress sx={styles.progressBar} variant="determinate" value={progress} />
      </div>
      <Button
        disabled={forwardDisabled}
        variant="contained"
        onClick={onForward}
        sx={styles.progressButton}
      >
        <ArrowForwardIcon />
      </Button>
    </div>

  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  forwardDisabled: PropTypes.bool.isRequired,
};
