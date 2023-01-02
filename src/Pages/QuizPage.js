import React, { useState, useEffect, useRef } from 'react';
import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import Quiz from '../Components/Quiz/Quiz';
import StartPage from '../Components/Quiz/StartPage';
import ResultsPage from '../Components/Quiz/QuizResultsPage';

const filtersInit = {
  bookId: '',
  minAge: 0,
  maxAge: 18,
  minGrade: -1,
  maxGrade: 12,
  'race/ethnicity': [],
  genre: [],
  book_type: [],
};

function QuizPage() {
  // setup state to hold filters + mutate if necessary
  const [bookFilters, setBookFilters] = useState(filtersInit);
  const [isChild, setIsChild] = useState(true);
  const location = useLocation();
  const firstLoad = useRef(true);

  // fetch quiz filters from local storage if available
  const initState = () => {
    const maxGradeVal = localStorage.getItem('maxGrade') !== undefined ? Number(localStorage.getItem('maxGrade')) : 12;
    const minGradeVal = localStorage.getItem('minGrade') !== undefined ? Number(localStorage.getItem('minGrade')) : -1;
    const minAgeVal = localStorage.getItem('minAge') !== undefined ? Number(localStorage.getItem('minAge')) : 0;
    const maxAgeVal = localStorage.getItem('maxAge') !== undefined ? Number(localStorage.getItem('maxAge')) : 18;
    const bookTypeVal = typeof localStorage.getItem('bookType') === 'string' ? localStorage.getItem('bookType').split(',') : [];
    const genreVal = typeof localStorage.getItem('genres') === 'string' ? localStorage.getItem('genres').split(',') : [];
    const raceVal = typeof localStorage.getItem('race/ethnicity') === 'string' ? localStorage.getItem('race/ethnicity').split(',') : [];
    const storedValueAsNumber = localStorage.getItem('isChild') === 'true' ? 1 : 0;

    setBookFilters({
      bookId: '',
      minAge: Number.isInteger(minAgeVal) ? minAgeVal : 0,
      maxAge: Number.isInteger(maxAgeVal) ? maxAgeVal : 18,
      minGrade: Number.isInteger(minGradeVal) ? minGradeVal : -1,
      maxGrade: Number.isInteger(maxGradeVal) ? maxGradeVal : 12,
      'race/ethnicity': raceVal,
      genre: genreVal,
      book_type: bookTypeVal,
    });
    setIsChild(storedValueAsNumber === 1);
    console.log('init!');
  };

  // reload page if any of the filters change! (make sure the pages switch at the right times)
  useEffect(() => {
    console.log(bookFilters);
  }, [bookFilters]);

  // fetch and initialize state for the quiz type (child or not)

  useEffect(() => {
    localStorage.setItem('isChild', String(isChild));
  }, [isChild]);

  // initialize and update local storage
  useEffect(() => {
    if (firstLoad.current === true) {
      initState();
      firstLoad.current = false;
    } else if (location.pathname === '/quiz') {
      localStorage.setItem('maxAge', '18');
      localStorage.setItem('minAge', '0');
      localStorage.setItem('maxGrade', '12');
      localStorage.setItem('minGrade', '-1');
      localStorage.setItem('genres', '');
      localStorage.setItem('race/ethnicity', '');
      localStorage.setItem('bookType', '');
      setBookFilters(filtersInit);
    } else {
      localStorage.setItem('maxAge', String(bookFilters.maxAge));
      localStorage.setItem('minAge', String(bookFilters.minAge));
      localStorage.setItem('maxGrade', String(bookFilters.maxGrade));
      localStorage.setItem('minGrade', String(bookFilters.minGrade));
      localStorage.setItem('genres', String(bookFilters.genre.join(',')));
      localStorage.setItem('race/ethnicity', String(bookFilters['race/ethnicity'].join(',')));
      localStorage.setItem('bookType', String(bookFilters.book_type.join(',')));
    }
  }, [location, bookFilters]);

  return (
    <div>
      <Routes>
        <Route path="" element={<StartPage />} />
        <Route path="questions" element={<Quiz bookFilters={bookFilters} setBookFilters={setBookFilters} setIsChild={setIsChild} />} />
        <Route path="results" element={<ResultsPage bookFilters={bookFilters} isChild={isChild} />} />
      </Routes>
    </div>
  );
}
export default QuizPage;
