import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Card, CardActions, Box, CardContent, CardMedia, Button, Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const styles = {
  root: {
    width: '40%',
    padding: 10,
  },
  card: {
    backgroundColor: '#FAFAFA',
    padding: 6,
    boxShadow: 'none',
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
    paddingBottom: 1,
    paddingTop: 1.5,
  },
  cardImage: {
    width: 'auto',
    borderRadius: '15px',
    maxWidth: '100%',
  },
  bigText: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    lineHeight: '35px',
    fontWeight: 600,
    fontSize: '27px',
    color: '#333333',
  },
  mediumText: {
    fontFamily: 'Work Sans',
    fontWeight: 500,
    fontSize: '21px',
    lineHeight: '35px',
    color: '#333333',
  },
  leftText: {
    paddingTop: 0.5,
    paddingBottom: 0.5,
    textAlign: 'left',
    fontFamily: 'DM Sans',
    fontStyle: 'normal',
    fontWeight: 350,
    fontSize: '14px',
  },
  seeMoreText: {
    fontFamily: 'DM Sans',
    fontWeight: 700,
    fontSize: '14px',
    color: '#0068C9',
    paddingTop: 1,
    '&:hover': {
      color: '#669afa',
      cursor: 'pointer',
    },
  },
  seeMoreIcon: {
    fontSize: '16px',
    color: '#0068C9',
    paddingTop: 1,
    paddingLeft: 0.25,
    '&:hover': {
      color: '#669afa',
      cursor: 'pointer',
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
  },
};

export default function CreatorInfoCard({
  creatorName, creatorBio, creatorWebsite, creatorImage,
}) {
  const [seeMore, setSeeMore] = useState(true);
  const toggleSeeSetMore = () => setSeeMore(!seeMore);
  const redirectToWebsite = (e) => {
    e.preventDefault();
    window.location.href = creatorWebsite;
  };
  return (
    <Box sx={styles.root}>
      <Card sx={styles.card}>
        <Box sx={styles.centeredContainer}>
          {creatorImage !== '' && (
          <CardMedia
            component="img"
            image={creatorImage}
            alt="Creator Picture"
            sx={styles.cardImage}
          />
          )}
        </Box>
        <CardContent>
          <Box sx={styles.topTextBox}>
            <Typography variant="h5" sx={styles.bigText}>
              {creatorName}
            </Typography>
            <Typography sx={styles.mediumText}> &nbsp;|&nbsp; </Typography>
            <Typography sx={styles.mediumText}> Author </Typography>
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
  creatorImage: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
