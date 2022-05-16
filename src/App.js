import React, { useState } from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import { Dictionary, Home } from './Pages';
import Header from './Components';
import './App.css';
import CreatorPage from './Pages/CreatorPage';
import CollectionPage from './Pages/CollectionPage';
import StartPage from './Components/Quiz/StartPage';
import Quiz1 from './Components/Quiz/Quiz1';
import Quiz2Kid from './Components/Quiz/Quiz2Kid';
import Quiz2Adult from './Components/Quiz/Quiz2Adult';
import BookPage from './Pages/BookPage';

function App() {
  const [bookFilters, setBookFilters] = useState({
    bookId: '',
    minAge: 0,
    maxAge: 18,
    minGrade: 0,
    maxGrade: 13,
    'race/ethnicity': [],
    genre: [],
    book_type: [],
  });
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
        <Route exact path="/quiz/questions" element={<Quiz1 bookFilters={bookFilters} setBookFilters={setBookFilters} />} />
        <Route exact path="/quiz/questions/adult" element={<Quiz2Adult />} />
        <Route exact path="/quiz/questions/kid" element={<Quiz2Kid />} />
      </Routes>
    </div>
  );
}

export default App;
