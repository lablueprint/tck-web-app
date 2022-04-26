import React from 'react';
import propTypes from 'prop-types';
import RangeFilterCard from './RangeFilterCard';

export const gradeRangeMetadata = ['0 to Pre-K', 'Kindergarten', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
export const ageRangeMetadata = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export function RangeFilter({ rangeFilterData, setRangeFilterData }) {
  const HandleChange = (name, newValue) => {
    if (name === 'Age-min') {
      setRangeFilterData((prevValue) => (
        { ...prevValue, age: { min: newValue, max: prevValue.age.max } }
      ));
    } else if (name === 'Age-max') {
      setRangeFilterData((prevValue) => (
        { ...prevValue, age: { max: newValue, min: prevValue.age.min } }
      ));
    } else if (name === 'Grade-min') {
      setRangeFilterData((prevValue) => (
        { ...prevValue, grade: { min: newValue, max: prevValue.grade.max } }
      ));
    } else if (name === 'Grade-max') {
      setRangeFilterData((prevValue) => (
        { ...prevValue, grade: { max: newValue, min: prevValue.grade.min } }
      ));
    }
  };
  return (
    <div>

      <RangeFilterCard filterTitle="Grade" data={rangeFilterData} optionsArray={gradeRangeMetadata} handleChange={HandleChange} />

      <RangeFilterCard filterTitle="Age" data={rangeFilterData} optionsArray={ageRangeMetadata} handleChange={HandleChange} />

    </div>
  );
}

RangeFilter.propTypes = {
  setRangeFilterData: propTypes.func.isRequired,
  rangeFilterData: propTypes.shape(
    {
      age: propTypes.shape({ min: propTypes.string.isRequired, max: propTypes.string.isRequired }),
      grade: propTypes.shape({ min: propTypes.string.isRequired, max: propTypes.string }),
    },
  ).isRequired,
};
// export RangeFilter;
