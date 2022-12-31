/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Link } from '@mui/material';
import NoResultsPicture from '../../Assets/Images/no-results.png';
import { useNavigate } from 'react-router-dom';


const styles = {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sorryText: {
      textAlign: 'left',
      fontFamily: 'Work Sans',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '45px',
      color: '#000000',
    },
    blurbText: {
      textAlign: 'left',
      fontFamily: 'DM Sans',
      fontWeight: 400,
      fontSize: '18px',
      color: '#3E3E3E',
      paddingTop: 3,
      paddingBottom: 2,
    },
    contactBlurbText: {
      textAlign: 'left',
      fontFamily: 'DM Sans',
      fontWeight: 400,
      fontSize: '18px',
      color: '#3E3E3E',
      paddingTop: 3,
    },
    linkText: {
      textAlign: 'left',
      fontFamily: 'DM Sans',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '18px',
      color: '#4245EE',
      '&:hover': {
        cursor: 'pointer',
        color: '#5C5FFF',
      },
    },
    linkBox: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 1,
    },
    columnBox: {
      width: '90%',
      display: 'flex',
      flexDirectoon: 'column',
      alignItems: 'center',
    },
    contactEmail: {
      textAlign: 'left',
      fontFamily: 'DM Sans',
      fontWeight: 400,
      fontSize: '18px',
      color: '#4245EE',
      paddingTop: 3,
      '&:hover': {
        cursor: 'pointer',
        color: '#5C5FFF',
      },
    },
    noResultsPicture: {
      height: '50%',
      width: '50%',
    },
  };

export default function NoResults() {
  const navigate = useNavigate();

  const redirectToRequestForm = (e) => {
    e.preventDefault();
    window.location.href = 'https://airtable.com/shrDHScpHXB2Sm8qc';
  };
  const onResetSearchText = () => {
    navigate('/browser');
  };
  return (
    <Box sx={styles.root}>
      <Box sx={styles.columnBox}>
        <Box>
          <Typography sx={styles.sorryText}>Sorry!</Typography>
          <Typography sx={styles.blurbText}>Unfortunately, your search did not return any results. Try simplifying your filters, fixing the punctuation, or searching one keyword at a time.  If you can’t find books that represent your identity, submit a request below!</Typography>
          <Box sx={styles.linkBox} onClick={redirectToRequestForm}>
            <Typography sx={styles.linkText}>Request More Representation</Typography>
          </Box>
          <Box sx={styles.linkBox}>
            <Typography sx={styles.linkText} onClick={onResetSearchText}>Reset Search</Typography>
          </Box>
            <Typography sx={styles.contactBlurbText}>If you'd like to contact TCK, email <Link sx={styles.contactEmail} href={`mailto:contacttheconsciouskid@gmail.com`}> contacttheconsciouskid@gmail.com </Link></Typography>
        </Box>
        <Box
          component="img"
          sx={styles.noResultsPicture}
          alt="No Results Picture"
          src={NoResultsPicture}
        />
      </Box>
    </Box>
  );
}