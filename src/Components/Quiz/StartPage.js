/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './StartPage.css';

export default function StartPage() {
  return (
    <div className="quiz-start-background">
      <div className="quiz-start-text-container">
        <h2 className="quiz-start-header1"> The Conscious Kid&apos;s</h2>
        <h1 className="quiz-start-header2">Book Finder Quiz</h1>
        <h4 className="quiz-start-subtitle">
          Do not know what to search for? Try this short quiz to receive personalized book recommendations from The Conscious Kid&apos;s collection! Take this if you are a kid, parent, or educator looking for a fun read!
        </h4>
      </div>
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
