import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import './QuizButton.css';

export default function QuizButton({
  buttonCaption, onClick, desiredArray, desiredLabel,
}) {
  const [checked, setChecked] = useState(false);
  const [clicked, setClicked] = useState(false);
  return (
    <Button
      class="QuizButton"
      disableRipple
      style={clicked ? {
        padding: '2em 0.5em 2em 0.5em',
        margin: '1em auto 1em auto',
        width: '300px',
        height: '100.59px',
        borderRadius: '30px',
        border: '2.5px solid #D7D7D7',
        background: '#ffffff',
        display: 'flex',
        backgroundColor: '#393EBA',
        color: '#393EBA',
        '@media (max-width: 1295px)': {
          maxWidth: '100px',
          flexDirection: 'row',
          padding: '1rem 5rem',
          justifyContent: 'space-between',
          fontSize: '1.5rem',
          margin: '1rem 0',
          height: '9rem',
          borderRadius: '30',
          width: '95%',
        },
      } : {
        padding: '2em 0.5em 2em 0.5em',
        margin: '1em auto 1em auto',
        width: '300px',
        height: '100.59px',
        borderRadius: '30px',
        border: '2.5px solid #D7D7D7',
        background: '#ffffff',
        display: 'flex',
        backgroundColor: 'white',
        color: '#FFFFFF',
        '@media (max-width: 1295px)': {
          flexDirection: 'row',
          padding: '1rem 5rem',
          justifyContent: 'space-between',
          fontSize: '1.5rem',
          margin: '1rem 0',
          height: '9rem',
          borderRadius: '30',
          width: '95%',
          maxWidth: '100px',
        },
      }}
      onClick={() => {
        setChecked((old) => !old);
        setClicked(!clicked);
        // changeColor();
      }}
    >
      <Checkbox
        style={clicked ? { color: '#393EBA' } : { color: '#444444' }}
        sx={{ position: 'relative', bottom: '15px' }}
        onChange={(event) => {
          onClick(desiredLabel, event.target.checked);
        }}
        checked={desiredArray.indexOf(desiredLabel) > -1 || checked || clicked}
      />
      <p style={clicked ? {
        textTransform: 'none', color: '#FFFFFF', fontFamily: 'DM Sans', fontWeight: 'bold', flex: '0 0 75%', justifyContent: 'center',
      } : {
        textTransform: 'none', color: '#444444', fontFamily: 'DM Sans', fontWeight: 'bold', flex: '0 0 75%', justifyContent: 'center',
      }}
      >
        {buttonCaption}
      </p>
    </Button>
  );
}
QuizButton.propTypes = {
  buttonCaption: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  desiredArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  desiredLabel: PropTypes.string.isRequired,
};
