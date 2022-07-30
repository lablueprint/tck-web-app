import React from 'react';
import propTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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
  setIllusions, dispatch, isIllusionDisabled,
}) {
  const handleClick = (val) => {
    setIllusions(val);
  };
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1 style={{ color: '#444444' }}>
          What do you see in the picture below?
        </h1>
        <div><img src={illusion} alt="Illusion Missing" /></div>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{
              display: 'flex', flexDirection: 'row', columnGap: '4em', marginTop: '3em',
            }}
          >
            <Button
              className="QuizButton"
              style={{
                color: '#444444',
                padding: '2em 0.5em 2em 0.5em',
                margin: '1em auto 1em auto',
                width: '300px',
                height: '80.59px',
                borderRadius: '30px',
                background: '#ffffff',
                display: 'flex',
                border: '2px solid #d7d7d7',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#393EBA',
                  color: 'white',
                },
              }}
            >
              <FormControlLabel
                control={(
                  <Radio
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                  {
                    color: 'white',
                  },
                      '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                        color: '#393EBA',
                      },
                    }}
                    value={1}
                    onChange={(e) => handleClick(e.target.value)}
                  />
)}
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
                }}
                label={(
                  <p style={{
                    fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  }}
                  >
                    A younger person
                  </p>
                )}
              />
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
                background: '#ffffff',
                display: 'flex',
                border: '2px solid #d7d7d7',
                textTransform: 'none',
              }}
            >
              <FormControlLabel
                control={(
                  <Radio
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                  {
                    color: 'white',
                  },
                      '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                        color: '#393EBA',
                      },
                    }}
                    value={2}
                    onChange={(e) => handleClick(e.target.value)}
                  />
)}
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
                }}
                label={(
                  <p style={{
                    fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  }}
                  >
                    An older person
                  </p>
                )}
              />
            </Button>
          </RadioGroup>
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
          disabled={isIllusionDisabled()}
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
  isIllusionDisabled: propTypes.func.isRequired,
};
