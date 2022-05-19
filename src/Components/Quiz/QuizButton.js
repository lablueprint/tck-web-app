import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

export default function QuizButton({ /* imageSource */buttonCaption, onClick }) {
  return (
    <div
      style={{ padding: '3em', background: '#FCFCFC', border: '#D7D7D7' }}
    >
      <Checkbox onChange={(event) => {
        // setChecked((prevValue) => !prevValue);
        onClick(buttonCaption, event.target.checked);
      }}
      />
      {buttonCaption}
    </div>
  );
}
QuizButton.propTypes = {
  buttonCaption: PropTypes.string.isRequired,
  // setChecked: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  // imageSource: PropTypes.string.isRequired,
};
