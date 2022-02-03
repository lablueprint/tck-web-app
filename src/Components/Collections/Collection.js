import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Collection.css';

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
    const id = Collid;
    base('Collection').find(id, (err, record) => {
      setCollectionObj((lastVal) => lastVal.concat({
        image: record.fields.image !== undefined ? record.fields.image[0].url : 'MISSING IMAGE',
        name: record.fields.name !== undefined ? record.fields.name : 'MISSING TITLE',
        description: record.fields.description !== undefined ? record.fields.description : 'MISSING DESCRIPTION',
        id: record.fields.id,
      }));
    });
  }, [Collid]);

  return (
    <div className="collectionCard">
      <body className="CollectionBody">
        {collectionObj.map((id) => (
          <div>
            <img className="collectionImage" src={id.image} alt="description" />
            <h5 className="card-title">{id.name}</h5>
            <p className="cardText">{id.description}</p>
          </div>
        ))}
      </body>
    </div>
  );
}

Collection.propTypes = {
  Collid: PropTypes.string.isRequired,
};
