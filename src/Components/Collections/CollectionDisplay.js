import React, { useState, useEffect } from 'react';
import Collection from './Collection';
import './Collection.css';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function CollectionDisplay() {
  const [collections, setCollections] = useState([]);
  const getCollections = () => {
    base('Collection').select({ view: 'Grid view' }).all() // Gets + returns all records
      .then((records) => { // Takes in returned records + calls setPosts to store in posts arr
        setCollections(records);
      });
  };

  useEffect(getCollections, []);

  return (
    <div className="collectionsDisplay">
      { collections.map((collection) => (
        <Collection
          Collid={collection.id}
        />
      ))}
    </div>
  );
}

export default CollectionDisplay;
