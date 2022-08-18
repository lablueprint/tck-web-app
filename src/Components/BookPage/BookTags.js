import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Chip, Box, Typography,
} from '@mui/material';

const styles = {
  tagHeader: {
    textAlign: 'left',
    fontFamily: 'Work Sans',
    fontSize: '.9em',
    fontWeight: '600',
    margin: '2vh auto 1vh auto',
    '@media (max-width: 960px)': {
      width: '90%',
      margin: '2vh auto 1vh auto',
    },
  },
  tagContainer: {
    overflowWrap: 'break-words',
    margin: 'auto',
    textAlign: 'left',
    '@media (min-width: 768px)': {
      marginBottom: '12vh',
    },
    '@media (max-width: 960px)': {
      width: '90%',
    },
  },
  chip: {
    margin: '0.2vw',
    fontSize: '0.9em',
    fontFamily: 'DM Sans',
  },
};

const chipColors = [
  { // red  -- race/ethnicity
    color: '#A51717',
    backgroundColor: '#FFDFDF',
  },
  { // green  -- genre
    color: '#004F4A',
    backgroundColor: '#D5EFF1',
  },
  { // yellow -- identity
    color: '#6F4323',
    backgroundColor: '#FAE9D0',
  },
  { // blue -- themes/lessons
    color: '#004A90',
    backgroundColor: '#D0E6FB',
  },
  { // purple -- religion
    color: '#131C72',
    backgroundColor: '#E2E5FF',
  },
];

/* Tags
 */
const createTags = (identityTags, raceEthnicity, genre, themesLessons, religion) => {
  const createTagsHelper = (tags) => (colorIndex) => tags.map((tag) => {
    const chipStyle = { ...chipColors[colorIndex], ...styles.chip };
    return (
      <Chip
        label={tag}
        sx={chipStyle}
        color="primary"
        key={tag}
        id={tag}
      />
    );
  });
  const raceEthChips = createTagsHelper(raceEthnicity)(0);
  const genreChips = createTagsHelper(genre)(1);
  const identityChips = createTagsHelper(identityTags)(2);
  const themesChips = createTagsHelper(themesLessons)(3);
  const religionChips = createTagsHelper(religion)(4);
  return [...raceEthChips, ...genreChips, ...identityChips, ...themesChips, ...religionChips];
};

function BookTags({
  identityTags, raceEthnicity, genre, themesLessons, religion,
}) {
  const tags = createTags(identityTags, raceEthnicity, genre, themesLessons, religion);
  return (
    <div>
      <Typography sx={styles.tagHeader}>Tags</Typography>
      <Box sx={styles.tagContainer}>
        {tags}
      </Box>
    </div>
  );
}

BookTags.propTypes = {
  identityTags: PropTypes.arrayOf(PropTypes.string),
  raceEthnicity: PropTypes.arrayOf(PropTypes.string),
  genre: PropTypes.arrayOf(PropTypes.string),
  themesLessons: PropTypes.arrayOf(PropTypes.string),
  religion: PropTypes.arrayOf(PropTypes.string),
};

BookTags.defaultProps = {
  identityTags: [],
  raceEthnicity: [],
  genre: [],
  themesLessons: [],
  religion: [],
};

export default BookTags;
