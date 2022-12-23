import React from 'react';
import propTypes from 'prop-types';
import {
  Button,
} from '@mui/material';
import './QuizGroup.css';

const styles = {
  button: {
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
    },
    '@media (max-width: 750px)': {
      flexDirection: 'row',
      padding: '1rem 4rem 1rem 3rem',
      justifyContent: 'space-between',
      fontSize: '1.2rem',
      height: '8.5rem',
      borderRadius: '30',
      width: '92%',
    },
  },
};

export default function AvatarButton({
  caption,
  icon,
  handleToggle,
}) {
  return (
    <Button
      className="avatar-button"
      sx={styles.button}
      startIcon={icon}
      onClick={handleToggle}
    >
      <p>
        {caption}
      </p>
    </Button>

  );
}

AvatarButton.propTypes = {
  caption: propTypes.string.isRequired,
  icon: propTypes.element.isRequired,
  handleToggle: propTypes.func.isRequired,
};
