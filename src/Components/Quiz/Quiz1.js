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
import ProgressAndArrows from './ProgressAndArrows';
import Child from '../../Assets/Images/Child.svg';
import Parent from '../../Assets/Images/Parent.svg';
import Educator from '../../Assets/Images/Educator.svg';

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
    <div style={{ background: '#FAFAFA', height: '100%' }}>
      <div>
        <h2 style={{
          fontFamily: 'DM Sans', letterSpacing: '-0.02em', margin: '0', paddingTop: '3em',
        }}
        >
          Are you a parent, educator, or kid?
        </h2>
        <Box sx={{ paddingBottom: '4em' }}>
          <Button
            className="button"
            sx={{
              border: '2px solid #d7d7d7',
              borderRadius: '21px',
              m: 7,
              '& .MuiButton-startIcon': {
                marginRight: '0',
              },
              background: '#ffffff',
            }}
            onClick={() => handleToggle({ type: 'parent' }, false)}
            size="large"
            variant="outlined"
            startIcon={(
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={Parent}
                style={{ borderRadius: 0 }}
              />
            )}
          >
            <p
              className="button-text"
              style={{
                fontFamily: 'DM Sans', fontWeight: 'bold', color: '#000000', textTransform: 'capitalize',
              }}
            >
              Parent
            </p>
          </Button>
          <Button
            className="button"
            sx={{
              border: '2px solid #d7d7d7',
              borderRadius: '21px',
              m: 7,
              '& .MuiButton-startIcon': {
                marginRight: '0',
              },
              background: '#ffffff',
            }}
            onClick={() => handleToggle({ type: 'parent' }, false)}
            size="large"
            variant="outlined"
            startIcon={(
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={Educator}
                style={{ borderRadius: 0 }}
              />
            )}
          >
            <p
              className="button-text"
              style={{
                fontFamily: 'DM Sans', fontWeight: 'bold', color: '#000000', textTransform: 'capitalize',
              }}
            >
              Educator

            </p>
          </Button>
          <Button
            className="button"
            sx={{
              border: '2px solid #d7d7d7',
              borderRadius: '21px',
              m: 7,
              background: '#ffffff',
              '& .MuiButton-startIcon': {
                marginRight: '0',
              },
            }}
            onClick={() => handleToggle({ type: 'child' }, true)}
            size="large"
            variant="outlined"
            startIcon={(
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={Child}
                style={{ borderRadius: 0 }}
              />
            )}
          >
            <p
              className="button-text"
              style={{
                fontFamily: 'DM Sans', fontWeight: 'bold', color: '#000000', textTransform: 'capitalize',
              }}
            >
              Kid
            </p>
          </Button>
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
          <ProgressAndArrows variant="determinate" progress={0} sx={{ flex: '0 1 60%' }} />
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
