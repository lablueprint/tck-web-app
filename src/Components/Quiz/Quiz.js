/* eslint-disable eqeqeq */
import React, { useEffect, useReducer, useState } from 'react';
import propTypes from 'prop-types';
import './QuizGroup.css';
import Quiz1 from './Quiz1';
import Quiz2 from './Quiz2';
import Quiz3 from './Quiz3';
import Quiz4Kid from './Quiz4Kid';
import Quiz5Kid from './Quiz5Kid';
import Quiz6 from './Quiz6';
import Quiz7Adult from './Quiz7Adult';

const seriousGenres = ['Autobiography', 'Non-fiction', 'Historical fiction', 'Memoir', 'Mystery', 'Poetry'];
const seriousGenreCaptions = ['The lives of interesting and influential people',
  'Fascinating facts about different topics such as nature, animals, or space',
  'Important events of the past that shaped the world we live in today',
  'A detailed retelling of a crucial period of time in an individual’s life',
  'The case of a mysterious, unnatural phenomenon', 'Stories with poetry'];

const funGenres = ['Adventure', 'Scary/Horror', 'Science fiction', 'Fantasy', 'Romance', 'Afrofuturism', 'Graphic Novel'];
const funGenreCaptions = ['Going on a journey to a new place with your friends',
  'Suspenseful events with plot twists that may shock you',
  'Going to outer space and exploring different planets',
  'Living in a magical world where you have powers',
  'Having a picnic with someone you really like',
  'Visiting an African realm with magic and advanced technology'];

// Diya: why do you set isChild/isParent each time?
function reducer(state, action) {
  switch (action.type) {
    case 'parent':
      return {
        ...state,
        isParent: true,
        isChild: false,
        count: state.count + 1,
      };
    case 'parent back':
      return {
        ...state,
        isParent: true,
        isChild: false,
        count: state.count - 1,
      };
    case 'child':
      return {
        ...state,
        isChild: true,
        isParent: false,
        count: state.count + 1,
      };
    case 'child back':
      return {
        ...state,
        isChild: true,
        isParent: false,
        count: state.count - 1,
      };
    default:
      throw new Error();
  }
}

// const issDisabled = (anArr) => (anArr.length === 0);

export default function Quiz({ bookFilters, setBookFilters, setIsChild }) {
  // state setup
  const initialState = {
    isParent: false,
    isChild: false,
    count: 1,
  };

  const sillyLevel = React.useState(0);
  const increment = (value) => {
    sillyLevel[0] = value;
    sillyLevel[1](value);
  };
  const sillyNotSet = () => (!(sillyLevel[0]));

  // Diya: what's illusion?
  const [illusion, setIllusion] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
  }, [bookFilters]);

  // deconstruct state for easier references
  const {
    isParent, isChild, count,
  } = state;

  // Common Parent + Kid Progression

  if (count === 1 && (isParent || isChild)) {
    return (
      <div>
        <Quiz1
          isParent={isParent}
          dispatch={dispatch}
          setIsChild={setIsChild}
        />
      </div>
    );
  }

  if (count === 2) {
    setIsChild(isChild);
    return (
      <Quiz2
        dispatch={dispatch}
        bookFilters={bookFilters}
        setBookFilters={setBookFilters}
        isAdult={!isChild}
      />
    );
  }

  if (count === 3) {
    setIsChild(isChild);
    return (
      <Quiz3
        bookFilters={bookFilters}
        setBookFilters={setBookFilters}
        dispatch={dispatch}
        isAdult={!isChild}
      />
    );
  }

  // Parent Quiz Progression
  if (isParent && count === 4) {
    setIsChild(isChild);
    const genreCaptions = [...funGenres, ...seriousGenres];
    return (
      <Quiz6
        progress={70}
        dispatch={dispatch}
        bookFilters={bookFilters}
        setBookFilters={setBookFilters}
        title="What type of book do you think your kid(s) would be in the mood for right now?"
        buttonCaptions={genreCaptions}
        buttonValues={genreCaptions}
        isAdult
      />
    );
  }

  if (isParent && count === 5) {
    setIsChild(isChild);
    return (
      <Quiz7Adult
        dispatch={dispatch}
        bookFilters={bookFilters}
        setBookFilters={setBookFilters}
      />
    );
  }

  // Child Quiz Progression
  if (isChild && count === 4) {
    setIsChild(isChild);
    return (
      <Quiz4Kid
        setSilly={increment}
        sillyNotSet={sillyNotSet}
        dispatch={dispatch}
      />
    );
  }

  if (isChild && count === 5 && (sillyLevel[0] == 2 || sillyLevel[0] == 4)) {
    setIsChild(isChild);
    return (
      <Quiz5Kid
        dispatch={dispatch}
        setIllusions={setIllusion}
      />
    );
  }

  if (isChild && count === 5 && sillyLevel[0] == 3) {
    setIsChild(isChild);
    return (
      <Quiz6
        includeButtons
        dispatch={dispatch}
        bookFilters={bookFilters}
        setBookFilters={setBookFilters}
        title="Which of the following would you be interested in reading about?"
        buttonValues={[...seriousGenres, ...funGenres]}
        buttonCaptions={[...seriousGenreCaptions, ...funGenreCaptions]}
        progress={100}
        isLastStep
        hasLargeButtons
      />
    );
  }

  if (isChild && ((count === 5 && sillyLevel[0] == 1) || (count === 6 && illusion == 2))) {
    setIsChild(isChild);
    return (
      <Quiz6
        includeButtons
        dispatch={dispatch}
        bookFilters={bookFilters}
        setBookFilters={setBookFilters}
        title="Which of the following would you be interested in reading about?"
        buttonValues={seriousGenres}
        buttonCaptions={seriousGenreCaptions}
        progress={100}
        isLastStep
        hasLargeButtons
      />
    );
  }

  if (isChild && ((count === 5 && sillyLevel[0] == 5) || (count === 6 && illusion == 1))) {
    setIsChild(isChild);
    return (
      <Quiz6
        includeButtons
        dispatch={dispatch}
        bookFilters={bookFilters}
        setBookFilters={setBookFilters}
        title="Which of the following seem fun to you?"
        buttonValues={funGenres}
        buttonCaptions={funGenreCaptions}
        progress={100}
        isLastStep
        hasLargeButtons
      />
    );
  }

  // First Quiz Question (count==1 and neither isParent/isChild set yet)
  return (
    <div>
      <Quiz1 isParent={isParent} isDisabled dispatch={dispatch} setIsChild={setIsChild} />
    </div>
  );
}

Quiz.propTypes = {
  setBookFilters: propTypes.func.isRequired,
  setIsChild: propTypes.func.isRequired,
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
