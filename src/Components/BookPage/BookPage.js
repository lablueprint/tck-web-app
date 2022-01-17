import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardMedia, CardContent, Typography, Rating, Button,
} from '@mui/material';
import './BookPage.css';

const Airtable = require('airtable');

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

  if (book && author && illustrator) {
    const title = book.get('title');
    const authorName = author.get('name');
    const illustratorName = illustrator.get('name');
    const desc = book.get('description');
    const image = book.get('image');
    const imageURL = image[0].url;

    return (
      <div className="BookPage">
        <Card>
          <CardMedia
            component="img"
            image={imageURL}
            height="140"
            alt="book img desc"
          />
          <CardContent sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
          }}
          >
            <Button variant="outlined">
              Want to read
            </Button>
            <Rating name="simple-controlled" value={3} precision={0.5} />
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ minWidth: '50vw', textAlign: 'left' }}>
          <CardContent>
            <Typography gutterBottom variant="h3">
              {title}
            </Typography>
            <Typography variant="h5">
              by
              {' '}
              {authorName}
              ,
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
    return (
      <div>
        {title}
        ,
        {' '}
        {imageURL}
      </div>
    );
    */
  }
  return <div>Loading!</div>;
}

BookPage.propTypes = {
  bookId: PropTypes.string.isRequired,
};

export default BookPage;
