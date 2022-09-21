import React from 'react';
import {
  Box, Button, Avatar,
} from '@mui/material';
// import RadioGroup from '@mui/material/RadioGroup';
import propTypes from 'prop-types';
// import FormControl from '@mui/material/FormControl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProgressBar from './ProgressBar';
import VerySerious from '../../Assets/Images/TCK_Mood - Very Serious.svg';
import Serious from '../../Assets/Images/TCK_Mood - Serious.svg';
import Neutral from '../../Assets/Images/TCK_Mood - Neutral.svg';
import Silly from '../../Assets/Images/TCK_Mood - Silly.svg';
import VerySilly from '../../Assets/Images/TCK_Mood - Very Silly.svg';
// import SillyButton from './SillyButton';
import './QuizGroup.css';
// import { useWindowSize } from '../Navigation/Header';
import AvatarButton from './AvatarButton';

export default function Quiz4Kid({ setSilly, dispatch, sillyNotSet }) {
  // const [valueSelected, setValueSelected] = useState(0);
  const handleClick = (val) => {
    setSilly(val);
    dispatch({ type: 'child' });
  };
  // const size = useWindowSize();
  return (
    <div style={{ paddingBottom: 200, background: '#FAFAFA' }}>
      <h1 style={{ fontFamily: 'DM Sans', marginTop: '20px', color: '#444444' }}>
        Which of the following best describes you?
      </h1>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        margin: '6rem 1rem 2rem',
      }}
      >
        <AvatarButton
          caption="I am almost
            always serious"
          handleToggle={() => handleClick(1)}
          icon={(
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={VerySerious}
              style={{ borderRadius: 0 }}
              alt="Very Serious"
            />
            )}
        />
        <AvatarButton
          caption="I am usually
            serious, but I can be silly sometimes"
          handleToggle={() => handleClick(2)}
          icon={(
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={Serious}
              style={{ borderRadius: 0 }}
              alt="Serious"
            />
            )}
        />
        <AvatarButton
          caption="I can be
            either silly or serious"
          handleToggle={() => handleClick(3)}
          icon={(
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={Neutral}
              style={{ borderRadius: 0 }}
              alt="Neutral"
            />
            )}
        />
        <AvatarButton
          caption="I am
            usually silly, but I can be serious if I need to be"
            // handleToggle={handleClick(4)}
          handleToggle={() => handleClick(4)}
          icon={(
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={Silly}
              style={{ borderRadius: 0 }}
              alt="Silly"
            />
            )}
        />
        <AvatarButton
          caption="I am
            almost always silly"
          handleToggle={() => handleClick(5)}
          icon={(
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={VerySilly}
              style={{ borderRadius: 0 }}
              alt="Very Silly"
            />
            )}
        />
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
