import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  Card, CardActions, Box, CardContent, CardMedia, Button, Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const styles = {
  root: {
    width: '40%',
    padding: 8,
    '@media (max-width: 960px)': {
      width: '100%',
      padding: 0,
    },
  },
  card: {
    backgroundColor: '#FAFAFA',
    padding: 6,
    boxShadow: 'none',
    '@media (max-width: 960px)': {
      padding: 1,
    },
  },
  centeredContainer: {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
  },
  bioContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  seeMoreContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  leftBox: {
    display: 'flex',
    justifyContent: 'left',
    paddingBottom: 1,
  },
  topTextBox: {
    display: 'flex',
    justifyContent: 'left',
    paddingBottom: 1.5,
    paddingTop: 2,
    '@media (max-width: 960px)': {
      display: 'block',
      textAlign: 'left',
    },
  },
  cardImage: {
    width: 'auto',
    borderRadius: '15px',
    maxHeight: '250px',
    '@media (max-width: 960px)': {
      maxHeight: 'none',
      maxWidth: '90vw',
      margin: 'auto',
    },
  },
  bigText: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    lineHeight: '35px',
    fontWeight: 600,
    fontSize: '27px',
    color: '#333333',
    paddingTop: 3,
    '@media (max-width: 960px)': {
      paddingTop: 0,
      fontSize: '26px',
      lineHeight: '34px',
    },
  },
  mediumText: {
    fontFamily: 'Work Sans',
    fontWeight: 500,
    fontSize: '21px',
    lineHeight: '35px',
    color: '#333333',
    paddingTop: 3,
    '@media (max-width: 960px)': {
      paddingTop: 0,
      fontSize: '18px',
      lineHeight: '21px',
    },
  },
  leftText: {
    paddingTop: 0.5,
    paddingBottom: 0.5,
    textAlign: 'left',
    fontFamily: 'DM Sans',
    fontStyle: 'normal',
    fontWeight: 350,
    fontSize: '14px',
    '@media (max-width: 960px)': {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  seeMoreText: {
    fontFamily: 'DM Sans',
    fontWeight: 700,
    fontSize: '14px',
    color: '#0068C9',
    paddingTop: 2,
    paddingBottom: 2,
    '&:hover': {
      color: '#669afa',
      cursor: 'pointer',
    },
    '&:active': {
      color: '#0068C9',
    },
    '@media (max-width: 960px)': {
      fontSize: '16px',
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  seeMoreIcon: {
    fontSize: '16px',
    color: '#0068C9',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 0.25,
    '&:hover': {
      color: '#669afa',
      cursor: 'pointer',
    },
    '@media (max-width: 960px)': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  websiteButton: {
    textTransform: 'none',
    background: '#F79927',
    color: 'white',
    borderRadius: '14px',
    fontFamily: 'Work Sans',
    fontWeight: 600,
    fontSize: '14px',
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 1.25,
    paddingBottom: 1.25,
    '@media (max-width: 960px)': {
      fontSize: '18px',
      paddingLeft: 3.5,
      paddingRight: 3.5,
      paddingTop: 1.25,
      paddingBottom: 1.25,
    },
  },
};

export default function CreatorInfoCard({
  creatorName, creatorBio, creatorWebsite, creatorImage, creatorRole,
}) {
  const [seeMore, setSeeMore] = useState(true);
  const toggleSeeSetMore = () => setSeeMore(!seeMore);
  const redirectToWebsite = (e) => {
    e.preventDefault();
    window.location.href = creatorWebsite;
  };

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

  return (
    <Box sx={styles.root}>
      <Card sx={styles.card}>
        <CardContent>
          <Box>
            {creatorImage !== '' && (
            <CardMedia
              component="img"
              image={creatorImage}
              alt="Creator Picture"
              sx={styles.cardImage}
            />
            )}
          </Box>
          <Box sx={styles.topTextBox}>
            <Typography variant="h5" sx={styles.bigText}>
              {creatorName}
            </Typography>
            {
              !(isMobile) && <Typography sx={styles.mediumText}> &nbsp;|&nbsp; </Typography>
            }
            <Typography sx={styles.mediumText}>
              {creatorRole}
            </Typography>
          </Box>
          <Box sx={styles.leftBox}>
            {creatorBio.length < 250
              ? (
                <Typography sx={styles.leftText}>
                  {creatorBio}
                </Typography>
              )
              : (
                <Box sx={styles.bioContainer}>
                  <Typography sx={styles.leftText}>
                    {seeMore ? `${creatorBio.substring(0, 250)}...` : creatorBio}
                  </Typography>
                  <Box sx={styles.seeMoreContainer} onClick={toggleSeeSetMore}>
                    <Typography
                      sx={styles.seeMoreText}
                    >
                      {seeMore ? 'See More' : 'See Less'}
                    </Typography>
                    {seeMore ? <KeyboardArrowDownIcon sx={styles.seeMoreIcon} />
                      : <KeyboardArrowUpIcon sx={styles.seeMoreIcon} />}
                  </Box>
                </Box>
              )}
          </Box>
        </CardContent>
        <CardActions>
          {creatorWebsite && (
          <Button
            sx={styles.websiteButton}
            onClick={redirectToWebsite}
            size={isMobile ? 'large' : 'small'}
          >
            Website

          </Button>
          )}
        </CardActions>
      </Card>
    </Box>

  );
}

CreatorInfoCard.propTypes = {
  creatorName: PropTypes.string.isRequired,
  creatorBio: PropTypes.string.isRequired,
  creatorWebsite: PropTypes.string.isRequired,
  creatorImage: PropTypes.string.isRequired,
  creatorRole: PropTypes.string.isRequired,
};
