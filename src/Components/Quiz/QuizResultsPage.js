import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import {
  Button,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import DownArrow from '../../Assets/Images/down-arrow.svg';
import UpArrow from '../../Assets/Images/up-arrow.svg';
import RecFilter from '../Recommendations/BookRec';
import RightArrow from '../../Assets/Images/right-arrow.svg';
import LeftArrow from '../../Assets/Images/left-arrow.svg';
import Carousel from '../CreatorPage/BookCarousel';
import CloudImage from '../../Assets/Images/quiz-results-cloud.png';

import './QuizResultsPage.css';

const styles = {
  button: {
    border: '2.5px solid #D7D7D7',
    borderRadius: '21px',
    background: '#ffffff',
    fontFamily: 'DM Sans',
    fontWeight: 'bold',
    color: '#444444',
    textTransform: 'none',
    fontSize: '1.2rem',
    textAlign: 'center',
    padding: '2em 0.5em 2em 0.5em',
    height: '4rem',
    width: '16rem',
    textDecoration: 'none',
    zIndex: 'inherit',

    '&:hover': {
      bgcolor: '#EAF3FE',
      color: '#393EBA',
      borderColor: '#393EBA',
    },
    '@media (max-width: 750px)': {
      fontSize: '1rem',
      height: '2.5rem',
      width: '12.5rem',
    },
  },
};

function ResultsPage({ bookFilters, isChild }) {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  let gradeDisplayed = '';
  let raceMessage = '';
  let genreMessage = '';
  const myRef = useRef(null);

  // handle clicks to top and bottom section in kid version
  function handleClickToBottom() {
    if (myRef && myRef.current) {
      myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleClickToTop() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  // fetch recommendations given current filter
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
      setRecommendedBooks(recList.map((element) => ({
        author: (element.fields.author !== undefined ? element.fields.author : ['MISSING CREATOR']),
        image: (element.fields.image !== undefined ? element.fields.image[0].url : ''),
        title: (element.fields.title !== undefined ? element.fields.title : 'No Title'),
        id: element.id,
      })));
    }
  };

  // fetch if bookFilters change and on mount
  useEffect(() => {
    getBooksLikeThis();
  }, [bookFilters]);

  // set loading and time bottom movement once loaded
  useEffect(() => {
    if (recommendedBooks.length === 0) { setLoading(true); } else {
      setLoading(false);
      if (isChild) { setTimeout(handleClickToBottom, 3000); }
    }
  }, [recommendedBooks]);

  // initialize values for child results text
  switch (bookFilters.maxGrade) {
    case -1:
      gradeDisplayed = '0 to Pre-K';
      break;
    case 0:
      gradeDisplayed = 'Kindergarten ';
      break;
    case 1:
      gradeDisplayed = '1st grade';
      break;
    case 2:
      gradeDisplayed = '2nd grade ';
      break;
    case 3:
      gradeDisplayed = '3rd grade ';
      break;
    default:
      gradeDisplayed = `${bookFilters.maxGrade}th grade `;
      break;
  }

  if (bookFilters['race/ethnicity'].length > 1) {
    raceMessage = `${bookFilters['race/ethnicity'].slice(0, -1).join(', ')} and ${bookFilters['race/ethnicity'].slice(-1)}`;
  } else {
    raceMessage = `${bookFilters['race/ethnicity'].slice(-1)}`;
  }

  if (bookFilters.genre.length > 1) {
    genreMessage = `${bookFilters.genre.slice(0, -1).join(', ')} and ${bookFilters.genre.slice(-1)} genres `;
  } else if (bookFilters.genre.length === 1) {
    genreMessage = `${bookFilters.genre.slice(-1)} genre `;
  } else {
    genreMessage = 'these books ';
  }

  // if loading just display the loading graphic
  if (loading) {
    return <div> loading</div>;
  }

  // once loaded, show appropriate results!
  return (
    <>
      {isChild
      && (
        <div className="results-bg">
          <div className="results-wrapper">
            <p className="results-title">Your Results</p>
            <div className="results-text-wrapper">
              <p className="results-text">
                You are
                {' '}
                <span className="blue-bold">smart</span>
                {' '}
                -- you can read up to a
                {' '}
                <span className="red-bold">
                  {gradeDisplayed}
                </span>
                level!
              </p>
              <p className="results-text fade-in-animation-delay-4s">
                You are
                {' '}
                <span className="green-bold">curious</span>
                {' '}
                -- you have expressed interest in
                {' '}
                <span className="yellow-bold">
                  {raceMessage}
                </span>
                {' '}
                {(bookFilters['race/ethnicity'].length > 1) ? ' cultures.' : ' culture.'}
              </p>
              <p className="results-text fade-in-animation-delay-6s">
                We think you would enjoy
                {' '}
                <span className="dark-blue-bold">
                  {genreMessage}
                </span>
                based on your answers.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="down-arrow-button"
            onClick={handleClickToBottom}
          >
            <img src={DownArrow} alt="bouncing arrow pointing downwards" className="down-arrow-image" />
          </button>
          <img className="cloud-image" src={CloudImage} alt="sky illustration with clouds" />
        </div>
      )}
      <div
        className={isChild ? 'recommended-books-section-wrapper-kid' : 'recommended-books-section-wrapper-adult'}
        ref={myRef}
      >
        {isChild && (
          <button type="button" className="up-arrow-button" onClick={handleClickToTop}>
            <img
              src={UpArrow}
              alt="bouncing arrow pointing upwards"
              className="down-arrow-image"
            />
          </button>
        )}
        <div
          style={{ background: isChild ? 'default' : '#ffffff' }}
          className="recommended-books-wrapper"
        >
          <p className="recommended-books-text">Here are some books we think you would love!</p>
          <Carousel
            elementArray={recommendedBooks}
            slidesAtATime={6}
            prevArrow={LeftArrow}
            nextArrow={RightArrow}
            widthPercent={100}
            spaceBetweenEntries={16}
          />
        </div>
        <div className="results-button-container">
          <NavLink style={{ textDecoration: 'none' }} to="/quiz">
            <Button
              sx={styles.button}
            >
              <p>
                Retake quiz
              </p>
            </Button>
          </NavLink>
          <NavLink style={{ textDecoration: 'none' }} to="/browser">
            <Button
              sx={styles.button}
            >
              <p>
                Search for Books
              </p>
            </Button>
          </NavLink>
        </div>
      </div>
    </>
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
