import React from 'react';
import {
  Box, Avatar,
} from '@mui/material';
import propTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import VerySerious from '../../Assets/Images/TCK_Mood - Very Serious.png';
import Serious from '../../Assets/Images/TCK_Mood - Serious.png';
import Neutral from '../../Assets/Images/TCK_Mood - Neutral.png';
import Silly from '../../Assets/Images/TCK_Mood - Silly.png';
import VerySilly from '../../Assets/Images/TCK_Mood - Very Silly.png';
import './QuizGroup.css';
import AvatarButton from './AvatarButton';

const styles = {
  avatarButtonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    columnGap: '3rem',
    rowGap: '1rem',
  },
  avatarIcon: {
    width: 125,
    height: 125,
    borderRadius: 0,
    '@media (max-width: 750px)': {
      width: 100,
      height: 100,
    },
  },
};

export default function Quiz4Kid({ setSilly, dispatch, sillyNotSet }) {
  const handleClick = (val) => {
    setSilly(val);
    dispatch({ type: 'child' });
  };

  const handleBack = () => dispatch({ type: 'child back' });

  const handleForward = () => dispatch({ type: 'child' });

  return (
    <div className="quiz-container">
      <h1 className="quiz-header">
        Which of the following best describes you?
      </h1>
      <Box sx={styles.avatarButtonBox}>
        <AvatarButton
          caption="I am almost always serious"
          handleToggle={() => handleClick(1)}
          icon={(
            <Avatar
              sx={styles.avatarIcon}
              src={VerySerious}
              alt=""
            />
            )}
          isSillyButton
        />
        <AvatarButton
          caption="I am usually serious, but I can be silly sometimes"
          handleToggle={() => handleClick(2)}
          icon={(
            <Avatar
              sx={styles.avatarIcon}
              src={Serious}
              alt=""
            />
            )}
          isSillyButton
        />
        <AvatarButton
          caption="I can be either silly or serious"
          handleToggle={() => handleClick(3)}
          icon={(
            <Avatar
              sx={styles.avatarIcon}
              src={Neutral}
              alt=""
            />
            )}
          isSillyButton
        />
        <AvatarButton
          caption="I am
            usually silly, but I can be serious if I need to be"
          handleToggle={() => handleClick(4)}
          icon={(
            <Avatar
              sx={styles.avatarIcon}
              src={Silly}
              alt=""
            />
            )}
          isSillyButton

        />
        <AvatarButton
          caption="I am
            almost always silly"
          handleToggle={() => handleClick(5)}
          icon={(
            <Avatar
              sx={styles.avatarIcon}
              src={VerySilly}
              alt=""
            />
            )}
          isSillyButton

        />
      </Box>
      <ProgressBar
        progress={60}
        onBack={handleBack}
        onForward={handleForward}
        forwardDisabled={sillyNotSet()}
      />
    </div>
  );
}
Quiz4Kid.propTypes = {
  setSilly: propTypes.func.isRequired,
  dispatch: propTypes.func.isRequired,
  sillyNotSet: propTypes.func.isRequired,
};
