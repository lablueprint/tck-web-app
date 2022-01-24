import React from 'react';
/*
import {
  BrowserRouter as Router, Route, Routes, Link,
} from 'react-router-dom';
*/
import './App.css';

import BookPage from './Pages/BookPage/BookPage';

function App() {
  return (
    <BookPage bookId="rectqkZI0hdvX5CMP" />
  );
  /*
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <BookPage bookId="rectqkZI0hdvX5CMP" />
        </div>
      </header>
    </div>
  );
  */
}

export default App;
