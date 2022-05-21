/* eslint-disable max-len */
import React, { useState } from 'react';
import propTypes from 'prop-types';
import {
  Box, Button, Checkbox, Avatar,
} from '@mui/material';
import Sample from '../../Assets/Images/DemoImgGenre.png';
// import illusion from '../../Assets/Images/illusion.png';
// import QuizButton from './QuizButton';
// import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
export default function Quiz7Kid({ bookFilters, setBookFilters, parentCallback07K }) {
  const [isDisabled, setIsDisabled] = useState();
  const handleClick = (val) => {
    // eslint-disable-next-line camelcase
    setBookFilters({ ...bookFilters, genre: 'genre'.push(val) });
    setIsDisabled(false);
    parentCallback07K(isDisabled);
  };
  return (
    <div>
      <Box sx={{ padding: 15 }}>
        <h1>
          Which of the following seem fun to you?
        </h1>
        <h3>You can choose more than one.</h3>
        <Button value="Adventure" onChange={(e) => handleClick(e.target.value)} class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>Going on a journey to a new place with your friends</p>
        </Button>
        <Button value="Scary/Horror" onChange={(e) => handleClick(e.target.value)} class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>Suspenseful events iwth plot twists that may shock you</p>
        </Button>
        <Button value="Sci-fi" onChange={(e) => handleClick(e.target.value)} class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>Going to outer space and exploring different planets</p>
        </Button>
        <Button value="Fantasy" onChange={(e) => handleClick(e.target.value)} class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>Living in a magical world where you have powers</p>
        </Button>
        <Button value="Romance" onChange={(e) => handleClick(e.target.value)} class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>Having a picnic with someone you really like</p>
        </Button>
        <Button value="Afro-futurism" onChange={(e) => handleClick(e.target.value)} class="button" sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Sample} style={{ borderRadius: 0 }} />}>
          <Checkbox />
          <p>Visiting an African realm with magic and advanced technology</p>
        </Button>
      </Box>
    </div>
  );
}
Quiz7Kid.propTypes = {
  parentCallback07K: propTypes.isRequired,
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
