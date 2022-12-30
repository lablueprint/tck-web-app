import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CollectionInfo from '../Components/CollectionPage/CollectionInfo';
import BooksInCollection from '../Components/CollectionPage/BooksInCollection';
import CollectionsCarousel from '../Components/CollectionsComponents/CollectionsCarousel';
import PrevArrow from '../Assets/Images/left-arrow-author-page.svg';
import NextArrow from '../Assets/Images/right-arrow-author-page.svg';
import { useWindowSize } from '../Components/Navigation/Header';
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
  const size = useWindowSize();

  const getCollections = () => {
    base('Collection').select({ view: 'Grid view' }).all() // Gets + returns all records
      .then((records) => { // Takes in returned records + calls setPosts to store in posts arr
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
    <div style={{ margin: '1rem auto', width: size.width > 600 ? '85vw' : '95vw' }}>
      {size.width > 600 && (
      <p style={{
        color: '#3f3f3f', fontFamily: 'DM Sans', textAlign: 'left', margin: '2rem 51px 1rem',
      }}
      >
        Please select a collection
      </p>
      )}
      {collecID !== null && collecID !== 'init' && collections !== null ? (
        <CollectionsCarousel
          elementArray={collections}
          slidesAtATime={3.15}
          prevArrow={PrevArrow}
          nextArrow={NextArrow}
          widthPercent={100}
          spaceBetweenEntries={15}
          swiperHeight={size.width > 600 ? 170 : 100}
          cardImageHeightPercent={55}
          cardImageWidthPercent={55}
          cardFontSize={100}
          centeredSlides
          shouldLoop
          isCollectionPageHeader
          setCollecID={updateCollecID}
          initialID={collecID}
        />
      )
        : <p>An error might have occurred or the content requested is too big in size</p>}

      <div style={{ margin: '1rem auto', width: size.width > 600 ? '77vw' : '83vw' }}>
        { CollectionDetails !== null && CollectionDetails !== undefined
          ? (
            <CollectionInfo
              name={CollectionDetails.fields.name !== undefined ? CollectionDetails.fields.name : ''}
              description={CollectionDetails.fields.description !== undefined ? CollectionDetails.fields.description : ''}
              picture={CollectionDetails.fields.image !== undefined ? CollectionDetails.fields.image[0].url : ''}
            />
          ) : <p>No such collection found!</p> }
        { BooksInCollection !== undefined && collecID !== null && collecID !== 'init'
          ? (
            <BooksInCollection authorId={collecID} />
          ) : <p>No such collection found!</p> }

      </div>
    </div>
  );
}

export default CollectionPage;
