import React, { useState, useEffect } from 'react';
import CardsDisplay from '../Components/BookBrowser/BookHub';
import CollectionsCarousel from '../Components/CollectionsComponents/CollectionsCarousel';
import LeftArrow from '../Assets/Images/left-arrow-author-page.svg';
import RightArrow from '../Assets/Images/right-arrow-author-page.svg';
import './PagesTemp.css';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function Home() {
  const [collections, setCollections] = useState([]);
  const getCollections = () => {
    base('Collection').select({ view: 'Grid view' }).all() // Gets + returns all records
      .then((records) => { // Takes in returned records + calls setPosts to store in posts arr
        setCollections(records);
      });
  };

  useEffect(getCollections, []);
  return (
    <div>
      <h1 className="headings">Book Recommendation Hub</h1>
      <h2 className="headings">Collections</h2>
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
      <h2 className="headings">Books</h2>
      <CardsDisplay />
    </div>
  );
}

export default Home;
