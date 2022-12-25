import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ProgressBar from './ProgressBar2';
import QuizButton from './QuizButton';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function Quiz3({
  setBookFilters, bookFilters,
  dispatch, isAdult,
}) {
  const [filters, setFilters] = useState([]);
  let filterVar;

  const getFilters = () => {
    base('Book Tag Metadata').select({
      filterByFormula: `IF(FIND("${'race/ethnicity'}", name) !=0, options, '')`,
      view: 'Grid view',
    }).all()
      .then((records) => {
        filterVar = records[0].fields.options.split(',').map((element) => element.trim());
        setFilters(filterVar);
      });
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

  useEffect(getFilters, []);

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
