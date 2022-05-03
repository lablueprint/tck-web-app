import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../../styles/fonts.css';

const styles = {
  root: {
    width: '40%',
  },
  card: {
    backgroundColor: '#FAFAFA',
    padding: 4,
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
  leftBox: {
    display: 'flex',
    justifyContent: 'left',
    paddingBottom: 1,
  },
  cardImage: {
    width: 'auto',
    borderRadius: '15px',
  },
  bigText: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    lineHeight: '35px',
    fontWeight: 600,
    fontSize: '28px',
    color: '#333333',
  },
  mediumText: {
    fontFamily: 'Work Sans',
    fontWeight: 500,
    fontSize: '22px',
    lineHeight: '35px',
    color: '#333333',
  },
  leftText: {
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

export default function AuthorInfoCard({
  authorName, authorBio, authorWebsite, authorImage,
}) {
  const [seeMore, setSeeMore] = useState(true);
  const toggleSeeSetMore = () => setSeeMore(!seeMore);
  const redirectToWebsite = (e) => {
    e.preventDefault();
    window.location.href = authorWebsite;
  };
  return (
    <Box sx={styles.root}>
      <Card sx={styles.card}>
        <Box sx={styles.centeredContainer}>
          <CardMedia
            component="img"
            image={authorImage}
            alt="Author Picture"
            sx={styles.cardImage}
          />
        </Box>
        <CardContent>
          <Box sx={styles.leftBox}>
            <Typography variant="h5" sx={styles.bigText}>
              {authorName}
            </Typography>
            <Typography sx={styles.mediumText}> &nbsp;|&nbsp; </Typography>
            <Typography sx={styles.mediumText}> Author </Typography>
          </Box>
          <Box sx={styles.leftBox}>
            {authorBio < 250
              ? (
                <Typography sx={styles.leftText}>
                  {authorBio}
                </Typography>
              )
              : (
                <Box sx={styles.bioContainer}>
                  <Typography sx={styles.leftText}>
                    {seeMore ? `${authorBio.substring(0, 250)}` : authorBio}
                  </Typography>
                  <Typography
                    sx={styles.seeMoreText}
                    onClick={toggleSeeSetMore}
                  >
                    {seeMore ? 'See More' : 'See Less'}
                  </Typography>
                </Box>
              )}
          </Box>
        </CardContent>
        <CardActions>
          <Button
            sx={styles.websiteButton}
            onClick={redirectToWebsite}
          >
            Website

          </Button>
        </CardActions>
      </Card>
    </Box>

  );
}

AuthorInfoCard.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorBio: PropTypes.string.isRequired,
  authorWebsite: PropTypes.string.isRequired,
  authorImage: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
