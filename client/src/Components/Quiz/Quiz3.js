import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import QuizButton from './QuizButton';
import { MetadataContext } from '../../Contexts';

export default function Quiz3({
  setBookFilters, bookFilters,
  dispatch, isAdult,
}) {
  const { metadata } = useContext(MetadataContext);
  const [filters, setFilters] = useState([]);

  const getFilters = () => {
    const raceMetadata = metadata.find((el) => el.fields.name === 'race/ethnicity');
    if (raceMetadata) setFilters(raceMetadata.fields.options.split(',').map((element) => element.trim()));
  };

  function HandleClick(name, checked) {
    if (checked) {
      setBookFilters((prevValue) => ({ ...prevValue, 'race/ethnicity': prevValue['race/ethnicity'].concat(name) }));
    } else {
      setBookFilters((prevValue) => {
        const index = prevValue['race/ethnicity'].indexOf(name);
        prevValue['race/ethnicity'].splice(index, 1);
        return { ...prevValue, 'race/ethnicity': prevValue['race/ethnicity'] };
      });
    }
  }

  useEffect(getFilters, [metadata]);

  const handleBack = () => ((isAdult) ? dispatch({ type: 'parent back' }) : dispatch({ type: 'child back' }));

  const handleForward = () => ((isAdult) ? dispatch({ type: 'parent' }) : dispatch({ type: 'child' }));

  return (
    <div className="quiz-container">
      <h1 className="quiz-header">
        {(isAdult) ? 'Which of these races/ethnicities do you want to see represented?'
          : 'Which of these races/ethnicities are you interested in reading about?'}
      </h1>
      <p className="quiz-caption">You can choose more than one.</p>
      {bookFilters['race/ethnicity'] !== undefined && (
        <div className="quiz-check-button-box">
          {filters.map((option) => (
            <QuizButton
              desiredLabel={option}
              buttonCaption={option}
              key={option}
              onClick={(name, checked) => HandleClick(name, checked)}
              desiredArray={bookFilters['race/ethnicity']}
            />
          ))}
        </div>
      )}
      <ProgressBar
        progress={40}
        onBack={handleBack}
        onForward={handleForward}
      />
    </div>
  );
}
Quiz3.propTypes = {
  dispatch: propTypes.func.isRequired,
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
  isAdult: propTypes.bool.isRequired,
};
