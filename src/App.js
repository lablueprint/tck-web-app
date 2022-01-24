import React from 'react';
// import logo from './logo.svg';
import {
  BrowserRouter as Router, Route, Routes, Link,
} from 'react-router-dom';
import './App.css';
import CreatorPage from './Pages/CreatorPage';

function App() {
  return (
    <Router>
      <div>
        <Link to="/creator/recbWFQEU8NMQXASa">Creator Page</Link>
        {/* <CreatorPage authId="recbWFQEU8NMQXASa" /> */}
        <Routes>
          <Route exact path="/creator/:id" element={<CreatorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit
//           <code>src/App.js</code>
//           and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
