/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CollectionInfo from '../Components/CollectionPage/CollectionInfo';
import BooksInCollection from '../Components/CollectionPage/BooksInCollectionI';
import CollectionsCarousel from '../Components/Collections/CollectionsCarousel';
import PrevArrow from '../Assets/Images/electric-boogaloo-previous-arrow.svg';
import NextArrow from '../Assets/Images/electric-boogaloo-next-arrow.svg';
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
  // const collecID = params.id;
  const [collections, setCollections] = useState([]);
  const getCollections = () => {
    base('Collection').select({ view: 'Grid view' }).all() // Gets + returns all records
      .then((records) => { // Takes in returned records + calls setPosts to store in posts arr
        setCollections(records);
      });
  };
  const getPosts = () => {
    base('Collection').find(
      collecID,
      (err, record) => {
        setCollectionDetails(record);
      },
    );
  };

  useEffect(getPosts, [collecID]);
  useEffect(getCollections, []);
  return (
    <div>
      <CollectionsCarousel
        elementArray={collections}
        slidesAtATime={1.5}
        prevArrow={PrevArrow}
        nextArrow={NextArrow}
        widthPercent={100}
        spaceBetweenEntries={40}
        swiperHeight={277}
        cardImageHeightPercent={90}
        cardImageWidthPercent={90}
        cardFontSize={100}
        centeredSlides
        shouldLoop
        isCollectionPageHeader
        setCollecID={setCollecID}
      />
      { CollectionDetails !== undefined
        ? (
          <CollectionInfo
            name={CollectionDetails.fields.name !== undefined ? CollectionDetails.fields.name : ''}
            description={CollectionDetails.fields.description !== undefined ? CollectionDetails.fields.description : ''}
            picture={CollectionDetails.fields.image !== undefined ? CollectionDetails.fields.image[0].thumbnails.large.url : ''}
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
