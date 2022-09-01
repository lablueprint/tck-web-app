import React from 'react';
import propTypes from 'prop-types';
import {
  Button,
} from '@mui/material';
import './QuizGroup.css';

export default function AvatarButton({
  caption,
  icon,
  handleToggle,
}) {
  return (
    <Button
      className="button"
      sx={{
        border: '2.5px solid #D7D7D7',
        borderRadius: '21px',
        background: '#ffffff',
        fontFamily: 'DM Sans',
        fontWeight: 'bold',
        color: '#444444',
        textTransform: 'capitalize',

        '&.MuiButtonBase-root:hover': {
          bgcolor: '#EAF3FE',
          color: '#393EBA',
          borderColor: '#393EBA',
        },
        '& .MuiButton-startIcon': {
          marginRight: '0',
        },
        '@media (max-width: 680px)': {
          flexDirection: 'row',
          padding: '1rem 5rem',
          justifyContent: 'space-between',
          fontSize: '1.5rem',
          margin: '1rem 0',
          height: '9rem',
          borderRadius: '30',
          width: '95%',
        },
      }}
      onClick={handleToggle}
      variant="outlined"
      startIcon={icon}
    >
      {caption}
    </Button>

  );
}

AvatarButton.propTypes = {
  caption: propTypes.string.isRequired,
  icon: propTypes.element.isRequired,
  handleToggle: propTypes.func.isRequired,
};
