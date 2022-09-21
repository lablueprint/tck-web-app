import React, { useState } from 'react';
import propTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import {
  Box, Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProgressBar from './ProgressBar';
import './QuizButton.css';
import illusion from '../../Assets/Images/IllusionVector.svg';

export default function Quiz5({
  setIllusions, dispatch,
}) {
  const [disabled, setDisabled] = useState(true);
  const handleClick = (val) => {
    setDisabled(false);
    setIllusions(val);
    dispatch({ type: 'child' });
  };
  return (
    <div style={{ paddingBottom: 200, background: '#FAFAFA' }}>
      <Box sx={{ padding: 15 }}>
        <h1 style={{ fontFamily: 'DM Sans', marginTop: '20px', color: '#444444' }}>
          What do you see in the picture below?
        </h1>
        <div><img src={illusion} alt="Illusion Missing" /></div>
        <FormControl>
          <Button
            className="QuizButton"
            style={{
              color: '#444444',
              padding: '2em 0.5em 2em 0.5em',
              margin: '1em auto 1em auto',
              width: '300px',
              height: '80.59px',
              borderRadius: '30px',
              background: '#393EBA',
              display: 'flex',
              border: '2px solid #d7d7d7',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#393EBA',
                color: 'white',
              },
            }}
            onClick={() => {
              handleClick(2);
            }}
          >
            <p style={{
              fontFamily: 'DM Sans', color: '#FFFFFF', fontWeight: 'bold', fontSize: '24px', textAlign: 'center', margin: '0 auto 0 auto',
            }}
            >
              A younger person
            </p>
          </Button>
          <Button
            className="QuizButton"
            style={{
              color: '#444444',
              padding: '2em 0.5em 2em 0.5em',
              margin: '1em auto 1em auto',
              width: '300px',
              height: '80.59px',
              borderRadius: '30px',
              background: '#393EBA',
              display: 'flex',
              border: '2px solid #d7d7d7',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#393EBA',
                color: 'white',
              },
            }}
            onClick={() => {
              handleClick(2);
            }}
          >
            <p style={{
              fontFamily: 'DM Sans', color: '#FFFFFF', fontWeight: 'bold', fontSize: '24px', textAlign: 'center', margin: '0 auto 0 auto',
            }}
            >
              An older person
            </p>
          </Button>
        </FormControl>
      </Box>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: 'child back' })}
          sx={{
            background: '#f79927',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            boxShadow: 'none',
            '&.MuiButtonBase-root:hover': {
              bgcolor: '#F99E16',
            },
          }}
        >
          <ArrowBackIcon />

        </Button>
        <ProgressBar variant="determinate" progress={65} sx={{ flex: '0 1 60%' }} />
        <Button
          disabled={disabled}
          variant="contained"
          onClick={() => dispatch({ type: 'child' })}
          sx={{
            background: '#f79927',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            boxShadow: 'none',
            '&.MuiButtonBase-root:hover': {
              bgcolor: '#F99E16',
            },
          }}
        >
          <ArrowForwardIcon />

        </Button>
      </div>
    </div>
  );
}
Quiz5.defaultProps = {
  setIllusions: null,
};
Quiz5.propTypes = {
  setIllusions: propTypes.func,
  dispatch: propTypes.func.isRequired,
};
