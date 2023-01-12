import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CollectionsCarousel from '../Components/CollectionsComponents/CollectionsCarousel';
import Carousel from '../Components/CreatorPage/BookCarousel';
import LeftArrow from '../Assets/Images/left-arrow.png';
import RightArrow from '../Assets/Images/right-arrow.png';
import AboutTCK from '../Assets/Images/about-tck.png';
import './Home.css';

// Airtable Configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const styles = {
  buttons: {
    backgroundColor: '#FFFFFF',
    color: '#1A296A',
    padding: '10px',
    width: '200px',
    borderRadius: '10px',
    fontfamily: 'Work Sans',
    fontSize: '15px',
    textTransform: 'none',
    fontWeight: 'bold',
    fontStyle: 'normal',
    margin: '7.5px',
    '@media (max-width: 700px)': {
      width: '80vw',
    },
    '&.MuiButtonBase-root:hover': {
      bgcolor: '#EAF3FE',
      color: '#393EBA',
      borderColor: '#393EBA',
    },
  },
  buttonStack: {
    '@media (max-width: 700px)': {
      width: '90vw',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
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
      sort: [{ field: 'date_published', direction: 'desc' }],
      maxRecords: 14,
      view: 'Grid view',
    }).all().then((records) => {
      let tempArr = [];
      records.forEach((record) => {
        const tempObj = {
          author: { name: record.fields.author_name !== undefined ? record.fields.author_name : ['MISSING CREATOR'], id: record.fields.author !== undefined ? record.fields.author : ['MISSING CREATOR'] },
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

  return (
    <div>
      <div className="home-screen-carousel">
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
      </div>
      <div className="home-screen-background">
        <div className="hero-text">
          Welcome to The Conscious Kid&apos;s Book Library
        </div>
        <div className="subtext">
          Get started with our Book Finder Quiz to get a personalized recommendation
          or use our Book Search to start your search!
        </div>
        <Stack
          direction="row"
          alignSelf="center"
          sx={styles.buttonStack}
        >
          <Button component={NavLink} to="/quiz" sx={styles.buttons} variant="contained">Take The Quiz</Button>
          <Button component={NavLink} to="/browser" sx={styles.buttons} variant="contained">Start Your Search</Button>
        </Stack>
      </div>
      {
        newReleases && (
          <>
            <h3 className="headings">New Releases</h3>
            <Carousel
              elementArray={newReleases}
              slidesAtATime={6}
              prevArrow={LeftArrow}
              nextArrow={RightArrow}
              widthPercent={100}
              spaceBetweenEntries={16}
            />
          </>
        )
      }
      <h2 className="about-section-header">About The Conscious Kid</h2>
      <div className="about-section">
        <img
          className="about-image"
          src={AboutTCK}
          alt="Covers of books TCK has recommended tiled diagonally, signifying TCK's commitment to increasing access to accessible books"
        />
        <div className="about-section-text">
          The Conscious Kid supports families and educators in fostering healthy identity
          development and taking action to disrupt racism, inequity and bias. Through our
          Anti-Racist Children&apos;s Book Fund, we have donated over 200,000 children&apos;s
          books to 5,000 schools in all 50 states. Learn more about our work and find additional
          resources
          {' '}
          <a href="https://www.theconsciouskid.org/">here</a>
          .
          <br />
          <br />
          The purpose of this database is to create a space where kids, families and educators can
          find empowering books by and about underrepresented and marginalized communities. These
          books are not always included or centered in classrooms, homes or libraries, and we wanted
          to create a free and accessible way to identify and increase awareness of these titles.
          The site was developed and designed by UCLA student-group,
          {' '}
          <a href="https://lablueprint.org/">LA Blueprint</a>
          .
        </div>
      </div>
    </div>
  );
}

export default Home;

/*
Notes:

The initial design included another carousel of books (similar to the New Releases) for each of the
featured collections. Unfortunately, that implementation does not work due to airtable rate limits.
For even a single person to run the page, it exceeeded the limit. Future devs could attempt to
batch the calls, but with our time constraints, we opted to remove the feature instead. Here is
the code we had:

Within the function body:

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

Within the return statement:

  { featuredCollections.length && featuredCollections.map((collection) => (
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
  )) }

*/
