import React, { useState, useEffect } from 'react';
import {
  Paper, ListItem, ListItemText, Box,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import BookSynopsis from '../Components/BookPage/BookSynopsis';
import CollectionsCarousel from '../Components/CollectionsComponents/CollectionsCarousel';
import Logo from '../Assets/Images/TCK PNG Logo.png';
import LeftArrow from '../Assets/Images/left-arrow-author-page.svg';
import RightArrow from '../Assets/Images/right-arrow-author-page.svg';

const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY })
  .base(process.env.REACT_APP_AIRTABLE_BASE_KEY);

const styles = {
  iframeContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    paddingTop: '56.25%',
    margin: '0 auto 0 auto',
  },
  iframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    width: '75%',
    height: '75%',
    margin: '0 auto 0 auto',
  },
};

function BookPage() {
  const [book, setBook] = useState();
  const [author, setAuthor] = useState();
  const [illustrator, setIllustrator] = useState();
  const [collections, setCollections] = useState([]);

  //  Grab collections
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
  let desc = 'It\'s a good book. A great book, even. 📖';
  let image;
  let readAloudURL;
  let bookshopURL;
  let educatorURLs;
  let identityTags;
  let ageMin;
  let ageMax;
  let gradeMin;
  let gradeMax;

  if (book) {
    title = (book.get('title')) ? book.get('title') : title;
    desc = (book.get('description')) ? book.get('description') : desc;
    image = (book.get('image')) ? book.get('image') : [{ url: Logo }];
    readAloudURL = (book.get('read_aloud_link')) ? book.get('read_aloud_link') : null;
    bookshopURL = (book.get('bookshop_link')) ? book.get('bookshop_link') : null;
    educatorURLs = (book.get('educator_guide_links')) ? book.get('educator_guide_links').split('\n') : [];
    identityTags = (book.get('identity_tags')) ? book.get('identity_tags') : [];
    ageMin = (book.get('age_min')) ? book.get('age_min') : -1;
    ageMax = (book.get('age_max')) ? book.get('age_max') : -1;
    gradeMin = (book.get('grade_min')) ? book.get('grade_min') : -1;
    gradeMax = (book.get('grade_max')) ? book.get('grade_max') : -1;
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
    identityTags,
    ageMin,
    ageMax,
    gradeMin,
    gradeMax,
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
      <BookSynopsis {...synopsisProps} />
      {(readAloudURL) ? (
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
      ) : <div />}
    </Paper>
  );
}

export default BookPage;

/* Notes for future development
  Educator Guide:
    What to do when there is more than one?
    Currently only supports one educator guide

  Books Like This:
    Need to add once it is completed

  See More:
    Need to implement

  Default value for description:
    current is "It's a book. with words. **gasp**"
*/
