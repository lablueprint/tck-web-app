import React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

export default function QuizButton({ imageSource, buttonCaption }) {
  return (
    <Button sx={{ m: 7 }} size="large" variant="outlined" src={imageSource}>
      <Checkbox />
      {buttonCaption}
    </Button>
  );
}
QuizButton.propTypes = {
  buttonCaption: PropTypes.string.isRequired,
  imageSource: PropTypes.string.isRequired,
};
