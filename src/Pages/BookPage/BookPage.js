import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardMedia, CardContent, Typography, Paper,
} from '@mui/material';
import './BookPage.css';

const Airtable = require('airtable');

/* This is the default image if TCK forgets to populate the image field. */
const TCK_LOGO = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/119db2be-192f-4a50-94ff-2c4f021384e3/TCK_PNG_Logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220124T032111Z&X-Amz-Expires=86400&X-Amz-Signature=bf863cbd890a1ac3d8ef071ad1b02652642ae24de0e5f10c6fcc4bfcef62a97f&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22TCK%2520PNG%2520Logo.png%22&x-id=GetObject';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY })
  .base(process.env.REACT_APP_AIRTABLE_BASE_KEY);

function BookPage({ bookId }) {
  const [book, setBook] = useState();
  const [author, setAuthor] = useState();
  const [illustrator, setIllustrator] = useState();

  useEffect(() => {
    const getEntry = async (tableName, entryId, setter) => new Promise((resolve, reject) => {
      base(tableName).find(entryId, (err, entryRecord) => {
        if (err) {
          reject();
        }
        setter(entryRecord);
        resolve(entryRecord);
      });
    });

    const getEntries = async () => {
      const bookRecord = await getEntry('Book', bookId, setBook);
      const authorId = bookRecord.get('author');
      const illustratorId = bookRecord.get('illustrator');
      getEntry('Creator', authorId, setAuthor);

      getEntry('Creator', illustratorId, setIllustrator);
    };
    getEntries();
  }, [bookId]); // Runs on mount and on change of bookId

  const getDefault = (x, defaultX) => {
    if (x) {
      return x;
    }
    return defaultX;
  };

  if (book && author && illustrator) {
    const title = getDefault(book.get('title'), 'Untitled Book');
    const authorName = getDefault(author.get('name'), 'Unknown Author');
    const illustratorName = getDefault(illustrator.get('name'), 'Unknown Illustrator');
    const desc = getDefault(book.get('description'), 'It\'s a book. with words. **gasp**');
    const image = getDefault(book.get('image'), [{ url: TCK_LOGO }]);
    const imageURL = image[0].url;

    const synopsis = (
      <div className="synopsis">
        <CardMedia
          component="img"
          image={imageURL}
          height="140"
          alt="book img desc"
        />
        <Card variant="outlined" sx={{ minWidth: '50vw', textAlign: 'left', display: 'flex' }}>
          <CardContent>
            <Typography gutterBottom variant="h3" sx={{ marginBottom: '0' }}>
              {title}
            </Typography>
            <Typography variant="h5">
              {authorName}
              {' '}
              |
              {' '}
              {illustratorName}
              {' '}
              (illustrator)
            </Typography>
            <Typography variant="body2">
              {desc}
            </Typography>
          </CardContent>
        </Card>

      </div>
    );

    /*
      readAloud := youtube embed
      bookshop := link to bookshop
      educator := link to educator guide
    */

    return (
      <Paper variant="outlined">
        {synopsis}
      </Paper>
    );
  }
  return <div>Loading!</div>;
}

BookPage.propTypes = {
  bookId: PropTypes.string.isRequired,
};

export default BookPage;

/* Notes for future development
  1. For tags, use MaterialUI chips
*/
