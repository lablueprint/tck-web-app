import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import './QuizGroup.css';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink } from 'react-router-dom';

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
    width: '50vw',
  },
}));

const styles = {
  progressBar: {
    marginRight: 2.5,
    marginLeft: 2.5,
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
  resultsButton: {
    background: '#F99E16',
    boxShadow: 'none',
    borderRadius: '100px',
    '&.MuiButtonBase-root:hover': {
      bgcolor: '#F99E16',
    },
  },
  resultsButtonText: {
    fontFamily: 'DM Sans',
    fontWeight: 'bold',
    fontSize: '17px',
    textAlign: 'center',
    margin: '0 auto 0 auto',
    textTransform: 'none',
    width: '120px',
  },
};

export default function ProgressBar({
  progress, onBack, onForward, forwardDisabled, lastStep,
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
      <BorderLinearProgress sx={styles.progressBar} variant="determinate" value={progress} />
      {lastStep
        ? (
          <NavLink to="/quiz/results" style={{ textDecoration: 'none' }}>
            <Button
              disabled={false}
              variant="contained"
              onClick={onForward}
              sx={styles.resultsButton}
              endIcon={<ArrowForwardIcon />}
            >
              <p style={styles.resultsButtonText}>
                Your Results
              </p>
            </Button>
          </NavLink>
        )
        : (
          <Button
            disabled={forwardDisabled}
            variant="contained"
            onClick={onForward}
            sx={styles.progressButton}
          >
            <ArrowForwardIcon fontSize="small" />
          </Button>
        )}

    </div>

  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  forwardDisabled: PropTypes.bool,
  lastStep: PropTypes.bool,
};

ProgressBar.defaultProps = {
  forwardDisabled: false,
  lastStep: false,
};
