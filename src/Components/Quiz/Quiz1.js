/* eslint-disable eqeqeq */
import React from 'react';
import propTypes from 'prop-types';
import {
  Avatar, Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import Child from '../../Assets/Images/Child.png';
import Parent from '../../Assets/Images/Parent.png';
import Educator from '../../Assets/Images/Educator.png';
import AvatarButton from './AvatarButton';
import './QuizGroup.css';

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
    width: 120,
    height: 120,
  },
};

export default function Quiz1({
  dispatch, isDisabled, isParent, setIsChild,
}) {
  const navigate = useNavigate();

  const handleToggle = (type, isChild) => {
    setIsChild(isChild);
    dispatch(type);
  };

  const handleBack = () => {
    navigate('/quiz');
  };

  const handleForward = () => ((isParent) ? handleToggle({ type: 'parent' }, false) : handleToggle({ type: 'child' }, true));

  return (
    <div className="quiz-container">
      <h1 className="quiz-header">
        Are you a parent, educator, or kid?
      </h1>
      <Box sx={styles.avatarButtonBox}>
        <AvatarButton
          caption="Educator"
          handleToggle={() => handleToggle({ type: 'parent' }, false)}
          icon={(
            <Avatar
              sx={styles.avatarIcon}
              src={Parent}
              alt="Educator icon"
            />
          )}
        />
        <AvatarButton
          caption="Parent/Caregiver"
          handleToggle={() => handleToggle({ type: 'parent' }, false)}
          icon={(
            <Avatar
              sx={styles.avatarIcon}
              src={Educator}
              alt="Parent/Caregiver icon"
            />
          )}
        />
        <AvatarButton
          caption="Kid"
          handleToggle={() => handleToggle({ type: 'child' }, true)}
          icon={(
            <Avatar
              sx={styles.avatarIcon}
              src={Child}
              alt="Child icon"
            />
          )}
        />
      </Box>
      <ProgressBar
        progress={0}
        onBack={handleBack}
        onForward={handleForward}
        forwardDisabled={isDisabled}
      />
    </div>
  );
}

Quiz1.propTypes = {
  setIsChild: propTypes.func.isRequired,
  dispatch: propTypes.func.isRequired,
  isDisabled: propTypes.bool.isRequired,
  isParent: propTypes.bool.isRequired,
};
