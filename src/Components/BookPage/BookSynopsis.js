/* eslint-disable */
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
    minWidth: '30vw',

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
  },
  block: {
    fontFamily: 'DM Sans',
    width: '45%',
    textAlign: 'left',
    flex: 'none',
    order: '1',
    flexGrow: '0',

  },
  sub: {
    lineHeight: '1.5em',
    color: '#656565',
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
  { // blue
    color: '#004A90',
    backgroundColor: '#D0E6FB',
  },
  { // red
    color: '#A51717',
    backgroundColor: '#FFDFDF',
  },
  { // green
    color: '#006A63',
    backgroundColor: '#C1F0ED',
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
    gradeRange = gradeMax;
  } else if (!gradeMax) {
    // gradeMax not given
    gradeRange = gradeMin;
  } else if (gradeMin === '0 to Pre-K' && gradeMax.length < 5) {
    // 0 to Pre-K to short grade
    gradeRange = `0 to ${gradeMax}`;
  } else if (gradeMin === 'Kindergarten' && gradeMax.length < 5) {
    // Kindergarten to short grade
    gradeRange = `K - ${gradeMax}`;
  } else if (gradeMin === '0 to Pre-K' && gradeMax === 'Kindergarten') {
    // 0 to Pre-K to Kindergarten
    gradeRange = '0 to K';
  } else if (gradeMin === gradeMax) {
    // gradeMin same as gradeMax
    gradeRange = gradeMin;
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
    ageRange = 'All';
  } else if (ageMin === ageMax) {
    // Valid but equal ages
    ageRange = `Age ${ageMin}`;
  } else if (ageMin === -1) {
    // Bad ageMin
    ageRange = `0 - ${ageMax}`;
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

function BookSynopsis({
  title, authorName, authorID, illustratorName, illustratorID, desc, imageURL,
  bookshopURL, readAloudURL, identityTags, ageMin, ageMax, gradeMin, gradeMax,
}) {
  const [seeMore, setSeeMore] = useState(true);
  const toggleSeeMore = () => setSeeMore(!seeMore);

  const identityChips = identityTags.map((tag) => {
    /* Randomly select colors for identity tag
       This does not guarantee a variety of colors.
    */
    const rand = Math.floor(Math.random() * 3);
    const chipStyle = { ...chipColors[rand], ...styles.chip };
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

  const gradeRange = createGradeRange(gradeMin, gradeMax);
  const ageRange = createAgeRange(ageMin, ageMax);
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
          {identityChips}
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
                      : <KeyboardArrowUp sx={styles.seeMoreIcon}/>
                    }
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
                <Typography sx={styles.creator}> Written by: </Typography>
                {' '}
                <Link style={styles.link} to={`/creator/${authorID}`}>
                  {authorName}
                </Link>
                <br />
                <Typography sx={styles.creator}> Illustrated by: </Typography>
                {' '}
                <Link style={styles.link} to={`/creator/${illustratorID}`}>
                  {illustratorName}
                </Link>
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
                        <p style={styles.sub}>Grade level</p>
                      </div>
                    ) : <div />
                  }
              </div>
              {
                  (bookshopURL) ? (
                    <Button
                      sx={styles.bookshop}
                      endIcon={<Away />}
                      size="large"
                      href={bookshopURL}
                      target="_blank"
                    >
                      Buy from Bookshop.org
                    </Button>
                  ) : <div />
                }
            </Box>
          </CardContent>
        </Card>
        <Card sx={styles.sideCard}>
          <CardContent>
            <Box sx={styles.sideCardContainer}>
              <Typography sx={styles.sideCardTitle}>Additional Resources</Typography>
              <Box sx={styles.sideCardLinkContainer}>
                { (readAloudURL) ? (
                  <div>
                    <LinkUI sx={styles.linkUI} href={readAloudURL} rel="noreferrer" target="_blank">
                      Story Read Aloud
                    </LinkUI>
                  </div>
                ) : <div />}
                { (bookshopURL)
                  ? (
                    <div>
                      <LinkUI sx={styles.linkUI} href={bookshopURL} rel="noreferrer" target="_blank">
                        Educator Guide
                      </LinkUI>
                    </div>
                  ) : <div />}
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
  authorName: PropTypes.string,
  authorID: PropTypes.string,
  illustratorName: PropTypes.string,
  illustratorID: PropTypes.string,
  desc: PropTypes.string,
  imageURL: PropTypes.string,
  bookshopURL: PropTypes.string,
  readAloudURL: PropTypes.string,
  identityTags: PropTypes.arrayOf(PropTypes.string),
  ageMin: PropTypes.number,
  ageMax: PropTypes.number,
  gradeMin: PropTypes.string,
  gradeMax: PropTypes.string,

};

BookSynopsis.defaultProps = {
  title: 'Untitled Book',
  authorName: 'Unknown Author',
  authorID: '',
  illustratorName: 'Unknown Illustrator',
  illustratorID: '',
  desc: 'It\'s a good book. A great book, even. 📖',
  imageURL: Logo,
  bookshopURL: '',
  readAloudURL: '',
  identityTags: [],
  ageMin: -1,
  ageMax: -1,
  gradeMin: '',
  gradeMax: '',
};

/** TO-DO:
 *  2. Educator URL
 *      ??? newline separated strings
 *          how to display??
 *          where da design?!?!?!?!111
 *  4. Add Books Like This
 *
 */
