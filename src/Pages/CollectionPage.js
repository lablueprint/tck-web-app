/* eslint-disable no-unreachable-loop */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CollectionInfo from '../Components/CollectionPage/CollectionInfo';
import CollectionsCarousel from '../Components/CollectionsComponents/CollectionsCarousel';
import PrevArrow from '../Assets/Images/left-arrow-author-page.png';
import NextArrow from '../Assets/Images/right-arrow-author-page.png';
import useWindowSize from '../Components/Hooks/useWindowSize';
import BookList from '../Components/BookList/BookList';
import Loading from '../Components/Loading/Loading';
import base from '../airtable';

function CollectionPage() {
  const params = useParams();
  const [allBooks, setAllBooks] = useState(null);
  const [collections, setCollections] = useState(null);

  const [collecID, setCollecID] = useState(null);
  const [CollectionDetails, setCollectionDetails] = useState(null);
  const [collectionBooks, setCollectionBooks] = useState(null);

  const size = useWindowSize();

  const getAllBooks = () => {
    base('Book').select({ view: 'Grid view' }).all() // Gets + returns all Book records
      .then((records) => {
        setAllBooks(records);
      });
  };
  const getCollections = () => {
    base('Collection').select({ view: 'Grid view' }).all() // Gets + returns all Collection records
      .then((records) => { // Takes in returned records + calls setPosts to store in posts arr
        setCollections(records);
        setCollecID((params.id === undefined ? records[0].id : params.id));
      });
  };

  const getCollectionFromID = () => {
    // setTimeout(setLoadingMsg('No such collection found!'), 5000);
    if (collecID !== null && collecID !== undefined) {
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

  useEffect(() => {
    if (params.id !== undefined && collections) {
      setCollecID(params.id);
    }
  }, [params]);

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

  const subtitle = size.width > 600 ? (
    <p style={{
      color: '#3f3f3f', fontFamily: 'DM Sans', textAlign: 'left', margin: '2rem 51px 1rem',
    }}
    >
      Please select a collection
    </p>
  ) : null;

  return (
    <>
      {collecID !== null && collecID !== undefined && collections !== null && (
        <div style={{ padding: '1rem 0', margin: '0 auto', width: size.width > 600 ? '90vw' : '95vw' }}>
          {subtitle}
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
            initialID={collecID}
            setCollecID={updateCollecID}
          />
        </div>
      )}

      {CollectionDetails !== null && CollectionDetails.id === collecID && collectionBooks
        ? (
          <>
            <div style={{ margin: '0 auto', width: '83vw' }}>
              <CollectionInfo
                name={CollectionDetails.fields.name !== undefined ? CollectionDetails.fields.name : ''}
                description={CollectionDetails.fields.description !== undefined ? CollectionDetails.fields.description : ''}
                picture={CollectionDetails.fields.image !== undefined ? CollectionDetails.fields.image[0].url : ''}
              />
            </div>
            <BookList books={collectionBooks} />
          </>
        )
        : <Loading /> }
    </>
  );
}

export default CollectionPage;
