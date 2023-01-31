import React from 'react';
import propTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import QuizButton from './QuizButton';

export default function Quiz6({
  title, setBookFilters, bookFilters, dispatch,
  progress, buttonCaptions, buttonValues, isAdult,
  isLastStep, hasLargeButtons,
}) {
  function HandleClick(name, checked) {
    if (checked) {
      setBookFilters((prevValue) => ({ ...prevValue, genre: prevValue.genre.concat(name) }));
    } else {
      setBookFilters((prevValue) => {
        const index = prevValue.genre.indexOf(name);
        prevValue.genre.splice(index, 1);
        return { ...prevValue, genre: prevValue.genre };
      });
    }
  }

  const handleBack = () => ((isAdult) ? dispatch({ type: 'parent back' }) : dispatch({ type: 'child back' }));

  const handleForward = () => ((isAdult) ? dispatch({ type: 'parent' }) : dispatch({ type: 'child' }));

  return (
    <div className="quiz-container">
      <h1 className="quiz-header">
        {title}
      </h1>
      <p className="quiz-caption">You can choose more than one.</p>
      {bookFilters.genre !== undefined && (
      <div className="quiz-check-button-box">
        {buttonCaptions.map((option, index) => (
          <QuizButton
            buttonCaption={option}
            desiredLabel={buttonValues[index]}
            desiredArray={bookFilters.genre}
            key={option}
            onClick={(name, checked) => HandleClick(name, checked)}
            large={hasLargeButtons}
          />
        ))}
      </div>
      )}
      <ProgressBar
        progress={progress}
        onBack={handleBack}
        onForward={handleForward}
        lastStep={isLastStep}
      />
    </div>

  );
}
Quiz6.propTypes = {
  title: propTypes.string.isRequired,
  buttonCaptions: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
  buttonValues: propTypes.arrayOf(propTypes.string.isRequired).isRequired,

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
  progress: propTypes.number.isRequired,
  isAdult: propTypes.bool,
  isLastStep: propTypes.bool,
  hasLargeButtons: propTypes.bool,
};

Quiz6.defaultProps = {
  isAdult: false,
  isLastStep: false,
  hasLargeButtons: false,
};
