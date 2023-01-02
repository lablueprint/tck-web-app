/* eslint-disable no-unreachable-loop */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CollectionInfo from '../Components/CollectionPage/CollectionInfo';
import CollectionsCarousel from '../Components/CollectionsComponents/CollectionsCarousel';
import PrevArrow from '../Assets/Images/left-arrow-author-page.png';
import NextArrow from '../Assets/Images/right-arrow-author-page.png';
import useWindowSize from '../Components/Hooks/useWindowSize';
import BookList from '../Components/BookList/BookList';
// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

// function LoadingMsg() {
//   const [loadingMsg, setLoadingMsg] = useState('Loading ...');
//   useEffect(() => {
//     const timer = setTimeout(setLoadingMsg('No such collection found!'), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <p>{loadingMsg}</p>
//   );
// }
function CollectionPage() {
  const [CollectionDetails, setCollectionDetails] = useState(null);
  const params = useParams();
  const [collecID, setCollecID] = useState(null);
  const [collections, setCollections] = useState(null);
  const [allBooks, setAllBooks] = useState(null);
  const [collectionBooks, setCollectionBooks] = useState(null);
  const size = useWindowSize();
  const [loadingMsg, setLoadingMsg] = useState('Loading ...');
  const [headerLoadingMsg, setHeaderLoadingMsg] = useState('Loading ...');

  useEffect(() => {
    if (headerLoadingMsg === 'Loading ...') {
      setTimeout(() => setHeaderLoadingMsg('An error might have occurred or the content requested is too big in size'), 10000);
    }
  }, [headerLoadingMsg]);

  const getAllBooks = () => {
    base('Book').select({ view: 'Grid view' }).all() // Gets + returns all records
      .then((records) => {
        setAllBooks(records);
      });
  };
  const getCollections = () => {
    base('Collection').select({ view: 'Grid view' }).all() // Gets + returns all records
      .then((records) => { // Takes in returned records + calls setPosts to store in posts arr
        setCollections(records);
        setCollecID((params.id === 'init' ? records[0].id : params.id));
      });
  };

  const getCollectionFromID = () => {
    setLoadingMsg('Loading ...');
    // setTimeout(setLoadingMsg('No such collection found!'), 5000);
    if (collecID !== null && collecID !== 'init') {
      const record = collections.find((element) => element.id === collecID);
      setCollectionDetails(record);
    }
  };

  const getBooksFromCollecID = () => {
    if (CollectionDetails !== null
      && CollectionDetails.fields !== undefined && allBooks) {
      if (CollectionDetails.fields.books !== undefined) {
        const filteredData = allBooks.filter(
          (book) => CollectionDetails.fields.books.includes(book.id),
        );
        setCollectionBooks(filteredData);
      } else {
        setCollectionBooks([]);
      }
    }
  };

  const updateCollecID = useCallback((newValue) => setCollecID(newValue), [setCollecID]);

  // useEffect(() => {
  //   if (params.id !== 'init' && collections) {
  //     setCollecID(params.id);
  //   }
  // }, [params.id]);

  useEffect(() => {
    getCollectionFromID();
  }, [collecID]);

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    if (allBooks) {
      getCollections();
    }
  }, [allBooks]);

  useEffect(() => { getBooksFromCollecID(); }, [CollectionDetails]);

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
        : <h1>{headerLoadingMsg}</h1>}

      <div style={{ margin: '1rem auto', width: size.width > 600 ? '77vw' : '83vw' }}>
        {CollectionDetails !== undefined && CollectionDetails !== null
         && CollectionDetails.id === collecID
          ? ((
            <CollectionInfo
              name={CollectionDetails.fields.name !== undefined ? CollectionDetails.fields.name : ''}
              description={CollectionDetails.fields.description !== undefined ? CollectionDetails.fields.description : ''}
              picture={CollectionDetails.fields.image !== undefined ? CollectionDetails.fields.image[0].url : ''}
            />
          )) : <h2>{loadingMsg}</h2> }
        { collectionBooks && collecID !== null && collecID !== 'init'
          ? (
            <BookList books={collectionBooks} />
          ) : <h2>{loadingMsg}</h2> }

      </div>
    </div>
  );
}

export default CollectionPage;
