import React from 'react';
import './QuizResultsPage.css';
import DownArrow from '../../Assets/Images/down-arrow.svg';
import UpArrow from '../../Assets/Images/up-arrow.svg';
import shareIcon from '../../Assets/Images/upload-icon.svg';

function ResultsPage() {
  return (
    <div>
      <div className="results-wrapper">
        <p className="results-title">Your Results</p>
        <div className="results-text-wrapper">
          <p className="results-text">
            You are
            {' '}
            <span>smart</span>
            {' '}
            - - you can read upto a
            {' '}
            <span>5th grade</span>
            {' '}
            level!
          </p>
          <p className="results-text">
            You are
            {' '}
            <span>curious</span>
            {' '}
            -- you have expressed interested in
            {' '}
            <span>African, Latino/Latinx, and South Asian culture.</span>
          </p>
          <p className="results-text">
            We think you would enjoy the
            {' '}
            <span>Non-fiction, Adventure, Scary/Horror, and Fantasy</span>
            {' '}
            genres based on your answers.
          </p>
        </div>
        <img src={DownArrow} alt="bouncing arrow pointing downwards" className="down-arrow-image" />
      </div>
      <div className="recommended-books-section-wrapper">
        <img src={UpArrow} alt="bouncing arrow pointing upwards" className="down-arrow-image" />
        <div className="recommended-books-section-title-wrapper"><p className="results-text recommended-books-section-text">Here are some books we think would be great for you!</p></div>
        <div className="recommended-books-wrapper">
          <div style={{ flex: '0 0 80%' }} />
          <div style={{
            maxHeight: '100%', display: 'flex', justifyContent: 'end', margin: '0 2em 0 0',
          }}
          >
            <img src={shareIcon} alt="icon to share results" style={{ maxHeight: '100%', maxWidth: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
