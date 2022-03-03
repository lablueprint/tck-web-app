import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

export default function MultiselectComponent({
  filterOptions, input, setInput, labelName,
}) {
  // const [checked, setChecked] = useState({});
  // useEffect(() => {
  //   filterOptions.map((option) => setChecked({ ...checked, [option]: false }));
  // }, []);

  const handleToggle = (value, label, checked) => {
    if (checked) {
      setInput({ ...input, [label]: input[label].concat(value) });
    } else {
      setInput({ ...input, [label]: input[label].filter((element) => element !== value) });
    }
  };

  return filterOptions.map((item) => (
    <FormControlLabel
      control={(
        <Checkbox
          checked={input[labelName].indexOf(item) !== -1}
          onChange={(event) => handleToggle(
            item,
            labelName,
            event.target.checked,
          )}
        />
)}
      label={item}
    />
  ));
}

MultiselectComponent.propTypes = {
  filterOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  input: PropTypes.shape({
    Ethnicity: PropTypes.arrayOf(PropTypes.string).isRequired,
    Religion: PropTypes.arrayOf(PropTypes.string).isRequired,
    Gender: PropTypes.arrayOf(PropTypes.string).isRequired,
    Sexuality: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setInput: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
};
