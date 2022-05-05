import React, { useState, useEffect } from 'react';
import {
  Paper, Link as LinkUI, List, ListItem, ListItemText,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import BookSynopsis from '../Components/BookPage/BookSynopsis';
import Logo from '../Assets/Images/TCK PNG Logo.png';
// import RightArrow from '../Assets/Images/right-arrow.svg';
// import LeftArrow from '../Assets/Images/left-arrow.svg';
// import Carousel from '../Components/CreatorPage/BookCarousel';
import RecFilter from '../Components/Recommendations/BookRec';

const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY })
  .base(process.env.REACT_APP_AIRTABLE_BASE_KEY);

function BookPage() {
  const [book, setBook] = useState();
  const [author, setAuthor] = useState();
  const [illustrator, setIllustrator] = useState();
  const [booksLikeThis, setBooksLikeThis] = useState([]);

  // Instead of using props, we pull bookId from URL
  const params = useParams();
  const { bookId } = params;

  const getEntry = async (tableName, entryId, setter) => new Promise((resolve, reject) => {
    base(tableName).find(entryId, (err, entryRecord) => {
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
    const authorId = bookRecord.get('author');
    const illustratorId = bookRecord.get('illustrator');
    getEntry('Creator', authorId, setAuthor);

    getEntry('Creator', illustratorId, setIllustrator);
  };

  const getBooksLikeThis = () => {
    if (book) {
      const recList = RecFilter(
        book.fields.id,
        book.fields.age_min,
        book.fields.age_max,
        book.fields.grade_min,
        book.fields.grade_max,
        book.fields['race/ethnicity'],
        book.fields.genre,
      );
      /*
        iterate through list
          -> fetch name of author from table
          -> append object of book carousel format to (state: booksLikeThis)
      */
    }
  };

  useEffect(() => {
    pushToStorage();
    getEntries();
  }, [bookId]); // Runs on mount and on change of bookId

  useEffect(() => {
    getBooksLikeThis();
    console.log(booksLikeThis);
  }, [book]);

  if (!book) {
    return <div>Scouring our library...</div>;
  }

  let title = 'Untitled Book';
  let authorName = 'Unknown Author';
  let authorID = '';
  let illustratorName = 'Unknown Illustrator';
  let illustratorID = '';
  let desc = 'It\'s a book. with words. **gasp**';
  let image;
  let readAloudURL;
  let bookshopURL;
  let educatorURLs;

  if (book) {
    title = (book.get('title')) ? book.get('title') : title;
    desc = (book.get('description')) ? book.get('description') : desc;
    image = (book.get('image')) ? book.get('image') : [{ url: Logo }];
    readAloudURL = (book.get('read_aloud_link')) ? book.get('read_aloud_link') : null;
    bookshopURL = (book.get('bookshop_link')) ? book.get('bookshop_link') : null;
    educatorURLs = (book.get('educator_guide_links')) ? book.get('educator_guide_links').split('\n') : [];
  }

  if (author) {
    authorName = (author.get('name')) ? author.get('name') : authorName;
    authorID = (author.get('id')) ? author.get('id') : authorID;
  }

  if (illustrator) {
    illustratorName = (illustrator.get('name')) ? illustrator.get('name') : illustratorName;
    illustratorID = (illustrator.get('id')) ? illustrator.get('id') : illustratorID;
  }

  const imageURL = image[0].url;

  const synopsisProps = {
    title, authorName, authorID, illustratorName, illustratorID, desc, imageURL,
  };

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

  const educatorLinks = educatorURLs.map((url) => (
    <ListItem button component="a" href={url} key={url} alignItems="center">
      <ListItemText sx={{ textAlign: 'center' }} primary={url} />
    </ListItem>
  ));

  educatorLinks.filter((string) => isValidUrl(string));

  if (title === 'Untitled Book') {
    return (<h1>{'Sorry, we couldn\'t retrieve this book from our library 😔'}</h1>);
  }

  return (
    <Paper variant="outlined">
      <BookSynopsis {...synopsisProps} />
      {(readAloudURL) ? (
        <div className="video-responsive">
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${readAloudURL.split('watch?v=')[1]}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      ) : <div />}
      {(bookshopURL) ? (
        <LinkUI href={bookshopURL} rel="noreferrer" target="_blank">
          Buy
          {' '}
          {title}
          !
        </LinkUI>
      ) : <div />}
      <h4>Educator Guides</h4>
      {(educatorURLs)
        ? (
          <List>
            {educatorLinks}
          </List>
        ) : <div />}
    </Paper>
  );
}

export default BookPage;

/* Notes for future development
  1. For tags, use MaterialUI chips
  2. Q: For when Book or Creator is missing, do we want to display defaults or raise error
      saying that we couldn't pull the correct information for this entry?
        - What is the necessary condition when we should *not* display available info
          and just say that we couldn't pull the correct info?
            - Currently when there is no book title
*/
