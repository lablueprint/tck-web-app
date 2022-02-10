import React, { /* useState */ } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

export default function MultiselectComponent({ filterOptions }) {
  return filterOptions.map((item) => (
    <FormControlLabel
      control={<Checkbox />}
      label={item}
    />
  ));
}
MultiselectComponent.propTypes = {
  filterOptions: PropTypes.string.isRequired,
};
