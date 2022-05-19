import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import './QuizResultsPage.css';
import DownArrow from '../../Assets/Images/down-arrow.svg';
import UpArrow from '../../Assets/Images/up-arrow.svg';
import shareIcon from '../../Assets/Images/upload-icon.svg';
import BookCard from '../bookHub/BookCard';
import RecFilter from '../Recommendations/BookRec';

const sampleBookIDs = ['rectqkZI0hdvX5CMP', 'recbTpz98TrLIwEk0', 'recxhYkewzxt0Zu6k'];

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function HandleClickToTop() {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}

function HandleClickToBottom() {
  const anchor = document.querySelector('#recommended-books');
  anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ResultsPage({ bookFilters, isChild }) {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  let gradeDisplayed = '';
  function getRecommendedBooks() {
    base('Book').select({ view: 'Grid view' }).all()
      .then((records) => {
        setRecommendedBooks(records.filter((element) => sampleBookIDs.indexOf(element.id) > -1));
      });
  }
  setTimeout(HandleClickToBottom, 2000);
  useEffect(() => {
    const getBooksLikeThis = async () => {
      if (bookFilters) {
        const recList = await RecFilter(
          bookFilters.bookId,
          bookFilters.minAge,
          bookFilters.maxAge,
          bookFilters.minGrade,
          bookFilters.maxGrade,
          bookFilters['race/ethnicity'],
          bookFilters.genre,
          bookFilters.book_type,
        );
        console.log('recList: ', recList);
      }
    };
    getBooksLikeThis();
  });
  useEffect(getRecommendedBooks, []);
  if (bookFilters.maxGrade === -1) {
    gradeDisplayed = '0 to Pre-K';
  } else if (bookFilters.maxGrade === 0) {
    gradeDisplayed = 'Kindergarten';
  } else {
    gradeDisplayed = `${bookFilters.maxGrade}th`;
  }
  return (
    <div>
      {isChild
      && (
      <div className="results-wrapper">
        <p className="results-title" id="result-text">Your Results</p>
        <div className="results-text-wrapper">
          <p className="results-text">
            You are
            {' '}
            <span style={{ color: '#3477DE', fontWeight: 'bold' }}>smart</span>
            {' '}
            - - you can read up to a
            {' '}
            <span style={{ color: '#E85757', fontWeight: 'bold' }}>
              {gradeDisplayed}
              {' '}
              grade
            </span>
            {' '}
            level!
          </p>
          <p className="results-text fade-in-animation-delay-4s">
            You are
            {' '}
            <span style={{ color: '#20B28F', fontWeight: 'bold' }}>curious</span>
            {' '}
            -- you have expressed interested in
            {' '}
            <span style={{ color: '#F99E16', fontWeight: 'bold' }}>
              {bookFilters['race/ethnicity'].slice(0, -1).join(', ')}
              {' '}
              and
              {' '}
              {bookFilters['race/ethnicity'].slice(-1)}
              {' '}
              culture.
            </span>
          </p>
          <p className="results-text fade-in-animation-delay-6s">
            We think you would enjoy the
            {' '}
            <span style={{ color: '#393EBA', fontWeight: 'bold' }}>
              {bookFilters.genre.slice(0, -1).join(', ')}
              {' '}
              and
              {' '}
              {bookFilters.genre.slice(-1)}
              {' '}
            </span>
            genres based on your answers.
          </p>
        </div>
        <button type="button" style={{ border: 'none', background: 'none' }} onClick={HandleClickToBottom}>
          <img src={DownArrow} alt="bouncing arrow pointing downwards" className="down-arrow-image" />
        </button>
      </div>
      )}

      <div className="recommended-books-section-wrapper" id="recommended-books">
        {isChild
        && (
        <button type="button" style={{ border: 'none', background: 'none' }} onClick={HandleClickToTop}>
          <img
            src={UpArrow}
            alt="bouncing arrow pointing upwards"
            className="down-arrow-image"
          />

        </button>
        )}
        <div className="recommended-books-section-title-wrapper"><p className="results-text recommended-books-section-text">Here are some books we think would be great for you!</p></div>
        <div className="recommended-books-wrapper">
          <div style={{
            flex: '0 0 80%', flexDirection: 'row', display: 'flex', columnGap: '3em', margin: '0 auto',
          }}
          >
            {recommendedBooks.length && recommendedBooks.map((record) => (
              <BookCard
                id={record.id}
                image={record.fields.image !== undefined ? record.fields.image[0].thumbnails.large.url : ''}
                title={record.fields.title !== undefined ? record.fields.title : 'No Title'}
                author={record.fields.author !== undefined ? record.fields.author : 'MISSING CREATOR'}

              />
            ))}
          </div>
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
ResultsPage.propTypes = {
  bookFilters: propTypes.shape({
    bookId: propTypes.string.isRequired,
    'race/ethnicity': propTypes.arrayOf(propTypes.string).isRequired,
    minAge: propTypes.number.isRequired,
    maxAge: propTypes.number.isRequired,
    minGrade: propTypes.number.isRequired,
    maxGrade: propTypes.number.isRequired,
    genre: propTypes.arrayOf(propTypes.string).isRequired,
    book_type: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
  isChild: propTypes.bool.isRequired,
};
export default ResultsPage;
