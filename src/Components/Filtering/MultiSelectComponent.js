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
      console.log(input[label].splice(input[label].indexOf(value), 1));
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
  filterOptions: PropTypes.arrayOf.isRequired,
  input: PropTypes.shape({
    Ethnicity: PropTypes.arrayOf.isRequired,
    Religion: PropTypes.arrayOf.isRequired,
    Gender: PropTypes.arrayOf.isRequired,
    Sexuality: PropTypes.arrayOf.isRequired,
  }),
  setInput: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
};
