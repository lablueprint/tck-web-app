/* Create the component for an individual collection.
Look at the requirements for additional detail!
- Name
- Image
- Description */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Collection.css';
// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function Collection({ Collid }) {
  const [collectionObj, setCollectionObj] = useState([]);
  useEffect(() => {
    function assignCollection() {
      const id = Collid;
      base('Collection').find(id, (err, record) => {
        setCollectionObj((lastVal) => lastVal.concat({
          image: record.fields.image[0].thumbnails.large.url,
          name: record.fields.name,
          description: record.fields.description,
          id: record.fields.id,
        }));
      });
    }
    assignCollection();
  }, [Collid]);
  return (
    <div className="collectionCard">
      <body className="CollectionBody">
        {collectionObj.map((id) => (
          <div>
            <img className="Collection-image" src={id.image} alt="description" />
            <h5 className="card-title">{id.name}</h5>
            <p className="card-text">{id.description}</p>
          </div>
        ))}
      </body>
    </div>
  );
}

Collection.propTypes = {
  Collid: PropTypes.string.isRequired,
};
