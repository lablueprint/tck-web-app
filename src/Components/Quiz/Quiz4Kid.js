import React from 'react';
import {
  Box, Button,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import propTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProgressAndArrows from './ProgressAndArrows';
import VerySerious from '../../Assets/Images/TCK_Mood - Very Serious.svg';
import Serious from '../../Assets/Images/TCK_Mood - Serious.svg';
import Neutral from '../../Assets/Images/TCK_Mood - Neutral.svg';
import Silly from '../../Assets/Images/TCK_Mood - Silly.svg';
import VerySilly from '../../Assets/Images/TCK_Mood - Very Silly.svg';
import './QuizGroup.css';

export default function Quiz4Kid({ setSilly, dispatch, sillyNotSet }) {
  const handleClick = (val) => {
    setSilly(val);
  };

  return (
    <div style={{ background: '#FCFCFC' }}>
      <Box sx={{ padding: 15 }}>
        <h1>
          Which of the following best describes you?
        </h1>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{ display: 'flex', flexDirection: 'row' }}
          >
            <div className="silly-button">
              <img src={VerySilly} height="90" width="90" alt="Very Silly Missing" />
              <FormControlLabel
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
                }}
                control={<Radio value={1} onChange={(e) => handleClick(e.target.value)} />}
                label={(
                  <p style={{
                    fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  }}
                  >
                    I am almost always silly
                  </p>
                )}
              />
            </div>
            <div className="silly-button">
              <img src={Silly} height="90" width="90" alt="Silly Missing" />
              <FormControlLabel
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
                }}
                control={<Radio value={2} onChange={(e) => handleClick(e.target.value)} />}
                label={(
                  <p style={{
                    fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  }}
                  >
                    I am usually silly, but I can be serious if I need to be
                  </p>
                )}
              />

            </div>
            <div className="silly-button">
              <img src={Neutral} height="90" width="90" alt="Neutral Missing" />
              <FormControlLabel
                control={<Radio value={3} onChange={(e) => handleClick(e.target.value)} />}
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
                }}
                label={(
                  <p style={{
                    fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  }}
                  >
                    I can be either silly or serious
                  </p>
                )}
              />
            </div>
            <div className="silly-button">
              <img src={Serious} height="90" width="90" alt="Serious Missing" />
              <FormControlLabel
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
                }}
                control={<Radio value={4} onChange={(e) => handleClick(e.target.value)} />}
                label={(
                  <p style={{
                    fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  }}
                  >
                    I am usually serious, but I can be silly sometimes
                  </p>
                )}
              />
            </div>
            <div className="silly-button">
              <img src={VerySerious} height="90" width="90" alt="Very Serious Missing" />
              <FormControlLabel
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
                }}
                control={<Radio value={5} onChange={(e) => handleClick(e.target.value)} />}
                label={(
                  <p style={{
                    fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  }}
                  >
                    I am almost always serious
                  </p>
                )}
              />
            </div>
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
        <ProgressAndArrows variant="determinate" progress={41} sx={{ flex: '0 1 60%' }} />
        <Button
          disabled={sillyNotSet()}
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
Quiz4Kid.propTypes = {
  setSilly: propTypes.func.isRequired,
  dispatch: propTypes.func.isRequired,
  sillyNotSet: propTypes.func.isRequired,
};
