import React, { useState, useEffect } from 'react';
import {
  Paper, Link as LinkUI, List, ListItem, ListItemText,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import BookSynopsis from '../Components/BookPage/BookSynopsis';
import Logo from '../Assets/Images/TCK PNG Logo.png';

const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY })
  .base(process.env.REACT_APP_AIRTABLE_BASE_KEY);

function BookPage() {
  const [book, setBook] = useState();
  const [author, setAuthor] = useState();
  const [illustrator, setIllustrator] = useState();

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

  // This is similar to promise chaining with .then() calls,
  // but in a (hopefully) more succinct way
  const getEntries = async () => {
    const bookRecord = await getEntry('Book', bookId, setBook);
    const authorId = bookRecord.get('author');
    const illustratorId = bookRecord.get('illustrator');
    getEntry('Creator', authorId, setAuthor);

    getEntry('Creator', illustratorId, setIllustrator);
  };
  useEffect(getEntries, [bookId]); // Runs on mount and on change of bookId

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
    title,
    authorName,
    authorID,
    illustratorName,
    illustratorID,
    desc,
    imageURL,
    bookshopURL,
    readAloudURL,
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
        <div>
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

  OLD CODE:

*/
