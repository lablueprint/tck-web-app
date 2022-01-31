import React, { useState, useEffect } from 'react';
import {
  Card, CardMedia, CardContent, Typography, Paper, Link as LinkUI, List, ListItem, ListItemText,
} from '@mui/material';
import { useParams } from 'react-router-dom';

const Airtable = require('airtable');

/* This is the default image if TCK forgets to populate the image field. */
const TCK_LOGO = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/119db2be-192f-4a50-94ff-2c4f021384e3/TCK_PNG_Logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220124T032111Z&X-Amz-Expires=86400&X-Amz-Signature=bf863cbd890a1ac3d8ef071ad1b02652642ae24de0e5f10c6fcc4bfcef62a97f&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22TCK%2520PNG%2520Logo.png%22&x-id=GetObject';

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
  useEffect(() => {
    getEntries();
  }, [bookId]); // Runs on mount and on change of bookId

  if (book && author && illustrator) {
    const title = (book.get('title')) ? book.get('title') : 'Untitled Book';
    const authorName = (author.get('name')) ? author.get('name') : 'Unknown Author';
    const illustratorName = (illustrator.get('name')) ? illustrator.get('name') : 'Unknown Illustrator';
    const desc = (book.get('description')) ? book.get('description') : 'It\'s a book. with words. **gasp**';
    const image = (book.get('image')) ? book.get('image') : [{ url: TCK_LOGO }];
    const imageURL = image[0].url;
    const readAloudURL = (book.get('read_aloud_link')) ? book.get('read_aloud_link') : null;
    const bookshopURL = (book.get('bookshop_link')) ? book.get('bookshop_link') : null;
    const educatorURLs = (book.get('educator_guide_links')) ? book.get('educator_guide_links') : [];

    const synopsis = (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <CardMedia
          component="img"
          image={imageURL}
          height="140"
          alt="book img desc"
        />
        <Card sx={{ minWidth: '50vw', textAlign: 'left', display: 'flex' }}>
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

    /* READ_ALOUD EMBED */
    let readAloud = (<div />);
    if (readAloudURL) {
      /*
        read_aloud_link is defined as a 'watch' URL,
        so we must extract the embed code from this URL
          WARNING: This code will break if the read_aloud_link
          is not in the form of (anything)('watch?v=')(video id)$
      */
      const videoId = readAloudURL.split('watch?v=')[1];
      readAloud = (
        <div className="video-responsive">
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      );
    }

    /* BOOKSHOP LINK, LinkUI from MaterialUI to not be confused with react-router */
    let bookshop = <div />;
    if (bookshopURL) {
      bookshop = (
        <LinkUI href={bookshopURL} rel="noreferrer" target="_blank">
          Buy
          {' '}
          {title}
          !
        </LinkUI>
      );
    }

    /* EDUCATOR GUIDE LINK */
    let educators = <div />;
    if (educatorURLs) {
      educators = (
        <List>
          {educatorURLs.map((url) => (
            <ListItem button component="a" href={url} key={url} alignItems="center">
              <ListItemText sx={{ textAlign: 'center' }} primary={url} />
            </ListItem>
          ))}
        </List>
      );
    }

    return (
      <Paper variant="outlined">
        {synopsis}
        {readAloud}
        {bookshop}
        <h4>Educator Guides</h4>
        {educators}
      </Paper>
    );
  }
  return <div>Scouring our library...</div>;
}

export default BookPage;

/* Notes for future development
  1. For tags, use MaterialUI chips
*/
