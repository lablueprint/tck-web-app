import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CollectionInfo from '../Components/CollectionPage/CollectionInfo';
import BooksInCollection from '../Components/CollectionPage/BooksInCollectionI';

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
  const collecID = params.id;

  const getPosts = () => {
    base('Collection').find(
      collecID,
      (err, record) => {
        setCollectionDetails(record);
      },
    );
  };

  useEffect(getPosts, []);

  return (
    <div>
      { CollectionDetails !== undefined
        ? (
          <CollectionInfo
            name={CollectionDetails.fields.name}
            description={CollectionDetails.fields.description}
            picture={CollectionDetails.fields.image[0].thumbnails.large.url}
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
