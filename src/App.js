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
import QuizKidGradeSelect from './Components/Quiz/QuizKidGradeSelect';
import QuizAdultGradeSelect from './Components/Quiz/QuizAdultGradeSelect copy';
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
        <Route exact path="/quiz/questions/adult" element={<QuizAdultGradeSelect />} />
        <Route exact path="/quiz/questions/kid" element={<QuizKidGradeSelect />} />
      </Routes>
    </div>
  );
}

export default App;
