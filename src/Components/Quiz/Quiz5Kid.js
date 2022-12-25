import React from 'react';
import propTypes from 'prop-types';
import {
  Button, Box,
} from '@mui/material';
import ProgressBar from './ProgressBar2';
import illusion from '../../Assets/Images/IllusionVector.svg';

const styles = {
  button: {
    border: '2.5px solid #D7D7D7',
    borderRadius: '21px',
    background: '#ffffff',
    fontFamily: 'DM Sans',
    fontWeight: 'bold',
    color: '#444444',
    textTransform: 'none',
    fontSize: '1.2rem',
    textAlign: 'center',

    padding: '2em 0.5em 2em 0.5em',
    width: '300px',
    height: '80.59px',

    '&.MuiButtonBase-root:hover': {
      bgcolor: '#EAF3FE',
      color: '#393EBA',
      borderColor: '#393EBA',
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '2rem',
    rowGap: '1rem',
    marginTop: '2rem',

    '@media (max-width: 750px)': {
      flexDirection: 'column',
      marginTop: '1rem',
    },
  },
};
export default function Quiz5Kid({
  setIllusions, dispatch,
}) {
  const handleClick = (val) => {
    setIllusions(val);
    dispatch({ type: 'child' });
  };

  const handleBack = () => dispatch({ type: 'child back' });

  const handleForward = () => dispatch({ type: 'child' });

  return (
    <div className="quiz-container">
      <h1 className="quiz-header">
        What do you see in the picture below?
      </h1>
      <img style={{ height: '275px', marginTop: '-3vh' }} src={illusion} alt="Illusion Missing" />
      <Box sx={styles.buttonContainer}>
        <Button
          sx={styles.button}
          onClick={() => {
            handleClick(1);
          }}
        >
          <p> A younger person</p>
        </Button>
        <Button
          sx={styles.button}
          onClick={() => {
            handleClick(2);
          }}
        >
          <p>An older person</p>
        </Button>
      </Box>
      <ProgressBar progress={80} onForward={handleForward} onBack={handleBack} />
    </div>
  );
}
Quiz5Kid.defaultProps = {
  setIllusions: null,
};
Quiz5Kid.propTypes = {
  setIllusions: propTypes.func,
  dispatch: propTypes.func.isRequired,
};
