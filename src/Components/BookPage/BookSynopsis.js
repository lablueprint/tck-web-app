import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  Box,
} from '@mui/material';
import Logo from '../../Assets/Images/TCK PNG Logo.png';

import BookCover from './BookCover';
import BookDesc from './BookDesc';
import AboutBook from './AboutBook';
import AdditionalResources from './AdditionalResources';

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
  const [width, setWidth] = useState(
    window.innerWidth,
  );

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  const desktop = (
    <>
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
    </>
  );

  const mobile = (
    <>
      <BookDesc
        title={title}
        isMobile
      />
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
        desc={desc}
        isMobile
      />

    </>
  );

  return (
    <Box sx={styles.synopsis}>
      { (isMobile) ? mobile : desktop}
      <div>
        <AboutBook
          authors={authors}
          illustrators={illustrators}
          ageMin={ageMin}
          ageMax={ageMax}
          gradeMin={gradeMin}
          gradeMax={gradeMax}
          bookType={bookType}
          datePublished={datePublished}
          bookshopURL={bookshopURL}
        />
        <AdditionalResources
          readAloudURL={readAloudURL}
          educatorURLs={educatorURLs}
        />
      </div>
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
  bookType: PropTypes.arrayOf(PropTypes.string),
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
  bookType: [],
  datePublished: '',
};

/*
  - The <div> around <AboutBook> and <AdditionalResources> is necessary!!!!
*/
