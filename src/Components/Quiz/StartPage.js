/* eslint-disable max-len */
import React from 'react';
import {
  Box,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import './StartPage.css';

export default function StartPage() {
  return (
    <div className="Start">
      <Box sx={{ padding: 15, flex: '0 0 40%', textAlign: 'left' }}>
        <h2 style={{ color: '#393EBA', fontSize: '40px', marginBottom: '0' }}>The Conscious Kid&apos;s</h2>
        <h1 style={{
          color: '#333333', fontSize: '64px', fontFamily: 'Work Sans', letterSpacing: '-0.04em', marginTop: '0',
        }}
        >
          Book Finder Quiz
        </h1>
        <h4 style={{
          fontFamily: 'Work Sans', color: '#333333', fontSize: '22px', fontWeight: 'normal',
        }}
        >
          Do not know what to search for? Try this short quiz to receive personalized book recommendations from The Conscious Kids collection! Take this is you are a kid, parent, or educator looking for a fun read!
        </h4>
        <NavLink to="/quiz/questions">
          <button
            style={{
              background: '#393EBA', borderRadius: '0.6em', letterSpacing: '0.02em', color: 'white', fontFamily: 'Work Sans', fontWeight: 'bold', fontSize: '1.3em', width: '234px', height: '67px', border: 'None',
            }}
            type="button"
          >
            Take the Quiz
          </button>
        </NavLink>
        {/* <Button component={Link} to="/quiz/questions" variant="contained">
          Take the quiz
        </Button> */}
      </Box>
    </div>
  );
}
