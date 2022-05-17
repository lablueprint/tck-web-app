/* eslint-disable max-len */
import React from 'react';
import {
  Box, Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function StartPage() {
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          The Conscious Kid Recomendation Quiz
        </h1>
        <h4>
          Do not know what to search for? Try this short quiz to recieve personalized book reccomendations from The Conscious Kids collection! Take this is you are a kid, parent, or educator looking for a fun read!
        </h4>
      </Box>
      <Button component={Link} to="/quiz/questions" variant="contained">
        Start the quiz
      </Button>
    </div>
  );
}
