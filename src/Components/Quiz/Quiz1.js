/* eslint-disable eqeqeq */
import React from 'react';
import propTypes from 'prop-types';
import './QuizGroup.css';
import {
  Button, Avatar, Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import Child from '../../Assets/Images/Child.svg';
import Parent from '../../Assets/Images/Parent.svg';
import Educator from '../../Assets/Images/Educator.svg';
import AvatarButton from './AvatarButton';

export default function Quiz1({
  dispatch, setDisabled, isParent, setIsChild,
}) {
  const handleToggle = (type, isChild) => {
    if (isChild) {
      setIsChild(!isParent);
    }
    dispatch(type);
  };
  return (
    <div style={{ paddingBottom: 200, background: '#FAFAFA' }}>
      <div>
        <h1 style={{ fontFamily: 'DM Sans', marginTop: '20px', color: '#444444' }}>
          Are you a parent, educator, or kid?
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
            caption="Educator"
            handleToggle={() => handleToggle({ type: 'parent' }, false)}
            icon={(
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={Parent}
                style={{ borderRadius: 0 }}
                alt="parent"
              />
            )}
          />
          <AvatarButton
            caption="Parent/Caregiver"
            handleToggle={() => handleToggle({ type: 'parent' }, false)}
            icon={(
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={Educator}
                style={{ borderRadius: 0 }}
              />
            )}
          />
          <AvatarButton
            caption="Kid"
            handleToggle={() => handleToggle({ type: 'child' }, true)}
            icon={(
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={Child}
                style={{ borderRadius: 0 }}
              />
            )}
          />
        </Box>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <NavLink to="/quiz">
            <Button
              variant="contained"
              onClick={() => handleToggle({ type: 'child back' }, true)}
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
          </NavLink>
          <ProgressBar variant="determinate" progress={0} sx={{ flex: '0 1 60%' }} />
          <Button
            disabled={setDisabled}
            variant="contained"
            onClick={() => ((isParent) ? handleToggle({ type: 'parent' }, false) : handleToggle({ type: 'child' }, true))}
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
    </div>
  );
}

Quiz1.propTypes = {
  setIsChild: propTypes.func.isRequired,
  dispatch: propTypes.func.isRequired,
  setDisabled: propTypes.bool.isRequired,
  isParent: propTypes.bool.isRequired,
};
