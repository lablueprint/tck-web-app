/* eslint-disable */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  Card, CardContent, Typography, Box,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Logo from '../../Assets/Images/TCK PNG Logo.png';

import BookCover from './BookCover';
import BookDesc from './BookDesc';
import SideCards from './SideCards';

const styles = {
  synopsis: {
    display: 'flex',
    flexDirection: 'row',
    margin: '6vh auto',
    width: '85%',
    '@media (max-width: 960px)': {
      flexDirection: 'column',
      width: '100%',
    },
  },
};

function BookSynopsis({
  title, desc, imageURL, bookshopURL, readAloudURL, educatorURLs, identityTags, raceEthnicity,
  genre, themesLessons, religion, ageMin, ageMax, gradeMin, gradeMax, authors,
  illustrators, bookType, datePublished,
}) {
  const [seeMore, setSeeMore] = useState(true);
  const toggleSeeMore = () => setSeeMore(!seeMore);

  return (
    <Box sx={styles.synopsis}>
      <BookCover
        title={title}
        imageURL={imageURL}
        identityTags={identityTags}
        raceEthnicity={raceEthnicity}
        genre={genre}
        themesLessons={themesLessons}
        religion={religion}
      />

      <BookDesc
        title={title}
        desc={desc}
      />

      <SideCards
        authors={authors}
        illustrators={illustrators}
        ageMin={ageMin}
        ageMax={ageMax}
        gradeMin={gradeMin}
        gradeMax={gradeMax}
        bookType={bookType}
        datePublished={datePublished}
        readAloudURL={readAloudURL}
        educatorURLs={educatorURLs}
        bookshopURL={bookshopURL}
      />

    </Box>
  );
}

export default BookSynopsis;

BookSynopsis.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  imageURL: PropTypes.string,
  bookshopURL: PropTypes.string,
  readAloudURL: PropTypes.string,
  educatorURLs: PropTypes.arrayOf(PropTypes.string),
  identityTags: PropTypes.arrayOf(PropTypes.string),
  raceEthnicity: PropTypes.arrayOf(PropTypes.string),
  genre: PropTypes.arrayOf(PropTypes.string),
  themesLessons: PropTypes.arrayOf(PropTypes.string),
  religion: PropTypes.arrayOf(PropTypes.string),
  ageMin: PropTypes.number,
  ageMax: PropTypes.number,
  gradeMin: PropTypes.string,
  gradeMax: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  })),
  illustrators: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  })),
  bookType: PropTypes.string,
  datePublished: PropTypes.string,
};

BookSynopsis.defaultProps = {
  title: 'Untitled Book',
  desc: 'It\'s a book. with words. **gasp**',
  imageURL: Logo,
  bookshopURL: '',
  readAloudURL: '',
  educatorURLs: [],
  identityTags: [],
  raceEthnicity: [],
  genre: [],
  themesLessons: [],
  religion: [],
  ageMin: -1,
  ageMax: -1,
  gradeMin: '',
  gradeMax: '',
  authors: [],
  illustrators: [],
  bookType: '',
  datePublished: '',
};

/* TO DO
  1. Get Educator Guide titles, read-aloud title
  1. Break up into components
    BookDesc: Card + description
    SideCards: Side Cards
    6. Bookshop on hover
    4. See More and arrow hover needs to be in sync
      -idk lol not important

*/
