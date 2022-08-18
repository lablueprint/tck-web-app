import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Box,
} from '@mui/material';
import Logo from '../../Assets/Images/TCK PNG Logo.png';

import BookTags from './BookTags';

const styles = {
  bookCover: {
    maxWidth: '20vw',
    filter: 'drop-shadow(4px 4px 50px rgba(0, 0, 0, 0.25))',

    marginRight: '2vw',
    '@media (max-width: 960px)': {
      maxWidth: '75vw',
      margin: 'auto',
      filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))',
      borderRadius: '16px',
    },

  },
  topDownContainer: {
    display: 'block',
    margin: 'auto 1vw auto 1vw',
  },
};

function BookCover({
  title, imageURL, identityTags,
  raceEthnicity, genre, themesLessons, religion,
}) {
  return (
    <Box sx={styles.topDownContainer}>
      <Box
        component="img"
        sx={styles.bookCover}
        alt={`Book cover for ${title}`}
        src={imageURL}
      />
      <BookTags
        identityTags={identityTags}
        raceEthnicity={raceEthnicity}
        genre={genre}
        themesLessons={themesLessons}
        religion={religion}
      />
    </Box>
  );
}

BookCover.propTypes = {
  title: PropTypes.string,
  imageURL: PropTypes.string,
  identityTags: PropTypes.arrayOf(PropTypes.string),
  raceEthnicity: PropTypes.arrayOf(PropTypes.string),
  genre: PropTypes.arrayOf(PropTypes.string),
  themesLessons: PropTypes.arrayOf(PropTypes.string),
  religion: PropTypes.arrayOf(PropTypes.string),
};

BookCover.defaultProps = {
  title: 'Untitled Book',
  imageURL: Logo,
  identityTags: [],
  raceEthnicity: [],
  genre: [],
  themesLessons: [],
  religion: [],
};

export default BookCover;
