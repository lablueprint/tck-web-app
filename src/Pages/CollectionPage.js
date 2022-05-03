import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CollectionInfo from '../Components/CollectionPage/CollectionInfo';
import BooksInCollection from '../Components/CollectionPage/BooksInCollection';
import CollectionsCarousel from '../Components/CollectionsComponents/CollectionsCarousel';
import PrevArrow from '../Assets/Images/electric-boogaloo-previous-arrow.svg';
import NextArrow from '../Assets/Images/electric-boogaloo-next-arrow.svg';
import '../Components/CollectionPage/CollectionPage.css';
// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function CollectionPage() {
  const [CollectionDetails, setCollectionDetails] = useState();
  const params = useParams();
  const [collecID, setCollecID] = useState(params.id);
  const [collections, setCollections] = useState([]);
  const getCollections = () => {
    base('Collection').select({ view: 'Grid view' }).all() // Gets + returns all records
      .then((records) => { // Takes in returned records + calls setPosts to store in posts arr
        setCollections(records);
      });
  };
  const getCollectionUsingID = () => {
    base('Collection').find(
      collecID,
      (err, record) => {
        setCollectionDetails(record);
      },
    );
  };

  const updateCollecID = useCallback((newValue) => setCollecID(newValue), [setCollecID]);

  useEffect(getCollectionUsingID, [collecID]);
  useEffect(getCollections, []);
  return (
    <div className="collection-page-wrapper">
      <CollectionsCarousel
        elementArray={collections}
        slidesAtATime={1.98}
        prevArrow={PrevArrow}
        nextArrow={NextArrow}
        widthPercent={100}
        spaceBetweenEntries={20}
        swiperHeight={237}
        cardImageHeightPercent={70}
        cardImageWidthPercent={70}
        cardFontSize={100}
        centeredSlides
        shouldLoop
        isCollectionPageHeader
        setCollecID={updateCollecID}
        initialID={params.id}
        activeSlideString="Currently Viewing"
      />
      { CollectionDetails !== undefined
        ? (
          <CollectionInfo
            name={CollectionDetails.fields.name !== undefined ? CollectionDetails.fields.name : ''}
            description={CollectionDetails.fields.description !== undefined ? CollectionDetails.fields.description : ''}
          />
        ) : <p>No such collection found!</p> }
      { BooksInCollection !== undefined
        ? (
          <BooksInCollection authorId={collecID} />
        ) : <p>No such collection found!</p> }
    </div>
  );
}

export default CollectionPage;
