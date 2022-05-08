import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import { Dictionary, Home } from './Pages';
import Header from './Components';
import './App.css';
import CreatorPage from './Pages/CreatorPage';
import CollectionPage from './Pages/CollectionPage';
import StartPage from './Components/Quiz/StartPage';
import QuizGroup from './Components/Quiz/QuizGroup';
import QuizResultsPage from './Components/Quiz/QuizResultsPage';
import BookPage from './Pages/BookPage';

function App() {
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
        <Route exact path="/quiz/questions" element={<QuizGroup />} />
        <Route exact path="/quiz/results" element={<QuizResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;
