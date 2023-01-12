/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './StartPage.css';
import mobileGraphic from '../../Assets/Images/MobileQuizForeground.png';

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default function StartPage() {
  const size = useWindowSize();

  return (
    <div className="quiz-start-background">
      <div className="quiz-start-text-container">
        <h2 className="quiz-start-header1"> The Conscious Kid&apos;s</h2>
        <h1 className="quiz-start-header2">Book Finder Quiz</h1>
        <h4 className="quiz-start-subtitle">
          Do not know what to search for? Try this short quiz to receive personalized book recommendations from The Conscious Kid&apos;s collection! Take this if you are a kid, parent, or educator looking for a fun read!
        </h4>
      </div>
      {size.width < 851
      && <img src={mobileGraphic} className="quiz-mobile-graphic" alt="Young Black boy joyfully soaring through clouds on a book" />}
      <div className="quiz-start-button-align">
        <NavLink to="/quiz/questions">
          <button
            className="quiz-start-button"
            type="button"
          >
            Take the Quiz
          </button>
        </NavLink>
      </div>
    </div>
  );
}
