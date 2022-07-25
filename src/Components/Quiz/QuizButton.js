import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import './QuizButton.css';

export default function QuizButton({
  buttonCaption, onClick, desiredArray, desiredLabel,
}) {
  const [checked, setChecked] = useState(false);
  // const [iconOneColor, setIconOneColor] = useState('white');
  // const [iconTwoColor, setIconTwoColor] = useState('white');
  const [clicked, setClicked] = useState(false);
  // const changeColor = () => {
  //   setIconOneColor('#393EBA');
  //   // setIconTwoColor('#FFFFFF');
  // };
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
      }}
      onClick={() => {
        setChecked((old) => !old);
        setClicked(true);
        // changeColor();
      }}
    >
      <Checkbox
        style={{
          color: '#393EBA',
        }}
        sx={{ position: 'relative', bottom: '15px' }}
        onChange={(event) => {
          onClick(desiredLabel, event.target.checked);
        }}
        checked={desiredArray.indexOf(desiredLabel) > -1 || checked}
      />
      <p style={{
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
