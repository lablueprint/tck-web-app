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
import ProgressAndArrows from './ProgressAndArrows';
import illusion from '../../Assets/Images/illusion.png';
import './QuizGroup.css';

export default function Quiz5({
  setIllusions, dispatch, isIllusionDisabled,
}) {
  const handleClick = (val) => {
    setIllusions(val);
  };
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
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
            <FormControlLabel
              control={<Radio value={1} onChange={(e) => handleClick(e.target.value)} />}
              className="woman-question"
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
            <FormControlLabel
              control={<Radio value={2} onChange={(e) => handleClick(e.target.value)} />}
              className="woman-question"
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
        <ProgressAndArrows variant="determinate" progress={65} sx={{ flex: '0 1 60%' }} />
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
