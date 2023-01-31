import React from 'react';
import propTypes from 'prop-types';
import {
  Button,
} from '@mui/material';
import './QuizGroup.css';

const styles = {
  button: {
    display: 'flex',
    flexDirection: 'column',
    border: '2.5px solid #D7D7D7',
    borderRadius: '21px',
    background: '#ffffff',
    fontFamily: 'DM Sans',
    fontWeight: 'bold',
    color: '#444444',
    textTransform: 'none',
    fontSize: '1.2rem',

    '&.MuiButtonBase-root:hover': {
      bgcolor: '#EAF3FE',
      color: '#393EBA',
      borderColor: '#393EBA',
    },
    '& .MuiButton-startIcon': {
      marginRight: '0',
      marginTop: '1.5rem',
    },
    '@media (max-width: 750px)': {
      flexDirection: 'row',
      padding: '1rem',
      justifyContent: 'space-between',
      fontSize: '1.2rem',
      minHeight: '8.5rem',
      height: 'min-content',
      borderRadius: '30',
      width: '92%',
      '& .MuiButton-startIcon': {
        marginTop: 0,
      },
    },
  },
  silly: {
    height: '325px',
    width: '175px',
  },
  notSilly: {
    height: '250px',
    width: '200px',
  },
  caption: {
    margin: 'auto',

  },
};

export default function AvatarButton({
  caption,
  icon,
  handleToggle,
  isSillyButton,
}) {
  const size = isSillyButton ? styles.silly : styles.notSilly;

  return (
    <Button
      sx={[styles.button, size]}
      startIcon={icon}
      onClick={handleToggle}
    >
      <p style={styles.caption}>
        {caption}
      </p>
    </Button>
  );
}

AvatarButton.propTypes = {
  caption: propTypes.string.isRequired,
  icon: propTypes.element.isRequired,
  handleToggle: propTypes.func.isRequired,
  isSillyButton: propTypes.bool,
};

AvatarButton.defaultProps = {
  isSillyButton: false,
};
