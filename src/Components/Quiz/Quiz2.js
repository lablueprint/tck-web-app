import React from 'react';
import propTypes from 'prop-types';
import ProgressBar from './ProgressBar2';
import GradeSlider from './GradeSlider';
import './QuizGroup.css';

export default function Quiz2({
  bookFilters, setBookFilters, dispatch, isAdult,
}) {
  const callback = (min, max) => {
    setBookFilters({ ...bookFilters, minGrade: min, maxGrade: max });
  };

  const handleBack = () => ((isAdult) ? dispatch({ type: 'parent back' }) : dispatch({ type: 'child back' }));

  const handleForward = () => ((isAdult) ? dispatch({ type: 'parent' }) : dispatch({ type: 'child' }));

  return (
    <div className="quiz-container">
      <h1 className="quiz-header">
        {(isAdult)
          ? 'What grade levels are you looking for?'
          : 'Which grade levels do you feel comfortable reading at?'}
      </h1>
      <GradeSlider parentCallback={callback} />
      <ProgressBar
        progress={17}
        onBack={handleBack}
        onForward={handleForward}
      />
    </div>
  );
}
Quiz2.propTypes = {
  setBookFilters: propTypes.func.isRequired,
  dispatch: propTypes.func.isRequired,
  isAdult: propTypes.bool.isRequired,
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
};
