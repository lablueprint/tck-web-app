import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AuthorDisplay from './Components/creatorPage/AuthorDisplay';
import CreatedWorksCard from './Components/creatorPage/creatorAvnish';

function App() {
  return (
    <div>
      <AuthorDisplay authId="recbWFQEU8NMQXASa" />
      <CreatedWorksCard authorId="recbWFQEU8NMQXASa" />
    </div>
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
