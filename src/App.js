import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import { Dictionary, Home } from './Pages';
import { Header } from './Components';
import './App.css';
import CreatorPage from './Pages/CreatorPage';
import CollectionPage from './Pages/CollectionPage';
import BrowserPage from './Pages/BrowserPage';

import BookPage from './Pages/BookPage';

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
      </Routes>
    </div>
  );
}

export default App;
