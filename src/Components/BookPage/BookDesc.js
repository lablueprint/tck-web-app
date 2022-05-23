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
  text: {
    fontFamily: 'DM Sans',
    marginTop: '2vh',
    lineHeight: '1.3em',
    color: '#4C4C4C',
    fontWeight: '400',
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

function BookDesc({
  title, desc,
}) {
  const [seeMore, setSeeMore] = useState(true);
  const toggleSeeMore = () => setSeeMore(!seeMore);

  return (
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
  );
}

BookDesc.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

BookDesc.defaultProps = {
  title: 'Untitled Book',
  desc: 'It\'s a book. with words. **gasp**',
};

export default BookDesc;
