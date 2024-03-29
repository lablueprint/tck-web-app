import React, { useState, useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import QuizButton from './QuizButton';
import { MetadataContext } from '../../Contexts';

export default function Quiz7Adult({
  bookFilters, setBookFilters, dispatch,
}) {
  const { metadata } = useContext(MetadataContext);
  const [filters, setFilters] = useState([]);

  const getFilters = () => {
    const raceMetadata = metadata.find((el) => el.fields.name === 'book_type');
    if (raceMetadata) setFilters(raceMetadata.fields.options.split(',').map((element) => element.trim()));
  };

  useEffect(getFilters, [metadata]);

  function HandleClick(name, checked) {
    if (checked) {
      setBookFilters((prevValue) => (
        { ...prevValue, book_type: prevValue.book_type.concat(name) }));
    } else {
      setBookFilters((prevValue) => {
        const index = prevValue.book_type.indexOf(name);
        prevValue.book_type.splice(index, 1);
        return { ...prevValue, book_type: prevValue.book_type };
      });
    }
  }

  const handleBack = () => dispatch({ type: 'parent back' });
  const handleForward = () => dispatch({ type: 'parent' });

  return (
    <div className="quiz-container">
      <h1 className="quiz-header">
        Please select your preferred book formats
      </h1>
      <p className="quiz-caption">These will be used to rank your results but availability is not guaranteed!</p>
      {bookFilters.book_type !== undefined && (
        <div className="quiz-check-button-box">
          {filters.map((option) => (
            <QuizButton
              desiredLabel={option}
              buttonCaption={option}
              key={option}
              onClick={(name, checked) => HandleClick(name, checked)}
              desiredArray={bookFilters.book_type}
            />
          ))}
        </div>
      )}
      <ProgressBar
        progress={100}
        onBack={handleBack}
        onForward={handleForward}
        lastStep
      />
    </div>
  );
}
Quiz7Adult.propTypes = {
  setBookFilters: propTypes.func.isRequired,
  bookFilters: propTypes.shape({
    bookId: propTypes.string.isRequired,
    'race/ethnicity': propTypes.arrayOf(propTypes.string).isRequired,
    minAge: propTypes.number.isRequired,
    maxAge: propTypes.number.isRequired,
    minGrade: propTypes.number.isRequired,
    maxGrade: propTypes.number.isRequired,
    genre: propTypes.arrayOf(propTypes.string).isRequired,
    book_type: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
};
