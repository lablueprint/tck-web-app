import React from 'react';
import './App.css';
import MultSelectElem from './Components/Filtering/Multiselect';
// import Checkboxes from './Components/Filtering/Multiselect';
// import MultiselectComponent from './Components/Filtering/MultiSelectComponent';
const filters = [
  {
    filterName: 'Ethnicity',
    filterOptions: ['Black/African American', 'White', 'Asian', 'Hawaiian/Pacific Islander', 'Hispanic',
      'American Indian/Alaska Native'],
  },
  {
    filterName: 'Religion',
    filterOptions: ['Christian', 'Muslim', 'Hindu', 'Jewish', 'Atheist'],
  },
  {
    filterName: 'Gender',
    filterOptions: ['Male', 'Female', 'Nonbinary', 'Other'],
  },
];
function App() {
  return (
    <div>
      <MultSelectElem filters={filters} />
    </div>
  );
}

export default App;
