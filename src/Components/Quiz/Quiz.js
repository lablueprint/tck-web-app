/* eslint-disable eqeqeq */
import React, { useReducer, useState } from 'react';
import propTypes from 'prop-types';
import './QuizGroup.css';
import Quiz2Adult from './Quiz2Adult';
import Quiz3 from './Quiz3';
import Quiz4Kid from './Quiz4Kid';
import Quiz5 from './Quiz5Kid';
import Quiz8Adult from './Quiz8Adult';
import Quiz2Kid from './Quiz2Kid';
import Quiz6 from './Quiz6';
import Quiz7Kid from './Quiz7Kid';
import Quiz6Kid from './Quiz6Kid';
import Quiz1 from './Quiz1';

function reducer(state, action) {
  switch (action.type) {
    case 'parent':
      return {
        ...state,
        isParent: true,
        count: state.count + 1,
        goneBack: true,
      };
    case 'child':
      return {
        ...state,
        isChild: true,
        count: state.count + 1,
        goneBack: true,
      };
    case 'child back':
      return {
        ...state,
        isChild: true,
        count: state.count - 1,
      };
    case 'parent back':
      return {
        ...state,
        isChild: true,
        count: state.count - 1,
      };
    default:
      throw new Error();
  }
}

const issDisabled = (anArr) => (anArr.length === 0);

export default function Quiz({ bookFilters, setBookFilters, setIsChild }) {
  const initialState = {
    isParent: false,
    isChild: false,
    count: 1,
    goneBack: false,
  };
  const sillyLevel = React.useState(0);
  const increment = (value) => {
    sillyLevel[0] = value;
    sillyLevel[1](value);
  };
  const sillyNotSet = () => (!(sillyLevel[0]));
  const [illusion, setIllusion] = useState(0);
  const [isDisabled02A, setIsDisabled02A] = useState(false);
  const [isDisabled02K, setisDisabled02K] = useState(false);
  const callback02A = (isDisabledFromChild) => {
    setIsDisabled02A(isDisabledFromChild);
  };
  const callback02K = (isDisabledFromChild) => {
    setisDisabled02K(isDisabledFromChild);
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isParent, isChild, count, goneBack,
  } = state;
  if (isParent && count === 2) {
    setIsChild(isChild);
    return (
      <div>
        <Quiz2Adult
          dispatch={dispatch}
          isDisabled02A={isDisabled02A}
          parentCallback02A={callback02A}
          bookFilters={bookFilters}
          setBookFilters={setBookFilters}
        />
      </div>
    );
  }
  if (isParent && count === 3) {
    setIsChild(isChild);
    return (
      <div style={{ background: '#FAFAFA', margin: '0', height: '100%' }}>
        <Quiz3
          bookFilters={bookFilters}
          slideCaption="Which races/ethnicities do you want to see represented?"
          setBookFilters={setBookFilters}
          dispatch={dispatch}
          type1="parent"
        />
      </div>
    );
  }
  if (isParent && count === 4) {
    setIsChild(isChild);
    const parentButtonCaptions = ['Autobiography', 'Non-fiction', 'Historical fiction', 'Memoir', 'Mystery'];
    return (
      <div>
        <Quiz6 dispatch={dispatch} issDisabled={issDisabled(bookFilters.genre)} bookFilters={bookFilters} setBookFilters={setBookFilters} title="Please select any of the following genres that you are interested in." buttonCaptions={parentButtonCaptions} />
      </div>
    );
  }
  if (isParent && count === 5) {
    setIsChild(isChild);
    const parentButtonCaptions = ['Adventure', 'Scary/Horror', 'Science fiction', 'Fantasy', 'Romance', 'Afrofuturism'];
    return (
      <div>
        <Quiz6 dispatch={dispatch} issDisabled={issDisabled(bookFilters.genre)} bookFilters={bookFilters} setBookFilters={setBookFilters} title="Please select any of the following genres that you are interested in." buttonCaptions={parentButtonCaptions} />
      </div>
    );
  }
  if (isParent && count === 6) {
    setIsChild(isChild);
    return (
      <div>
        <Quiz8Adult
          dispatch={dispatch}
          issDisabled={issDisabled(bookFilters.book_type)}
          bookFilters={bookFilters}
          setBookFilters={setBookFilters}
        />
      </div>
    );
  }
  if (isChild && count === 2) {
    setIsChild(isChild);
    return (
      <div>
        <Quiz2Kid
          parentCallback02K={callback02K}
          bookFilters={bookFilters}
          setBookFilters={setBookFilters}
          dispatch={dispatch}
          isDisabled02K={isDisabled02K}
        />
      </div>
    );
  }
  if (isChild && count === 3) {
    setIsChild(isChild);
    return (
      <div style={{ background: '#FAFAFA', margin: '0', height: '100%' }}>
        <Quiz3
          bookFilters={bookFilters}
          setBookFilters={setBookFilters}
          slideCaption="Which of these races are you interested in reading about?"
          dispatch={dispatch}
          type1="child"
        />
      </div>
    );
  }
  if (isChild && count === 4) {
    setIsChild(isChild);
    return (
      <div>
        <Quiz4Kid
          setSilly={increment}
          sillyNotSet={sillyNotSet}
          dispatch={dispatch}
        />
      </div>
    );
  }
  if (isChild && count === 5 && sillyLevel[0] == 3) {
    const childButtonCaptions = ['The lives of interesting and influential people',
      'Fascinating facts about different topics such as nature, animals, or space',
      'Important events of the past that shaped the world we live in today',
      'A detailed retelling of a crucial period of time in an individual’s life',
      'The case of a mysterious, unnatural phenomenon', 'Stories with poetry'];
    setIsChild(isChild);
    return (
      <div>
        <Quiz6Kid includeButtons issDisabled={false} dispatch={dispatch} bookFilters={bookFilters} setBookFilters={setBookFilters} title="Which of the following would you be interested in reading about? " buttonCaptions={childButtonCaptions} />
      </div>
    );
  }
  if (isChild && count === 6 && sillyLevel[0] == 3) {
    setIsChild(isChild);
    return (
      <div>
        <Quiz7Kid
          includeNav
          dispatch={dispatch}
          issDisabled={issDisabled(bookFilters.genre)}
          bookFilters={bookFilters}
          setBookFilters={setBookFilters}
        />
      </div>
    );
  }
  if ((isChild && count === 5 && sillyLevel[0] == 5)
  || (isChild && count === 5 && sillyLevel[0] == 3)
  || (isChild && count === 6 && illusion == 2)) {
    const childButtonCaptions = ['The lives of interesting and influential people',
      'Fascinating facts about different topics such as nature, animals, or space',
      'Important events of the past that shaped the world we live in today',
      'A detailed retelling of a crucial period of time in an individual’s life',
      'The case of a mysterious, unnatural phenomenon', 'Stories with poetry'];
    setIsChild(isChild);
    return (
      <div>
        <Quiz6Kid includeButtons={false} issDisabled={false} dispatch={dispatch} bookFilters={bookFilters} setBookFilters={setBookFilters} title="Which of the following would you be interested in reading about? " buttonCaptions={childButtonCaptions} />
      </div>
    );
  }
  if ((isChild && count === 5 && sillyLevel[0] == 1)
    || (isChild && count === 6 && sillyLevel[0] == 3)
    || (isChild && count === 6 && illusion == 1)) {
    setIsChild(isChild);
    return (
      <div>
        <Quiz7Kid dispatch={dispatch} includeNav="false" bookFilters={bookFilters} setBookFilters={setBookFilters} />
      </div>
    );
  }
  // eslint-disable-next-line eqeqeq
  if ((isChild && count === 5 && sillyLevel[0] == 2)
  || (isChild && count === 5 && sillyLevel[0] == 4)) {
    setIsChild(isChild);
    return (
      <div style={{ background: '#FAFAFA' }}>
        <Quiz5
          dispatch={dispatch}
          setIllusions={setIllusion}
        />
      </div>
    );
  }
  if (isChild && count === 7) {
    setIsChild(isChild);
    return (
      <div>
        <Quiz7Kid
          includeNav
          dispatch={dispatch}
          issDisabled={issDisabled(bookFilters.genre)}
          bookFilters={bookFilters}
          setBookFilters={setBookFilters}
        />
      </div>
    );
  }
  setIsChild(isChild);
  if (count === 1 && goneBack) {
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

  return (
    <div>
      <Quiz1 isParent={isParent} setDisabled dispatch={dispatch} setIsChild={setIsChild} />
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
