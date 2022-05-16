/* eslint-disable max-len */
import React from 'react';
import {
  Box, Button, Avatar, Checkbox,
} from '@mui/material';
import propTypes from 'prop-types';
import Sample from '../../Assets/Images/DemoImgGenre.png';

export default function Quiz6Kid({
  title, buttonCaptions, bookFilters, setBookFilters,
}) {
  const handleClick = (val) => {
    setBookFilters({ ...bookFilters, genre: 'genre'.push(val) });
  };
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          {title}
        </h1>
        <h3>You can choose more than one.</h3>
        <Button value={buttonCaptions[0]} onClick={(value) => handleClick(value)} class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>{buttonCaptions[0]}</p>
        </Button>
        <Button value={buttonCaptions[1]} onClick={(value) => handleClick(value)} class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>{buttonCaptions[1]}</p>
        </Button>
        <Button value={buttonCaptions[2]} onClick={(value) => handleClick(value)} class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>{buttonCaptions[2]}</p>
        </Button>
        <Button value={buttonCaptions[3]} onClick={(value) => handleClick(value)} class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>{buttonCaptions[3]}</p>
        </Button>
        <Button value={buttonCaptions[4]} onClick={(value) => handleClick(value)} class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>{buttonCaptions[4]}</p>
        </Button>
      </Box>
    </div>
  );
}
Quiz6Kid.propTypes = {
  title: propTypes.string.isRequired,
  buttonCaptions: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
  setBookFilters: propTypes.func.isRequired,
  bookFilters: propTypes.shape({
    bookId: propTypes.string.isRequired,
    'race/ethnicity': propTypes.arrayOf(propTypes.string).isRequired,
    minAge: propTypes.number.isRequired,
    maxAge: propTypes.number.isRequired,
    minGrade: propTypes.number.isRequired,
    maxGrade: propTypes.number.isRequired,
    genre: propTypes.arrayOf(propTypes.string).isRequired,
    book_type: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
};
