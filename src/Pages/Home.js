import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CollectionsCarousel from '../Components/CollectionsComponents/CollectionsCarousel';
import Carousel from '../Components/CreatorPage/BookCarousel';
import LeftArrow from '../Assets/Images/left-arrow.svg';
import RightArrow from '../Assets/Images/right-arrow.svg';
import './PagesTemp.css';
// import homescreenIllustration from '../Assets/Images/(temporary) TCK Browser Illustration.png';

// Airtable Configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

// main function
function Home() {
  const [collections, setCollections] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [featuredCollections, setFeaturedCollections] = useState([]);

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

  // Featured Collections
  // filters for the first 14 books of each 'featured' collection
  const featured = collections.filter((collection) => collection.fields.featured);

  // this fx doesn't work because it has many places where we must wait for an airtable call,
  // but I am v tired so we can continue tmrw!

  const getFeaturedCollections = () => new Promise((resolve, reject) => {
    const tempCollectionObject = {};
    featured.forEach((collection) => {
      tempCollectionObject[collection.id] = {
        name: collection.fields.name,
        books: [],
      };
      let tempArr = [];

      collection.fields.books.forEach((book) => {
        base('Book').find(book, (error, record) => {
          if (error) {
            reject(error);
          }
          const tempObj = {
            author: (record.fields.author !== undefined ? record.fields.author : ['MISSING CREATOR']),
            image: (record.fields.image !== undefined ? record.fields.image[0].url : ''),
            title: (record.fields.title !== undefined ? record.fields.title : 'No Title'),
            id: record.id,
          };
          tempArr = [...tempArr, tempObj];
        });
        tempCollectionObject[collection.id].books = tempArr;
      });
    });
    resolve(tempCollectionObject);
  });

  async function fetchData() {
    const tempReleases = await NewReleasesFunction();
    setNewReleases(tempReleases);

    const tempCollections = await getFeaturedCollections();
    setFeaturedCollections(tempCollections);
  }

  useEffect(() => {
    getCollections();
    fetchData();
  }, []);

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
        {/* <img src={homescreenIllustration} alt="homescreen illustration" /> */}
        <h1 className="main-text">
          Discover books by and about
          <br />
          marginalized groups
        </h1>
        <p className="main-text">
          Get started with our Book Rec Quiz to get a personalized
          <br />
          recommendation
          or use our Book Browser to start your search.
        </p>
        <Stack
          direction="row"
          spacing={2}
          alignSelf="center"
        >
          <Button className="button-stack" variant="contained">Take The Quiz</Button>
          <Button className="button-stack" variant="contained">Start Your Search</Button>
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
      { featuredCollections.map((collection) => (
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
      ))}
      <h2 className="headings">Black History Month</h2>
      <h2 className="headings">Stories by Latinx Authors</h2>
    </div>
  );
}

export default Home;
