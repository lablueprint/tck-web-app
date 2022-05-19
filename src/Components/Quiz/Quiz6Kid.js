/* eslint-disable max-len */
import React from 'react';
import {
  Box,
} from '@mui/material';
import propTypes from 'prop-types';
import QuizButton from './QuizButton';

export default function Quiz6Kid({
  title, buttonCaptions, setBookFilters,
}) {
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
          {title}
        </h1>
        <h3>You can choose more than one.</h3>
        <QuizButton buttonCaption={buttonCaptions[0]} onClick={(checked) => HandleClick('Autobiography', checked)} />
        <QuizButton buttonCaption={buttonCaptions[1]} onClick={(checked) => HandleClick('Non-fiction', checked)} />
        <QuizButton buttonCaption={buttonCaptions[2]} onClick={(checked) => HandleClick('Historical fiction', checked)} />
        <QuizButton buttonCaption={buttonCaptions[3]} onClick={(checked) => HandleClick('Memoir', checked)} />
        <QuizButton buttonCaption={buttonCaptions[4]} onClick={(checked) => HandleClick('Mystery', checked)} />
        <QuizButton buttonCaption={buttonCaptions[5]} onClick={(checked) => HandleClick('Poetry', checked)} />
      </Box>
    </div>
  );
}
Quiz6Kid.propTypes = {
  title: propTypes.string.isRequired,
  buttonCaptions: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
  setBookFilters: propTypes.func.isRequired,
};
