import React from 'react';
import Card from './Card';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="book-card">
          <Card title="Title" author="Author" image="<src?>" />
          <Card title="abc" author="123" image="<src?>" />
        </div>
      </header>
    </div>
  );
}

export default App;
