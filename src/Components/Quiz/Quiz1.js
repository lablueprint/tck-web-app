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
// import Quiz2Adult from './Quiz2Adult';
// import Quiz3 from './Quiz3';
// import Quiz4Kid from './Quiz4Kid';
// import Quiz5 from './Quiz5Kid';
// import Quiz8Adult from './Quiz8Adult';
// import Quiz2Kid from './Quiz2Kid';
// import Quiz6 from './Quiz6';
// import Quiz7Kid from './Quiz7Kid';
// import Quiz6Kid from './Quiz6Kid';
import ProgressAndArrows from './ProgressAndArrows';
import Child from '../../Assets/Images/Child.svg';
import Parent from '../../Assets/Images/Parent.svg';
import Educator from '../../Assets/Images/Educator.svg';

export default function Quiz1({ dispatch, setDisabled, isParent }) {
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
            onClick={() => dispatch({ type: 'parent' })}
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
            onClick={() => dispatch({ type: 'parent' })}
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
            onClick={() => dispatch({ type: 'child' })}
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
          </NavLink>
          <ProgressAndArrows variant="determinate" progress={0} sx={{ flex: '0 1 60%' }} />
          <Button
            disabled={setDisabled}
            variant="contained"
            onClick={() => ((isParent) ? dispatch({ type: 'parent' }) : dispatch({ type: 'child' }))}
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
  // setBookFilters: propTypes.func.isRequired,
  // setIsChild: propTypes.func.isRequired,
  dispatch: propTypes.func.isRequired,
  setDisabled: propTypes.bool.isRequired,
  isParent: propTypes.bool.isRequired,
  // bookFilters: propTypes.shape({
  //   bookId: propTypes.string.isRequired,
  //   'race/ethnicity': propTypes.arrayOf(propTypes.string).isRequired,
  //   minAge: propTypes.number.isRequired,
  //   maxAge: propTypes.number.isRequired,
  //   minGrade: propTypes.number.isRequired,
  //   maxGrade: propTypes.number.isRequired,
  //   genre: propTypes.arrayOf(propTypes.string).isRequired,
  //   book_type: propTypes.arrayOf(propTypes.string).isRequired,
  // }).isRequired,
};
