import React, { useState, useEffect } from 'react';
import {
  Paper, Box,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import BookSynopsis from '../Components/BookPage/BookSynopsis';
import CollectionsCarousel from '../Components/CollectionsComponents/CollectionsCarousel';
import BooksLikeThis from '../Components/BookPage/BooksLikeThis';

import Logo from '../Assets/Images/TCK PNG Logo.png';
import RightArrow from '../Assets/Images/right-arrow.svg';
import LeftArrow from '../Assets/Images/left-arrow.svg';

const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY })
  .base(process.env.REACT_APP_AIRTABLE_BASE_KEY);

const styles = {
  readAloud: {
    overflow: 'auto',
    width: '75%',
    margin: 'auto',
  },
  iframeContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    paddingTop: '56.25%',
    margin: '0 auto 5vh auto',
  },
  iframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    width: '100%',
    height: '100%',
    margin: '0 auto 0 auto',
  },
  carouselContainer: {
    outline: 'none',
    background: 'rgba(244, 244, 244, 0.98)',
    backdropFilter: 'blur(20px)',
    margin: 'auto',
    boxShadow: '0',
    padding: '2vh 0 2vh 0',
  },
  bookContainer: {
    // background-color: '#FCFCFC',
    background: 'linear-gradient(180deg, rgba(204, 216, 218, 0) 0%, rgba(204, 216, 218, 0.15) 100%)',
  },
};

function BookPage() {
  const [book, setBook] = useState();
  const [author, setAuthor] = useState([]); // array holding author records
  const [illustrator, setIllustrator] = useState([]); // array holding illustrator records
  const [collections, setCollections] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  /*
  We want to know if Airtable call failed       (!book && isLoaded)
      or          if Airtable call succeeded    (book && isLoaded)
      or          if Airtable call in progr4ess (!book && !isLoaded)
  */

  //  Grab collections for header
  const getCollections = () => {
    base('Collection').select({ view: 'Grid view' }).all() // Gets + returns all records
      .then((records) => { // Takes in returned records + calls setPosts to store in posts arr
        setCollections(records);
      });
  };
  useEffect(getCollections, []);

  // Instead of using props, we pull bookId from URL
  const params = useParams();
  const { bookId } = params;

  const getEntry = async (tableName, entryId, setter) => new Promise((resolve, reject) => {
    base(tableName).find(entryId, (err, entryRecord) => {
      if (tableName === 'Book') setIsLoaded(true);
      if (err) {
        reject();
      }
      setter(entryRecord);
      resolve(entryRecord);
    });
  });
  // Add book to localStorage
  function pushToStorage() {
    const bookArr = JSON.parse(localStorage.getItem('Recently Viewed'));

    // check if localStorage contains books
    if (bookArr) {
      // check if book already in localStorage
      if (bookArr.includes(bookId)) {
        // remove book and add to front
        const index = bookArr.indexOf(bookId);
        if (index > -1) {
          bookArr.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
      bookArr.unshift(bookId);
      if (bookArr.length > 14) {
        bookArr.pop();
      }
      localStorage.setItem('Recently Viewed', JSON.stringify(bookArr));
    } else {
      const bookArrTemp = [];
      bookArrTemp.push(bookId);
      localStorage.setItem('Recently Viewed', JSON.stringify(bookArrTemp));
    }
  }

  // This is similar to promise chaining with .then() calls,
  // but in a (hopefully) more succinct way
  const getEntries = async () => {
    const bookRecord = await getEntry('Book', bookId, setBook);
    const authorIDs = bookRecord.get('author');
    const illustratorIDs = bookRecord.get('illustrator');

    // Curried function so we can create different function compositions as seen below
    const setNewCreator = (setter) => (newCreator) => {
      setter((prevState) => [...prevState, newCreator]);
    };

    const creatorEntries = [];

    authorIDs.forEach((id) => {
      creatorEntries.push(getEntry('Creator', id, setNewCreator(setAuthor)));
    });

    illustratorIDs.forEach((id) => {
      creatorEntries.push(getEntry('Creator', id, setNewCreator(setIllustrator)));
    });

    await Promise.all(creatorEntries);
  };

  useEffect(() => {
    pushToStorage();
    getEntries();
  }, [bookId]); // Runs on mount and on change of bookId

  // This is for when we are WAITING for Airtable response
  // We return here before we try to do any bad data accesses
  if (!book && !isLoaded) {
    return <div>Loading! 🤖</div>;
  }
  // This is for when Airtable call fails
  if (!book && isLoaded) {
    return (<h1>{'Sorry, we couldn\'t retrieve this book from our library 😔'}</h1>);
  }

  /* DEFAULT VALUES FOR DATA PULLED FROM BOOK RECORD
      - some values are saved to be put in terniary operator further below
      - These are arbitrary default values for when fields are missing
  */
  let title = 'Untitled Book';
  const authorName = 'Unknown Author';
  const authorID = '';
  const illustratorName = 'Unknown Illustrator';
  const illustratorID = '';
  let desc = 'It\'s a book. with words. **gasp**';
  let image;
  let readAloudURL;
  let bookshopURL;
  let educatorURLs;
  let identityTags;
  let raceEthnicity;
  let genre;
  let themesLessons;
  let religion;

  let ageMin;
  let ageMax;
  let gradeMin;
  let gradeMax;
  let bookType;
  let datePublished;

  if (book) {
    // Cautiously pull data from book if we got something not undefined
    title = (book.get('title')) ? book.get('title') : title;
    desc = (book.get('description')) ? book.get('description') : desc;
    image = (book.get('image')) ? book.get('image') : [{ url: Logo }];
    readAloudURL = (book.get('read_aloud_link')) ? book.get('read_aloud_link') : null;
    bookshopURL = (book.get('bookshop_link')) ? book.get('bookshop_link') : null;
    educatorURLs = (book.get('educator_guide_link')) ? book.get('educator_guide_link').split('\n') : [];
    identityTags = (book.get('identity_tags')) ? book.get('identity_tags') : [];
    raceEthnicity = (book.get('race/ethnicity')) ? book.get('race/ethnicity') : [];
    genre = (book.get('genre')) ? book.get('genre') : [];
    themesLessons = (book.get('themes/lessons')) ? book.get('themes/lessons') : [];
    religion = (book.get('religion')) ? book.get('religion') : [];
    ageMin = (book.get('age_min')) ? book.get('age_min') : -1;
    ageMax = (book.get('age_max')) ? book.get('age_max') : -1;
    gradeMin = (book.get('grade_min')) ? book.get('grade_min') : -1;
    gradeMax = (book.get('grade_max')) ? book.get('grade_max') : -1;
    bookType = (book.get('book_type')) ? book.get('book_type') : [];
    datePublished = (book.get('date_published')) ? book.get('date_published') : '';
  }

  let authors = [];
  if (author) {
    // Cautiously pull data from author array if we got nonempty array
    // and format into neater object
    authors = author.map((x) => ({
      name: (x.get('name')) ? x.get('name') : authorName,
      id: (x.get('id')) ? x.get('id') : authorID,
    }));
  }

  let illustrators = [];
  if (illustrator) {
    // Cautiously pull data from illustrator array if we got nonempty array
    // and format into neater object
    illustrators = illustrator.map((x) => ({
      name: (x.get('name')) ? x.get('name') : illustratorName,
      id: (x.get('id')) ? x.get('id') : illustratorID,
    }));
  }

  const imageURL = image[0].url;

  const isValidUrl = (string) => {
    /* Validate url given by TCK. URL must start with http or https protocol. */
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  };
  educatorURLs.filter((string) => isValidUrl(string));

  const synopsisProps = {
    title,
    authorName,
    authorID,
    illustratorName,
    illustratorID,
    desc,
    imageURL,
    bookshopURL,
    readAloudURL,
    educatorURLs,
    identityTags,
    raceEthnicity,
    genre,
    themesLessons,
    religion,
    ageMin,
    ageMax,
    gradeMin,
    gradeMax,
    authors,
    illustrators,
    bookType,
    datePublished,
  };

  return (
    <>
      <Paper elevation={0} sx={styles.bookContainer}>
        <Paper sx={styles.carouselContainer}>
          <CollectionsCarousel
            elementArray={collections}
            slidesAtATime={6}
            prevArrow={LeftArrow}
            nextArrow={RightArrow}
            widthPercent={100}
            spaceBetweenEntries={16}
            swiperHeight={120}
            cardImageHeightPercent={80}
            cardImageWidthPercent={80}
          />
        </Paper>
        <BookSynopsis {...synopsisProps} />
        {(readAloudURL) && (
          <Box sx={styles.readAloud}>
            <Box sx={styles.iframeContainer}>
              <iframe
                style={styles.iframe}
                src={`https://www.youtube.com/embed/${readAloudURL.split('watch?v=')[1]}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </Box>
          </Box>
        ) }
      </Paper>
      {book && (
      <BooksLikeThis
        bookId={book.id}
        minAge={ageMin}
        maxAge={ageMax}
        minGrade={gradeMin}
        maxGrade={gradeMax}
        raceEthnicity={raceEthnicity}
        genre={genre}
        bookType={bookType}
      />
      )}
    </>
  );
}

export default BookPage;
