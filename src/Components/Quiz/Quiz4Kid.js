import React, { useState } from 'react';
import {
  Box, Button,
} from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
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
import SillyButton from './SillyButton';
import './QuizGroup.css';
import { useWindowSize } from '../Navigation/Header';

export default function Quiz4Kid({ setSilly, dispatch, sillyNotSet }) {
  const [valueSelected, setValueSelected] = useState(0);
  const handleClick = (val) => {
    setSilly(val);
  };
  const size = useWindowSize();
  return (
    <div style={{ background: '#FCFCFC' }}>
      <h1 style={{
        fontFamily: 'DM Sans', marginBottom: size.width > 1024 ? '20px' : '0px', color: '#444444',
      }}
      >
        Which of the following best describes you?
      </h1>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '6rem 1rem 2rem',
      }}
      >
        <FormControl style={{
          marginTop: size.width > 1024 ? '50px' : '0px', marginBottom: size.width > 1024 ? '0px' : '50px', position: 'relative', bottom: '4rem',
        }}
        >
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{ flexDirection: 'row', justifyContent: 'center' }}
          >
            <SillyButton handleClick={() => handleClick(1)} value={1} valueSelected={valueSelected} setValueSelected={setValueSelected} caption="I am almost always silly" image={VerySilly} alt="Very Silly Missing" />
            <SillyButton handleClick={() => handleClick(2)} value={2} valueSelected={valueSelected} setValueSelected={setValueSelected} caption="I am usually silly, but I can be serious if I need to be" image={Silly} alt="Silly Missing" />
            <SillyButton handleClick={() => handleClick(3)} value={3} valueSelected={valueSelected} setValueSelected={setValueSelected} caption="I can be either silly or serious" image={Neutral} alt="Neutral Missing" />
            <SillyButton handleClick={() => handleClick(4)} value={4} valueSelected={valueSelected} setValueSelected={setValueSelected} caption="I am usually serious, but I can be silly sometimes" image={Serious} alt="Serious Missing" />
            <SillyButton handleClick={() => handleClick(5)} value={5} valueSelected={valueSelected} setValueSelected={setValueSelected} caption="I am almost always serious" image={VerySerious} alt="Very Serious Missing" />
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
