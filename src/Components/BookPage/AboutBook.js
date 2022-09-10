import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Card, CardContent, Typography, Button, Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { CallMade as Away } from '@mui/icons-material';

const styles = {
  sideCardContainer: {
    margin: 'auto 1vw auto 1vw',
  },
  sideCard: {
    borderRadius: '1.31em',
    marginBottom: '4vh',
    background: '#FDFDFD',
    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.05)',
    border: '0.5px solid #E8E8E8',
    minWidth: '18vw',
    '@media (max-width: 1440px)': {
      minWidth: '22vw',
    },
    '@media (max-width: 960px)': {
      width: '85%',
      margin: 'auto',
      marginBottom: '2vh',
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
    '@media (max-width: 1440px)': {
      maxWidth: '22vw',
    },
    '@media (max-width: 960px)': {
      maxWidth: '100%',
    },
  },
  creator: {
    display: 'inline',
    fontFamily: 'DM Sans',
    color: '#5A5A5A',
    lineHeight: '1.3em',
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
    '& ::after': {
      content: '',
      flex: 'auto',
    },
    display: 'flex',
    flexDirection: 'row',
    marginTop: '4vh',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  block: {
    fontFamily: 'DM Sans',
    width: '50%',
    textAlign: 'left',
    order: '1',
    flexGrow: '0',
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
    textTransform: 'none',
    borderRadius: '10px',
    paddingTop: '1vh',
    paddingBottom: '1vh',
    padding: '1vh 2vw 1vh 2w',
    '&:hover': {
      color: '#FFFFFF',
      background: '#3477DE',
    },
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
};

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

function AboutBook({
  authors, illustrators, ageMin, ageMax, gradeMin, gradeMax,
  bookType, datePublished, bookshopURL,
}) {
  const gradeRange = createGradeRange(gradeMin, gradeMax);
  const ageRange = createAgeRange(ageMin, ageMax);

  // Process date_published
  const publishDate = processDate(datePublished);

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
                        <p style={styles.sub}>Grade Level</p>
                      </div>
                    ) : <div style={styles.block} />
                }
            {
                  (bookType.length) ? (
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
  );
}

AboutBook.propTypes = {
  bookshopURL: PropTypes.string,
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

AboutBook.defaultProps = {
  bookshopURL: '',
  ageMin: -1,
  ageMax: -1,
  gradeMin: '',
  gradeMax: '',
  authors: [],
  illustrators: [],
  bookType: [],
  datePublished: '',
};

export default AboutBook;
