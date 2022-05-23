import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CollectionsCarousel from '../Components/CollectionsComponents/CollectionsCarousel';
import Carousel from '../Components/CreatorPage/BookCarousel';
import LeftArrow from '../Assets/Images/left-arrow.svg';
import RightArrow from '../Assets/Images/right-arrow.svg';
import './PagesTemp.css';

// Airtable Configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const styles = {
  buttonStack: {
    backgroundColor: '#EAF3FE',
    color: '#1A296A',
    padding: '10px',
    width: '12vw',
    borderRadius: '10px',
    fontfamily: 'Work Sans',
    fontSize: '15px',
    textTransform: 'none',
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
};

// main function
function Home() {
  const [collections, setCollections] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  // Collections Carousel part
  const getCollections = () => {
    base('Collection').select({ view: 'Grid view' }).all() // Gets + returns all records
      .then((records) => { // Takes in returned records + calls setPosts to store in posts arr
        setCollections(records);
      });
  };

  // New Releases filter function
  // filters for the first 14 books sorted by latest publishing date
  const NewReleasesFunction = () => new Promise((resolve, reject) => {
    base('Book').select({
      sort: [{ field: 'date_added', direction: 'desc' }],
      maxRecords: 14,
      view: 'Grid view',
    }).all().then((records) => {
      let tempArr = [];
      records.forEach((record) => {
        const tempObj = {
          author: (record.fields.author !== undefined ? record.fields.author : ['MISSING CREATOR']),
          image: (record.fields.image !== undefined ? record.fields.image[0].url : ''),
          title: (record.fields.title !== undefined ? record.fields.title : 'No Title'),
          id: record.id,
        };
        tempArr = [...tempArr, tempObj];
      });
      resolve(tempArr);
    }, (err) => {
      if (err) { reject(err); }
    });
  });

  const fetchNewReleases = async () => {
    const tempReleases = await NewReleasesFunction();
    setNewReleases(tempReleases);
  };

  useEffect(() => {
    getCollections();
    fetchNewReleases();
  }, []);

  /* This is all the code for the feature displays! Making so many airtable calls at once,
  causes rate limit issues, so we will have to refine the implementation later.

  const [featuredCollections, setFeaturedCollections] = useState([]);

  // sub asyn function to grab a singular book from the base!
  const getBook = (id) => new Promise((resolve, reject) => {
    base('Book').find(id, (error, record) => {
      if (error) {
        reject(error);
      }
      const tempObj = {
        author: (record.fields.author !== undefined ? record.fields.author : ['MISSING CREATOR']),
        image: (record.fields.image !== undefined ? record.fields.image[0].url : ''),
        title: (record.fields.title !== undefined ? record.fields.title : 'No Title'),
        id: record.id,
      };
      resolve(tempObj);
    });
  });

  const getFeaturedCollections = async () => {
    const tempCollectionObject = {};
    collections.filter((collection) => collection.fields.featured).forEach(async (collection) => {
      tempCollectionObject[collection.id] = {
        name: collection.fields.name,
        books: [],
      };

      const { books } = collection.fields;

      if (books.length) {
        const tempArr = await Promise.all(books.map(async (book) => getBook(book)));
        tempCollectionObject[collection.id].books = tempArr;
      }
      setFeaturedCollections(tempCollectionObject);
    });
  };

  async function fetchFeaturedCollections() {
    if (collections.length) {
      await getFeaturedCollections();
    }
  }

  useEffect(() => {
    fetchFeaturedCollections();
  }, [collections]);
  */

  return (
    <div>
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
      <div className="home-screen-background">
        <div className="hero-text">
          Discover books by and about
          <br />
          marginalized groups
        </div>
        <div className="subtext">
          Get started with our Book Rec Quiz to get a personalized
          <br />
          recommendation
          or use our Book Browser to start your search.
        </div>
        <Stack
          direction="row"
          spacing={3}
          alignSelf="center"
        >
          <Button component={NavLink} to="/quiz" sx={styles.buttonStack} variant="contained">Take The Quiz</Button>
          <Button component={NavLink} to="/browser" sx={styles.buttonStack} variant="contained">Start Your Search</Button>
        </Stack>
      </div>
      {newReleases && (
        <>
          <h2 className="headings">New Releases</h2>
          <Carousel
            elementArray={newReleases}
            slidesAtATime={7}
            prevArrow={LeftArrow}
            nextArrow={RightArrow}
            widthPercent={100}
            spaceBetweenEntries={16}
          />
        </>
      )}
      { /* featuredCollections.length && featuredCollections.map((collection) => (
        <>
          <h2 className="headings">{collection.name}</h2>
          <Carousel
            elementArray={collection.books}
            slidesAtATime={7}
            prevArrow={LeftArrow}
            nextArrow={RightArrow}
            widthPercent={100}
            spaceBetweenEntries={16}
          />
        </>
      )) */}
    </div>
  );
}

export default Home;

/*
Notes:

The code as is does not seem to work due to airtable rate limits. There
are calls for collections, books and authors for each component, and for even one
person to run the page it seems to exceed the limit. We can attempt to batch the
calls to avoid these errors, but it would probably be wise to consider whether this
is worth it at all.
*/
