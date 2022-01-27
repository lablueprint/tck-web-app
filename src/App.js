import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import { Dictionary, Home } from './Pages';
import Header from './Components';
import './App.css';
// import CollectionDisplay from './Components/Collections/CollectionDisplay';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dictionary" element={<Dictionary />} />
      </Routes>
    </div>
  );
}

export default App;
