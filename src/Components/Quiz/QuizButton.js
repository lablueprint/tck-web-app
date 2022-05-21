import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

export default function QuizButton({ buttonCaption, onClick }) {
  return (
    <div
      style={{
        padding: '2em 0.5em 2em 0.5em', margin: '1em auto 1em auto', width: '300px', height: '56.59px', borderRadius: '30px', border: '2.5px solid #D7D7D7', background: '#ffffff', display: 'flex',
      }}
    >
      <Checkbox
        sx={{ position: 'relative', bottom: '35px' }}
        onChange={(event) => {
          // setChecked((prevValue) => !prevValue);
          onClick(buttonCaption, event.target.checked);
        }}
      />
      <p style={{
        fontFamily: 'DM Sans', fontWeight: 'bold', flex: '0 0 75%', justifyContent: 'center',
      }}
      >
        {buttonCaption}
      </p>
    </div>
  );
}
QuizButton.propTypes = {
  buttonCaption: PropTypes.string.isRequired,
  // setChecked: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  // imageSource: PropTypes.string.isRequired,
};
