import React from 'react';
import propTypes from 'prop-types';
import {
  Box,
} from '@mui/material';
import QuizButton from './QuizButton';

export default function Quiz7Kid({ setBookFilters }) {
  function HandleClick(name, checked) {
    if (checked) {
      setBookFilters((prevValue) => ({ ...prevValue, genre: prevValue.genre.concat(name) }));
    } else {
      setBookFilters((prevValue) => {
        const index = prevValue.genre.indexOf(name);
        return { ...prevValue, genre: prevValue.genre.splice(index, 1) };
      });
    }
  }
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          Which of the following seem fun to you?
        </h1>
        <h3>You can choose more than one.</h3>
        <QuizButton buttonCaption="Going on a journey to a new place with your friends" onClick={(checked) => HandleClick('Adventure', checked)} />
        <QuizButton buttonCaption="Suspenseful events iwth plot twists that may shock you" onClick={(checked) => HandleClick('Scary/Horror', checked)} />
        <QuizButton buttonCaption="Going to outer space and exploring different planets" onClick={(checked) => HandleClick('Sci-fi', checked)} />
        <QuizButton buttonCaption="Living in a magical world where you have powers" onClick={(checked) => HandleClick('Fantasy', checked)} />
        <QuizButton buttonCaption="Having a picnic with someone you really like" onClick={(checked) => HandleClick('Romance', checked)} />
        <QuizButton buttonCaption="Visiting an African realm with magic and advanced technology" onClick={(checked) => HandleClick('Afro-futurism', checked)} />
      </Box>
    </div>
  );
}
Quiz7Kid.propTypes = {
  setBookFilters: propTypes.func.isRequired,
};
