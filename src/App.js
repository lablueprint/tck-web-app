import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import {
  Dictionary, Home, CreatorPage, BookPage, CollectionPage, BrowserPage, QuizPage,
} from './Pages';
import { Header, Footer } from './Components/index';
import './App.css';
// import StartPage from './Components/Quiz/StartPage';
// import Quiz1 from './Components/Quiz/Quiz1';
// import ResultsPage from './Components/Quiz/QuizResultsPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/browser" element={<BrowserPage />} />
        <Route exact path="/book/:bookId" element={<BookPage />} />
        <Route exact path="/creator/:id" element={<CreatorPage />} />
        <Route exact path="/collection/:id" element={<CollectionPage />} />
        {/* <Route exact path="/quiz" element={<StartPage />} /> */}
        <Route path="/quiz/*" element={<QuizPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
