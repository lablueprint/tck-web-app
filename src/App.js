import React, { useState, useEffect, useMemo } from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import {
  Dictionary, Home, CreatorPage, BookPage, CollectionPage, BrowserPage, QuizPage,
} from './Pages';
import { Header, Footer } from './Components/index';
import { BooksContext } from './Contexts';
import base from './Airtable';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);

  useEffect(() => {
    base('Book').select({ view: 'Grid view' }).all()
      .then((records) => {
        setBooks(records);
        setBooksLoading(false);
      });
  }, []);

  const bookContextVal = useMemo(() => ({ books, booksLoading }), [books, booksLoading]);

  return (
    <div className="App">
      <Header />
      <div className="screen-container">
        <BooksContext.Provider value={bookContextVal}>
          <Routes>
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/" element={<Home />} />
            <Route path="/browser" element={<BrowserPage />} />
            <Route exact path="/browser/book/:bookId" element={<BookPage />} />
            <Route exact path="/browser/creator/:id" element={<CreatorPage />} />
            <Route exact path="/collection" element={<CollectionPage />} />
            <Route exact path="/collection/:id" element={<CollectionPage />} />
            <Route path="/quiz/*" element={<QuizPage />} />
          </Routes>
        </BooksContext.Provider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
