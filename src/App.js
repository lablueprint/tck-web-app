import React from 'react';
import CardsDisplay from './CardsDisplay';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="book-card">
          <CardsDisplay />
        </div>
      </header>
    </div>
  );
}

export default App;
