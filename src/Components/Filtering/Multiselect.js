import React, { useState } from 'react';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

/* export default function MultiselectFilter({ onFilterChange, filterOptions }) {
  // const classes = useStyles();
  const [isChecked, setIsChecked] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  //Resets all filters to be unchecked when reset clicked
  const resetFilters = () => {
    const newChecked = [];
    onFilterChange(newChecked); // Pass empty [] back to markplace to reset filters
    setIsChecked(newChecked);
  };

  //Sets checkboxes to checked/unchecked when toggled
  const handleToggle = (value) => function () {
    const currentIndex = isChecked.indexOf(value);
    const newChecked = [...isChecked];

    if (currentIndex === -1) { // option not found, add to isChecked
      newChecked.push(value);
    } else { // option found, remove from isChecked
      newChecked.splice(currentIndex, 1);
    }

    onFilterChange(newChecked); // Pass new filters back to markplace to display
    setIsChecked(newChecked);

    return (
      <div>
        {//List of filter options only shows if expanded }
        <div>
          <div
            dense
            key={option}
            onClick={handleToggle(option)}
          >
            <div>
              <CheckBoxIcon />
            </div>
          </div>
        </div>
        {!isLast && <Divider variant="middle" />}
      </div>
    );
  };
} */
