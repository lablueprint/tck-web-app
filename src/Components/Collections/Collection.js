/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Collection.css';

// const Airtable = require('airtable');

// const airtableConfig = {
//   apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
//   baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
// };
// const base = new Airtable({ apiKey: airtableConfig.apiKey })
//   .base(airtableConfig.baseKey);

export default function Collection({
  Collid, image, name, description,
}) {
  // const [collectionObj, setCollectionObj] = useState([]);
  // useEffect(() => {
  //   const id = Collid;
  //   base('Collection').find(id, (err, record) => {
  //     setCollectionObj((lastVal) => lastVal.concat({
  //       image: record.fields.image !== undefined ? record.fields.image[0].url : 'MISSING IMAGE',
  //       name: record.fields.name !== undefined ? record.fields.name : 'MISSING TITLE',
  //       description: record.fields.description !== undefined ?
  // record.fields.description : 'MISSING DESCRIPTION',
  //       id: record.fields.id,
  //     }));
  //   });
  // }, [Collid]);

  return (
  // <div>
  // {/* {collectionObj.map((object) => ( */}
    <div className="collectionCard" style={{ background: '#2E3E64' }}>
      <body className="CollectionBody">
        <Link class="link" to={`/collection/${Collid}`} style={{ display: 'flex', flexirection: 'row', color: 'white' }}>
          <div style={{
            flexBasis: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}
          >
            <img className="collectionImage" src={image} alt="description" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h5 className="card-title" style={{ marginLeft: '5%' }}>{name}</h5>
          </div>
          {/* <p className="cardText">{description}</p> */}
        </Link>
      </body>
    </div>
  // {/* ))} */}
  // </div>

  );
}

Collection.propTypes = {
  Collid: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
};

Collection.defaultProps = {
  image: 'MISSING IMAGE',
  name: 'MISSING NAME',
  description: 'MISSING DESCRIPTION',
};
