import React from 'react';
import {
  BrowserRouter as Route, Routes,
} from 'react-router-dom';
import './App.css';
import CreatorPage from './Pages/CreatorPage';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/creator/:id" element={<CreatorPage />} />
      </Routes>
    </div>
  );
}

export default App;
