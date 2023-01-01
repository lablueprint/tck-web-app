import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import {
  Dictionary, Home, CreatorPage, BookPage, CollectionPage, BrowserPage,
} from './Pages';
import { Header, Footer } from './Components/index';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="screen-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/browser" element={<BrowserPage />} />
          <Route exact path="/book/:bookId" element={<BookPage />} />
          <Route exact path="/creator/:id" element={<CreatorPage />} />
          <Route exact path="/collection/:id" element={<CollectionPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
