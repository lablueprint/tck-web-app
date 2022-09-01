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
      <Box sx={{
        '@media (min-width:680px)(max-width:800px)': {
          flex: '0 0 70%',
        },
        '@media (max-width: 680px)': {
          flex: '0 0 80%',
        },
        padding: 15,
        flex: '0 0 40%',
        textAlign: 'left',
      }}
      >
        <h2
          className="Conscious"
        >
          The Conscious Kid&apos;s

        </h2>
        <h1
          className="BookFinder"
        >
          Book Finder Quiz
        </h1>
        <h4
          className="Search"
        >
          Do not know what to search for? Try this short quiz to receive personalized book recommendations from The Conscious Kids collection! Take this is you are a kid, parent, or educator looking for a fun read!
        </h4>
        <NavLink to="/quiz/questions">
          <button
            className="startButton"
            type="button"
          >
            Take the Quiz
          </button>
        </NavLink>
      </Box>
    </div>
  );
}
