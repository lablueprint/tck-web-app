import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import './QuizResultsPage.css';
import DownArrow from '../../Assets/Images/down-arrow.svg';
import UpArrow from '../../Assets/Images/up-arrow.svg';
import RecFilter from '../Recommendations/BookRec';
import RightArrow from '../../Assets/Images/right-arrow.svg';
import LeftArrow from '../../Assets/Images/left-arrow.svg';
import Carousel from '../CreatorPage/BookCarousel';
import CloudImage from '../../Assets/Images/results-cloud-illustration.svg';
import AdultCloudImage from '../../Assets/Images/Adult_recommendations_clouds.svg';
// import BookList from '../BookList/BookList';

function HandleClickToTop() {
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}

function ResultsPage({ bookFilters, isChild }) {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  let gradeDisplayed = '';
  let raceMessage = '';
  let genreMessage = '';
  const myRef = useRef(null);

  function HandleClickToBottom() {
    if (myRef && myRef.current) {
      myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
        setRecommendedBooks(recList.map((element) => ({
          author: (element.fields.author !== undefined ? element.fields.author : ['MISSING CREATOR']),
          image: (element.fields.image !== undefined ? element.fields.image[0].url : ''),
          title: (element.fields.title !== undefined ? element.fields.title : 'No Title'),
          id: element.id,
        })));
      }
    };
    getBooksLikeThis();
  }, [bookFilters]);

  if (bookFilters.maxGrade === -1) {
    gradeDisplayed = '0 to Pre-K';
  } else if (bookFilters.maxGrade === 0) {
    gradeDisplayed = 'Kindergarten';
  } else {
    gradeDisplayed = `${bookFilters.maxGrade}th`;
  }

  if (bookFilters['race/ethnicity'].length > 1) {
    raceMessage = `${bookFilters['race/ethnicity'].slice(0, -1).join(', ')} and ${bookFilters['race/ethnicity'].slice(-1)}`;
  } else {
    raceMessage = `${bookFilters['race/ethnicity'].slice(-1)}`;
  }

  if (bookFilters.genre.length > 1) {
    genreMessage = `${bookFilters.genre.slice(0, -1).join(', ')} and ${bookFilters.genre.slice(-1)}`;
  } else {
    genreMessage = `${bookFilters.genre.slice(-1)}`;
  }
  return (
    <div style={{
      background: '#cbe7ee', padding: isChild ? '5em 0 0em 0' : '2em 0 8em 0',
    }}
    >
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
            -- you have expressed interest in
            {' '}
            <span style={{ color: '#F99E16', fontWeight: 'bold' }}>
              {raceMessage}
            </span>
            {' '}
            {(bookFilters['race/ethnicity'].length > 1) ? ' cultures.' : ' culture.'}
          </p>
          <p className="results-text fade-in-animation-delay-6s">
            We think you would enjoy the
            {' '}
            <span style={{ color: '#393EBA', fontWeight: 'bold' }}>
              {genreMessage}
            </span>
            {(bookFilters.genre.length > 1) ? ' genres ' : ' genre '}
            based on your answers.
          </p>
        </div>
        <img style={{ position: 'relative', bottom: '2.5em', right: '15em' }} src={CloudImage} alt="sky illustration with clouds" />
        <button
          type="button"
          style={{
            border: 'none', background: 'none', position: 'relative', bottom: '300px',
          }}
          onClick={HandleClickToBottom}
        >
          <img src={DownArrow} alt="bouncing arrow pointing downwards" className="down-arrow-image" />
        </button>
      </div>
      )}
      {/* here */}
      <div
        className="recommended-books-section-wrapper"
        style={{
          background: isChild ? '#ffffff' : '#cbe7ee', height: isChild ? '100vh' : '70vh', marginTop: isChild ? '40vh' : '0',
        }}
        ref={myRef}
      >
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
        <div className="recommended-books-section-title-wrapper">
          {isChild && <h2 className="results-text recommended-books-section-text">Here are some books we think you would love!</h2>}
        </div>
        <div className="recommended-books-wrapper">
          <div style={{
            margin: '0 auto', maxWidth: '100%', background: isChild ? 'default' : '#ffffff', borderRadius: isChild ? '0' : '30px',
          }}
          >
            {!isChild && <p className="adult-results-text">Here are some books we think you would love!</p>}
            {/* <BookList books={recommendedBooks} /> */}
            <Carousel
              elementArray={recommendedBooks}
              slidesAtATime={6}
              prevArrow={LeftArrow}
              nextArrow={RightArrow}
              widthPercent={100}
              spaceBetweenEntries={16}
            />
          </div>
        </div>
        {!isChild && <img src={AdultCloudImage} style={{ position: 'relative', bottom: '160px' }} alt="clouds enveloping the recommendations" />}
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
