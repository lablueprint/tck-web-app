import React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

export default function QuizButton({ /* imageSource */ onChange, buttonCaption }) {
  return (
    <Button sx={{ m: 7 }} size="large" variant="outlined"/* src={imageSource} alt="MISSING IMAGE" */>
      <Checkbox onClick={onChange} />
      {buttonCaption}
    </Button>
  );
}
QuizButton.propTypes = {
  buttonCaption: PropTypes.string.isRequired,
  onChange: PropTypes.isRequired,
  // imageSource: PropTypes.string.isRequired,
};
