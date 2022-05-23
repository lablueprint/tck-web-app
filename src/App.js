import React, { useState, useEffect } from 'react';
import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import {
  Dictionary, Home, CreatorPage, BookPage, CollectionPage,
} from './Pages';
import { Header, Footer } from './Components/index';
import './App.css';
import StartPage from './Components/Quiz/StartPage';
import Quiz1 from './Components/Quiz/Quiz1';
import ResultsPage from './Components/Quiz/QuizResultsPage';

function App() {
  const maxGradeVal = localStorage.getItem('maxGrade') !== undefined ? Number(localStorage.getItem('maxGrade')) : 12;
  const minGradeVal = localStorage.getItem('minGrade') !== undefined ? Number(localStorage.getItem('minGrade')) : -1;
  const minAgeVal = localStorage.getItem('minAge') !== undefined ? Number(localStorage.getItem('minAge')) : 0;
  const maxAgeVal = localStorage.getItem('maxAge') !== undefined ? Number(localStorage.getItem('maxAge')) : 18;
  const bookTypeVal = typeof localStorage.getItem('bookType') === 'string' ? localStorage.getItem('bookType').split(',') : [];
  const genreVal = typeof localStorage.getItem('genres') === 'string' ? localStorage.getItem('genres').split(',') : [];
  const raceVal = typeof localStorage.getItem('race/ethnicity') === 'string' ? localStorage.getItem('race/ethnicity').split(',') : [];
  const location = useLocation();
  const lastLocation = typeof localStorage.getItem('lastLocation') === 'string' ? localStorage.getItem('lastLocation') : '';

  const [bookFilters, setBookFilters] = useState({
    bookId: '',
    minAge: Number.isInteger(minAgeVal) ? minAgeVal : 0,
    maxAge: Number.isInteger(maxAgeVal) ? maxAgeVal : 18,
    minGrade: Number.isInteger(minGradeVal) ? minGradeVal : -1,
    maxGrade: Number.isInteger(maxGradeVal) ? maxGradeVal : 12,
    'race/ethnicity': raceVal,
    genre: genreVal,
    book_type: bookTypeVal,
  });

  const storedValueAsNumber = localStorage.getItem('isChild') === 'true' ? 1 : 0;

  const [isChild, setIsChild] = useState(storedValueAsNumber === 1);

  useEffect(() => {
    localStorage.setItem('isChild', String(isChild));
  }, [isChild]);

  const currentLocation = useLocation();
  useEffect(() => {
    if (lastLocation === '/quiz/results' || lastLocation === '/quiz/questions' || currentLocation === '/quiz/questions') {
      localStorage.setItem('maxAge', String(bookFilters.maxAge));
      localStorage.setItem('minAge', String(bookFilters.minAge));
      localStorage.setItem('maxGrade', String(bookFilters.maxGrade));
      localStorage.setItem('minGrade', String(bookFilters.minGrade));
      localStorage.setItem('genres', String(bookFilters.genre.join(',')));
      localStorage.setItem('race/ethnicity', String(bookFilters['race/ethnicity'].join(',')));
      localStorage.setItem('bookType', String(bookFilters['race/ethnicity'].join(',')));
    } else {
      localStorage.setItem('maxAge', '18');
      localStorage.setItem('minAge', '0');
      localStorage.setItem('maxGrade', '12');
      localStorage.setItem('minGrade', '-1');
      localStorage.setItem('genres', '');
      localStorage.setItem('race/ethnicity', '');
      localStorage.setItem('bookType', '');
      setBookFilters({
        bookId: '',
        minAge: 0,
        maxAge: 18,
        minGrade: -1,
        maxGrade: 12,
        'race/ethnicity': [],
        genre: [],
        book_type: [],
      });
    }
    localStorage.setItem('lastLocation', location.pathname);
  }, [location]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route exact path="/book/:bookId" element={<BookPage />} />
        <Route exact path="/creator/:id" element={<CreatorPage />} />
        <Route exact path="/collection/:id" element={<CollectionPage />} />
        <Route exact path="/quiz" element={<StartPage />} />
        <Route exact path="/quiz/questions" element={<Quiz1 bookFilters={bookFilters} setBookFilters={setBookFilters} setIsChild={setIsChild} />} />
        <Route exact path="/quiz/results" element={<ResultsPage bookFilters={bookFilters} isChild={isChild} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
