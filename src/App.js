import React, { useState } from 'react';
import {
  Route, Routes,
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
  const [bookFilters, setBookFilters] = useState({
    bookId: '',
    minAge: 0,
    maxAge: 18,
    minGrade: -1,
    maxGrade: 12,
    'race/ethnicity': [],
    genre: [],
    book_type: [],
  });
  const [isChild, setIsChild] = useState(null);
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
