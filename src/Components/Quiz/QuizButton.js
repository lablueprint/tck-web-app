import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

const styles = {
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2em 0.5em 2em 0.5em',
    borderRadius: '20px',
    fontSize: '1rem',
  },
  smallButton: {
    width: '250px',
    height: '100.59px',
    '@media (max-width: 750px)': {
      width: '200px',
    },
  },
  largeButton: {
    width: '400px',
    height: '100.59px',
    '@media (max-width: 750px)': {
      width: '100%',
    },
  },
  checkedButton: {
    border: '2.5px solid',
    borderColor: '#393EBA',
    background: '#393EBA',
    backgroundColor: '#393EBA',
    color: 'white',

    '&.MuiButtonBase-root:hover': {
      backgroundColor: '#EAF3FE',
      color: '#393EBA',
      borderColor: '#393EBA',
    },
  },

  uncheckedButton: {
    border: '2.5px solid',
    borderColor: '#D7D7D7',
    background: '#ffffff',
    backgroundColor: 'white',
    color: '#444444',

    '&.MuiButtonBase-root:hover': {
      backgroundColor: '#EAF3FE',
      color: '#393EBA',
      borderColor: '#393EBA',
    },
  },

  checkbox: {
    position: 'relative',
    bottom: '30px',
    right: '10px',
  },

  uncheckedCheckbox: {
    color: 'inherit',
  },

  checkedCheckbox: {
    color: 'inherit',
    '&.MuiCheckbox-root:hover': {
      color: '#393EBA',
    },
  },

  buttonCaption: {
    textTransform: 'none',
    fontFamily: 'DM Sans',
    fontWeight: 'bold',
    flex: '1 0 75%',
    justifyContent: 'center',
  },
};

export default function QuizButton({
  buttonCaption, onClick, desiredArray, desiredLabel, large,
}) {
  const [checked, setChecked] = useState(false);

  const buttonColor = checked ? styles.checkedButton : styles.uncheckedButton;
  const buttonSize = large ? styles.largeButton : styles.smallButton;

  return (
    <Button
      disableRipple
      sx={[styles.button, buttonColor, buttonSize]}
      onClick={() => {
        setChecked((old) => !old);
      }}
    >
      <Checkbox
        sx={styles.checkbox}
        style={checked ? styles.checkedCheckbox : styles.uncheckedCheckbox}
        onChange={(event) => {
          onClick(desiredLabel, event.target.checked);
        }}
        checked={desiredArray.indexOf(desiredLabel) > -1 || checked}
        disableRipple
      />
      <p style={styles.buttonCaption}>
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
  large: PropTypes.bool,
};

QuizButton.defaultProps = {
  large: false,
};
