import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

const styles = {
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1.5em 0.5em',
    borderRadius: '20px',
    fontSize: '1rem',
  },
  smallButton: {
    width: '250px',
    height: '90px',
    '@media (max-width: 480px)': {
      width: '100%',
      height: '80px',
    },
  },
  largeButton: {
    width: '400px',
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
    position: 'absolute',
    top: '0',
    left: '0',
  },

  uncheckedCheckbox: {
    color: 'inherit',
  },

  checkedCheckbox: {
    color: 'inherit',
    '&.MuiCheckboxRoot:hover': {
      color: '#393EBA',
    },
  },

  buttonCaption: {
    textTransform: 'none',
    fontFamily: 'DM Sans',
    fontWeight: 'bold',
    justifyContent: 'center',
    width: '80%',
    margin: 'auto',
  },
};

export default function QuizButton({
  buttonCaption, onClick, desiredArray, desiredLabel, large,
}) {
  const [checked, setChecked] = useState(desiredArray.indexOf(desiredLabel) > -1);

  const buttonColor = checked ? styles.checkedButton : styles.uncheckedButton;
  const buttonSize = large ? styles.largeButton : styles.smallButton;

  const handleClick = () => {
    onClick(desiredLabel, !checked);
    setChecked((old) => !old);
  };

  return (
    <Button
      disableRipple
      sx={[styles.button, buttonColor, buttonSize]}
      onClick={handleClick}
    >
      <Checkbox
        sx={styles.checkbox}
        style={checked ? styles.checkedCheckbox : styles.uncheckedCheckbox}
        checked={checked}
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
