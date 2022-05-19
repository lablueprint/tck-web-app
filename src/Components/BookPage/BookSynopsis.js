import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  Card, CardContent, Typography, Link as LinkUI, Chip, Button, Box,
} from '@mui/material';
import { CallMade as Away, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/Images/TCK PNG Logo.png';

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
  bookCover: {
    maxWidth: '20vw',
    filter: 'drop-shadow(4px 4px 50px rgba(0, 0, 0, 0.25))',
    marginRight: '2vw',
    '@media (max-width: 960px)': {
      maxWidth: '90vw',
      margin: 'auto',
    },
  },
  topDownContainer: {
    display: 'block',
    margin: 'auto 1vw auto 1vw',
  },
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
    '@media (max-width: 960px)': {
      width: '90%',
    },
  },
  description: {
    minWidth: '27vw',

    textAlign: 'left',
    display: 'flex',
    margin: '1vh 2vw 1vh 2vw',
    boxShadow: 'none',
    width: '100%',
    '@media (max-width: 960px)': {
      maxWidth: '95vw',
      margin: 'auto',
    },
  },
  bookTitle: {
    display: 'inline',
    fontFamily: 'DM Sans',
    fontSize: '2.25em',
    fontWeight: '600',
    color: '#020202',
  },
  text: {
    fontFamily: 'DM Sans',
    marginTop: '2vh',
    lineHeight: '1.3em',
    color: '#4C4C4C',
    fontWeight: '400',
  },
  sideCardContainer: {
    margin: 'auto 1vw auto 1vw',
    minWidth: '18vw',
  },
  sideCard: {
    borderRadius: '1.31em',
    marginBottom: '4vh',
    background: '#FDFDFD',
    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.05)',
    border: '0.5px solid #E8E8E8',
    '@media (max-width: 960px)': {
      width: '85%',
      margin: 'auto',
    },
  },
  sideCardTitle: {
    textAlign: 'left',
    fontFamily: 'Work Sans',
    fontSize: '1.12em',
    fontWeight: '600',
    lineHeight: '1.5em',
    color: '#020202',
    marginTop: '2vh',
  },
  sideCardLinkContainer: {
    textAlign: 'left',
    fontSize: '0.85em',
    margin: '2vh auto 2vh auto',
  },
  creator: {
    display: 'inline',
    fontFamily: 'DM Sans',
    color: '#5A5A5A',
    lineHeight: '1.3em',
  },
  chip: {
    margin: '0.2vw',
    fontSize: '0.9em',
    fontFamily: 'DM Sans',
  },
  bolded: {
    display: 'inline',
    textAlign: 'left',
    fontFamily: 'Work Sans',
    fontSize: '1.12em',
    fontWeight: '600',
    lineHeight: '0',
  },
  blockContainer: {
    margin: '1vh auto',
    border: '1vh 1vw 1vh 1vh',
    display: 'flex',
    flexDirection: 'row',
    marginTop: '4vh',
    flexWrap: 'wrap',
    justifyContent: 'start',
    '& ::after': {
      content: '',
      flex: 'auto',
    },
  },
  block: {
    fontFamily: 'DM Sans',
    width: '45%',
    textAlign: 'left',
    order: '1',
    flexGrow: '0',
    margin: 'auto',
  },
  sub: {
    lineHeight: '1.5em',
    color: '#656565',
    marginTop: '0.5em',
  },
  bookshop: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    color: '#3477DE',
    background: 'rgba(52, 119, 222, 0.06)',
  },
  linkUI: {
    textDecoration: 'none',
    color: '#3477DE',
    fontWeight: '700',
    lineHeight: '1.8em',
    fontSize: '1.05em',
    display: 'block',
  },
  link: {
    textDecoration: 'none',
    color: 'royalblue',
    fontSize: '1.15em',
  },
  seeMoreContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  seeMoreText: {
    fontFamily: 'DM Sans',
    fontWeight: 700,
    fontSize: '0.875em',
    color: '#0068C9',
    paddingTop: 1,
    '&:hover': {
      color: '#669afa',
      cursor: 'pointer',
    },
  },
  seeMoreIcon: {
    fontSize: '1em',
    color: '#0068C9',
    paddingTop: 1,
    paddingLeft: 0.25,
    '&:hover': {
      color: '#669afa',
      cursor: 'pointer',
    },
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

/* Grade Range
    Airtable data for grade range is not dev-friendly. 😔
    if either one of gradeMin and gradeMax are undefined, we don't render at all.
    This does not handle Airtable user errors such as
      gradeMin: 9th, gradeMax: Kindergarten
    where the order of grades are incorrect
*/
const createGradeRange = (gradeMin, gradeMax) => {
  let gradeRange;
  if (!gradeMin) {
    // gradeMin not given
    if (gradeMax === '0 to Pre-K' || gradeMax === 'Kindergarten') {
      // We don't want to add 'grade' to long levels
      gradeRange = gradeMax;
    } else {
      gradeRange = `${gradeMax} Grade`;
    }
  } else if (!gradeMax || gradeMin === gradeMax) {
    // gradeMax not given or gradeMin same as gradeMax
    if (gradeMin === '0 to Pre-K' || gradeMin === 'Kindergarten') {
      // We don't want to add 'grade' to long levels
      gradeRange = gradeMin;
    } else {
      gradeRange = `${gradeMin} Grade`;
    }
  } else if (gradeMin === '0 to Pre-K' && gradeMax.length < 5) {
    // 0 to Pre-K to short grade
    gradeRange = `Up to ${gradeMax}`;
  } else if (gradeMin === 'Kindergarten' && gradeMax.length < 5) {
    // Kindergarten to short grade
    gradeRange = `K - ${gradeMax}`;
  } else if (gradeMin === '0 to Pre-K' && gradeMax === 'Kindergarten') {
    // 0 to Pre-K to Kindergarten
    gradeRange = 'Up to K';
  } else {
    // Short grade range e.g. 3rd to 6th
    gradeRange = `${gradeMin} to ${gradeMax}`;
  }
  return gradeRange;
};

/* Age Range
    An ageRange will render regardless of whether or not data is good
  */
const createAgeRange = (ageMin, ageMax) => {
  let ageRange;
  if (ageMin === -1 && ageMax === -1) {
    // Bofa
    ageRange = '-';
  } else if (ageMin === ageMax) {
    // Valid but equal ages
    ageRange = `Age ${ageMin}`;
  } else if (ageMin === -1) {
    // Bad ageMin
    ageRange = `Up to ${ageMax}`;
  } else if (ageMax === -1) {
    // Bad ageMax
    ageRange = `${ageMin} - 18`;
  } else if (ageMax < ageMin) {
    // Bad ordering
    ageRange = `${ageMax} - ${ageMin}`;
  } else {
    // Happy trail
    ageRange = `${ageMin} - ${ageMax}`;
  }
  return ageRange;
};

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

/* Date Published
  Take in a UTC date string and return an array of [dayOfWeek, month, day, year]
*/
const processDate = (date) => {
  const dateObject = new Date(date);
  const dateArray = dateObject.toDateString().split(' ');

  // Remove leading zeros from day
  dateArray[2] = parseInt(dateArray[2], 10);
  return dateArray;
};

function BookSynopsis({
  title, desc, imageURL, bookshopURL, readAloudURL, educatorURLs, identityTags, raceEthnicity,
  genre, themesLessons, religion, ageMin, ageMax, gradeMin, gradeMax, authors,
  illustrators, bookType, datePublished,
}) {
  const [seeMore, setSeeMore] = useState(true);
  const toggleSeeMore = () => setSeeMore(!seeMore);

  const gradeRange = createGradeRange(gradeMin, gradeMax);
  const ageRange = createAgeRange(ageMin, ageMax);

  const tags = createTags(identityTags, raceEthnicity, genre, themesLessons, religion);

  // Process date_published
  const publishDate = processDate(datePublished);

  /*
    For now, name educator links with arbitrary number, ask designers how to proceed
  */
  const educatorLinks = educatorURLs.map((url, index) => (
    <LinkUI
      sx={styles.linkUI}
      href={url}
      key={url}
      rel="noreferrer"
      target="_blank"
    >
      {`Educator Guide #${index}`}
    </LinkUI>
  ));

  const authorLinks = authors.map((author, i) => {
    // Add comment to links unless it is the last
    const link = (i !== authors.length - 1) ? `${author.name}, ` : author.name;
    return (
      <span key={author.id}>
        <Link style={styles.link} to={`/creator/${author.id}`}>
          {link}
        </Link>
      </span>
    );
  });

  const illustratorLinks = illustrators.map((illustrator, i) => {
    const link = (i !== illustrators.length - 1) ? `${illustrator.name}, ` : illustrator.name;
    return (
      <span key={illustrator.id}>
        <Link style={styles.link} to={`/creator/${illustrator.id}`}>
          {link}
        </Link>
      </span>
    );
  });

  return (
    <Box sx={styles.synopsis}>
      <Box sx={styles.topDownContainer}>
        <Box
          component="img"
          sx={styles.bookCover}
          alt={`Book cover for ${title}`}
          src={imageURL}
        />
        <Typography sx={styles.tagHeader}>Tags</Typography>
        <Box sx={styles.tagContainer}>
          {tags}
        </Box>
      </Box>

      <Card sx={styles.description}>
        <CardContent>
          <Box>
            <Typography sx={styles.bookTitle}>{title}</Typography>
          </Box>

          <Box variant="body2">
            {
              (desc.length > 525) ? (
                <Box>
                  <Typography sx={styles.text}>
                    {
                      (seeMore) ? `${desc.substring(0, 525)}...` : desc
                    }
                  </Typography>
                  <Box sx={styles.seeMoreContainer} onClick={toggleSeeMore}>
                    <Typography sx={styles.seeMoreText}>
                      { (seeMore) ? 'See More' : 'See Less'}
                    </Typography>
                    { (seeMore) ? <KeyboardArrowDown sx={styles.seeMoreIcon} />
                      : <KeyboardArrowUp sx={styles.seeMoreIcon} />}
                  </Box>
                </Box>
              ) : <Typography sx={styles.text}>{desc}</Typography>
            }
          </Box>
        </CardContent>
      </Card>
      <div>
        <Card sx={styles.sideCard}>
          <CardContent>
            <Box sx={styles.sideCardContainer}>
              <Typography sx={styles.sideCardTitle}>About This Book</Typography>
              <Box sx={styles.sideCardLinkContainer}>
                <Typography sx={styles.creator}> Written by:&nbsp;&nbsp;</Typography>
                {authorLinks}
                <br />
                <Typography sx={styles.creator}> Illustrated by:&nbsp;&nbsp;</Typography>
                {illustratorLinks}
              </Box>
              <div style={styles.blockContainer}>
                <div style={styles.block}>
                  <Typography sx={styles.bolded}>
                    {ageRange}
                  </Typography>
                  <p style={styles.sub}>Age Range</p>
                </div>
                {
                    (gradeMin || gradeMax) ? (
                      <div style={styles.block}>
                        <Box sx={styles.bolded}>
                          {gradeRange}
                          {' '}
                        </Box>
                        <p style={styles.sub}>Reading Level</p>
                      </div>
                    ) : <div style={styles.block} />
                }
                {
                  (bookType) ? (
                    <div style={styles.block}>
                      <Box sx={styles.bolded}>
                        {bookType}
                        {' '}
                      </Box>
                      <p style={styles.sub}>Book Format</p>
                    </div>
                  ) : <div style={styles.block} />
                }
                {
                  (datePublished) ? (
                    <div style={styles.block}>
                      <Box sx={styles.bolded}>
                        {`${publishDate[1]} ${publishDate[2]}, ${publishDate[3]}`}
                        {' '}
                      </Box>
                      <p style={styles.sub}>Date Published</p>
                    </div>
                  ) : <div style={styles.block} />
                }
              </div>
              {
                (bookshopURL) && (
                  <Button
                    sx={styles.bookshop}
                    endIcon={<Away />}
                    size="large"
                    href={bookshopURL}
                    target="_blank"
                  >
                    Buy from Bookshop.org
                  </Button>
                )
              }
            </Box>
          </CardContent>
        </Card>
        <Card sx={styles.sideCard}>
          <CardContent>
            <Box sx={styles.sideCardContainer}>
              <Typography sx={styles.sideCardTitle}>Additional Resources</Typography>
              <Box sx={styles.sideCardLinkContainer}>
                { (readAloudURL) && (
                <LinkUI sx={styles.linkUI} href={readAloudURL} rel="noreferrer" target="_blank">
                  Story Read Aloud
                </LinkUI>
                ) }
                {educatorLinks}
              </Box>
            </Box>
          </CardContent>
        </Card>
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
