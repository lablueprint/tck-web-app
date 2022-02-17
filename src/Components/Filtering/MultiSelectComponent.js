import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

export default function MultiselectComponent({ filterOptions }) {
  const [checked, setChecked] = useState({});
  useEffect(() => {
    filterOptions.map((option) => setChecked({ ...checked, [option]: false }));
  }, []);

  const handleToggle = (value, name) => {
    const current = checked[name];
    setChecked({ ...checked, [name]: !current });
    setChecked(name.toLowerCase());
  };
  return filterOptions.map((item) => (
    <FormControlLabel
      control={<Checkbox onClick={(value) => handleToggle(value, item)} />}
      label={item}
    />
  ));
}
MultiselectComponent.propTypes = {
  filterOptions: PropTypes.string.isRequired,
};
