import React, { useState } from 'react';
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
import ProgressBar from './ProgressBar';
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
  const [valueSelected, setValueSelected] = useState(0);

  return (
    <div style={{ background: '#FCFCFC' }}>
      <Box sx={{ padding: 15 }}>
        <h1 style={{ fontFamily: 'DM Sans', marginBottom: '20px', color: '#444444' }}>
          Which of the following best describes you?
        </h1>
        <FormControl style={{ marginTop: '50px' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{ /* display: 'flex', */ flexDirection: 'row' /* justifyContent: 'center' */ }}
            // valueSelected={valueSelected}
          >
            <Button
              className="silly-button"
              sx={valueSelected === 1 ? {
                minHeight: 392,
                minWidth: 218,
                border: '2px solid #d7d7d7',
                borderRadius: '21px',
                background: '#ffffff',
                textTransform: 'none',
                color: '#444444',
                backgroundColor: '#393EBA',
                marginRight: '30px',
              }
                : {
                  minHeight: 392,
                  minWidth: 218,
                  border: '2px solid #d7d7d7',
                  borderRadius: '21px',
                  background: '#ffffff',
                  textTransform: 'none',
                  color: '#444444',
                  backgroundcolor: '#FFFFFF',
                  marginRight: '30px',
                }}
              onClick={() => {
                setValueSelected(1);
                handleClick(1);
              }}
            >
              <img src={VerySilly} height="90" width="90" alt="Very Silly Missing" />
              <FormControlLabel
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
                }}
                control={(
                  <div>
                    <Radio
                      checked={valueSelected === 1}
                      sx={{
                        '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                        {
                          color: valueSelected === 1 ? '#393EBA' : 'white',
                        },
                        '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                          color: '#393EBA',
                        },
                      }}
                      value={1}
                      onChange={(e) => handleClick(e.target.value)}
                    />
                  </div>

                )}
                label={(
                  <p style={valueSelected === 1 ? {
                    fontFamily: 'DM Sans', color: '#FFFFFF', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  } : {
                    fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  }}
                  >
                    I am almost always silly
                  </p>
                )}
              />
            </Button>
            <Button
              sx={valueSelected === 2 ? {
                minHeight: 392,
                minWidth: 218,
                border: '2px solid #d7d7d7',
                borderRadius: '21px',
                background: '#ffffff',
                textTransform: 'none',
                color: '#444444',
                backgroundColor: '#393EBA',
                marginRight: '30px',
              }
                : {
                  minHeight: 392,
                  minWidth: 218,
                  border: '2px solid #d7d7d7',
                  borderRadius: '21px',
                  background: '#ffffff',
                  textTransform: 'none',
                  color: '#444444',
                  backgroundcolor: '#FFFFFF',
                  marginRight: '30px',
                }}
              className="silly-button"
              onClick={() => {
                setValueSelected(2);
                handleClick(2);
              }}
            >
              <img src={Silly} height="90" width="90" alt="Silly Missing" />
              <FormControlLabel
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
                }}
                control={(
                  <Radio
                    checked={valueSelected === 2}
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                    {
                      color: sillyColor ? '#393EBA' : 'white',
                    },
                      '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                        color: '#393EBA',
                      },
                    }}
                    value={2}
                    onChange={(e) => handleClick(e.target.value)}
                  />
)}
                label={(
                  <p style={sillyColor ? {
                    fontFamily: 'DM Sans', color: '#FFFFFF', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  } : {
                    fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  }}
                  >
                    I am usually silly, but I can be serious if I need to be
                  </p>
                )}
              />

            </Button>
            <Button
              sx={neutralColor ? {
                minHeight: 392,
                minWidth: 218,
                border: '2px solid #d7d7d7',
                borderRadius: '21px',
                background: '#ffffff',
                textTransform: 'none',
                color: '#444444',
                backgroundColor: '#393EBA',
                marginLeft: '30px',

              }
                : {
                  minHeight: 392,
                  minWidth: 218,
                  border: '2px solid #d7d7d7',
                  borderRadius: '21px',
                  background: '#ffffff',
                  textTransform: 'none',
                  color: '#444444',
                  backgroundcolor: '#FFFFFF',
                }}
              className="silly-button"
              onClick={() => {
                setVerySillyColor(false);
                setSillyColor(false);
                setSeriousColor(false);
                setVerySeriousColor(false);
                setNeutralColor(!neutralColor);
                setValueSelected(3);
                handleClick(3);
              }}
            >
              <img src={Neutral} height="90" width="90" alt="Neutral Missing" />
              <FormControlLabel
                control={(
                  <Radio
                    checked={valueSelected === 3}
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                    {
                      color: 'white',
                    },
                      '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                        color: neutralColor ? '#393EBA' : 'white',
                      },
                    }}
                    value={3}
                    onChange={(e) => handleClick(e.target.value)}
                  />
)}
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
                }}
                label={(
                  <p style={neutralColor ? {
                    fontFamily: 'DM Sans', color: '#FFFFFF', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  } : {
                    fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  }}
                  >
                    I can be either silly or serious
                  </p>
                )}
              />
            </Button>
            <Button
              sx={seriousColor ? {
                minHeight: 392,
                minWidth: 218,
                border: '2px solid #d7d7d7',
                borderRadius: '21px',
                background: '#ffffff',
                textTransform: 'none',
                color: '#444444',
                backgroundColor: '#393EBA',
                marginLeft: '30px',
              }
                : {
                  minHeight: 392,
                  minWidth: 218,
                  border: '2px solid #d7d7d7',
                  borderRadius: '21px',
                  background: '#ffffff',
                  textTransform: 'none',
                  color: '#444444',
                  backgroundcolor: '#FFFFFF',
                  marginLeft: '30px',
                }}
              className="silly-button"
              onClick={() => {
                setVerySillyColor(false);
                setSillyColor(false);
                setNeutralColor(false);
                setVerySeriousColor(false);
                setSeriousColor(!seriousColor);
                setValueSelected(4);
                handleClick(4);
              }}
            >
              <img src={Serious} height="90" width="90" alt="Serious Missing" />
              <FormControlLabel
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
                }}
                control={(
                  <Radio
                    checked={valueSelected === 4}
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                    {
                      color: seriousColor ? '#393EBA' : 'white',
                    },
                      '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                        color: '#393EBA',
                      },
                    }}
                    value={4}
                    onChange={(e) => handleClick(e.target.value)}
                  />
)}
                label={(
                  <p style={seriousColor ? {
                    fontFamily: 'DM Sans', color: '#FFFFFF', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  } : {
                    fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  }}
                  >
                    I am usually serious, but I can be silly sometimes
                  </p>
                )}
              />
            </Button>
            <Button
              sx={verySeriousColor ? {
                minHeight: 392,
                minWidth: 218,
                border: '2px solid #d7d7d7',
                borderRadius: '21px',
                background: '#ffffff',
                textTransform: 'none',
                color: '#444444',
                backgroundColor: '#393EBA',
                marginLeft: '30px',
              }
                : {
                  minHeight: 392,
                  minWidth: 218,
                  border: '2px solid #d7d7d7',
                  borderRadius: '21px',
                  background: '#ffffff',
                  textTransform: 'none',
                  color: '#444444',
                  backgroundcolor: '#FFFFFF',
                  marginLeft: '30px',
                }}
              className="silly-button"
              onClick={() => {
                setVerySillyColor(false);
                setSillyColor(false);
                setNeutralColor(false);
                setSeriousColor(false);
                setVerySeriousColor(!verySeriousColor);
                setValueSelected(5);
                handleClick(5);
              }}
            >
              <img src={VerySerious} height="90" width="90" alt="Very Serious Missing" />
              <FormControlLabel
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
                }}
                control={(
                  <Radio
                    checked={valueSelected === 5}
                    sx={{
                      '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                    {
                      color: verySeriousColor ? '#393EBA' : 'white',
                    },
                      '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                        color: '#393EBA',
                      },
                    }}
                    value={5}
                    onChange={(e) => handleClick(e.target.value)}
                  />
)}
                label={(
                  <p style={verySeriousColor ? {
                    fontFamily: 'DM Sans', color: '#FFFFFF', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  } : {
                    fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                  }}
                  >
                    I am almost always serious
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
        <ProgressBar variant="determinate" progress={41} sx={{ flex: '0 1 60%' }} />
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
