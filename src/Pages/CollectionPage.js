import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CollectionInfo from '../Components/CollectionPage/CollectionInfo';
import BooksInCollection from '../Components/CollectionPage/BooksInCollection';
import CollectionsCarousel from '../Components/CollectionsComponents/CollectionsCarousel';
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
  const [CollectionDetails, setCollectionDetails] = useState(null);
  const params = useParams();
  const [collecID, setCollecID] = useState(null);
  const [collections, setCollections] = useState(null);
  const getCollections = () => {
    base('Collection').select({ view: 'Grid view' }).all() // Gets + returns all records
      .then((records) => { // Takes in returned records + calls setPosts to store in posts arr
        // if (err) { console.error(err); }
        setCollections(records);
        setCollecID((params.id === 'init' ? records[0].id : params.id));
      });
  };
  const getCollectionFromID = () => {
    if (collecID !== null && collecID !== 'init') {
      base('Collection').find(
        collecID,
        (err, record) => {
          if (err) { console.error(err); }
          setCollectionDetails(record);
        },
      );
    }
  };

  const updateCollecID = useCallback((newValue) => setCollecID(newValue), [setCollecID]);

  useEffect(getCollectionFromID, [collecID]);
  useEffect(() => {
    getCollections();
  }, []);
  return (
    <div>
      {collecID !== null && collecID !== 'init' && collections !== null ? (
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
          setCollecID={updateCollecID}
          initialID={collecID}
        />
      )
        : <p>An error might have occurred or the content requested is too big in size</p>}

      { CollectionDetails !== null && CollectionDetails !== undefined
        ? (
          <CollectionInfo
            name={CollectionDetails.fields.name !== undefined ? CollectionDetails.fields.name : ''}
            description={CollectionDetails.fields.description !== undefined ? CollectionDetails.fields.description : ''}
            picture={CollectionDetails.fields.image !== undefined ? CollectionDetails.fields.image[0].thumbnails.large.url : ''}
          />
        ) : <p>No such collection found!</p> }
      { BooksInCollection !== undefined && collecID !== null && collecID !== 'init'
        ? (
          <BooksInCollection authorId={collecID} />
        ) : <p>No such collection found!</p> }
    </div>
  );
}

export default CollectionPage;
