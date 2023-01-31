import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  Card, CardContent, Typography, Box,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const styles = {
  description: {
    minWidth: '27vw',
    textAlign: 'left',
    display: 'flex',
    margin: '1vh 2vw 1vh 2vw',
    boxShadow: 'none',
    background: 'none',
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
  mobileBookTitle: {
    display: 'inline',
    fontFamily: 'DM Sans',
    fontSize: '1.75em',
    fontWeight: '600',
    color: '#444444',

  },
  text: {
    fontFamily: 'DM Sans',
    marginTop: '2vh',
    lineHeight: '150%',
    color: '#4C4C4C',
    fontWeight: '400',
  },
  seeMoreContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  seeMoreText: {
    fontFamily: 'DM Sans',
    fontWeight: '700',
    fontSize: '0.875em',
    color: '#0068C9',
    paddingTop: '1vh',
    '&:hover': {
      color: '#669afa',
      cursor: 'pointer',
    },
  },
  seeMoreIcon: {
    fontSize: '1em',
    color: '#0068C9',
    paddingTop: '1vh',
    paddingLeft: '0.25',
    '&:hover': {
      color: '#669afa',
      cursor: 'pointer',
    },
  },
  summary: {
    fontSize: '1.325em',
    fontWeight: 600,
    color: '#020202',
    fontFamily: 'DM Sans',
    lineHeight: '0.5em',
    paddingTop: '1vh',
  },
};

function BookDesc({
  title, desc, isMobile,
}) {
  const [seeMore, setSeeMore] = useState(true);
  const toggleSeeMore = () => setSeeMore(!seeMore);

  const titleSection = (
    <Box>
      {(title) ? (
        <Typography sx={isMobile ? styles.mobileBookTitle : styles.bookTitle}>
          {title}
        </Typography>
      ) : (
        <Typography sx={styles.summary}>Summary</Typography>)}
    </Box>
  );

  const descSection = (desc && (
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
  ));

  return (
    <Card sx={styles.description}>
      <CardContent>
        {titleSection}
        {descSection}
      </CardContent>
    </Card>
  );
}

BookDesc.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  isMobile: PropTypes.bool,
};

// Default are empty stirngs
// so we can choose when to not display a title/desc
// Mainly due to new mobile design that reverse
// these two
BookDesc.defaultProps = {
  title: '',
  desc: '',
  isMobile: false,
};

export default BookDesc;
