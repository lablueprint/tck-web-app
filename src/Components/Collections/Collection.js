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
  Collid, image, name, description, imageHeightPercent,
  imageWidthPercent, isCollectionPageHeader,
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

  // WARNING: IF YOU RESTYLE THIS, IT WILL BREAK THE COLLECTION PAGE'S ONSLIDECHANGE FUNCTION!!
  // UPDATE THE FUNCTION SO THAT IT CAN READ THE COLLECTION
  // ID FROM HERE AFTER IT HAS BEEN RESTRUCTURED
    <Link
      class="link"
      to={`/collection/${Collid}`}
      style={{
        display: 'flex', flexDirection: 'row', color: 'white', width: '100%', background: '#2E3E64', textDecoration: 'none',
      }}
      id="collectionCard"
    >
      <div style={{
        flexBasis: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%',
      }}
      >
        <img className="collectionImage" src={image} style={{ maxWidth: `${imageWidthPercent}%`, maxHeight: `${imageHeightPercent}%` }} alt="description" />
      </div>

      <p
        className="cardTitle"
        style={{
          width: '100%', height: '100%', fontSize: isCollectionPageHeader ? '3rem' : '1.05rem', display: 'flex', alignItems: 'center', flexBasis: '50%', fontFamily: 'Work Sans', fontWeight: 'bolder',
        }}
      >
        {name}
      </p>
      {/* <p className="cardText">{description}</p> */}
    </Link>

  );
}

Collection.propTypes = {
  Collid: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  imageHeightPercent: PropTypes.number.isRequired,
  imageWidthPercent: PropTypes.number.isRequired,
  // cardFontSize: PropTypes.number.isRequired,
  isCollectionPageHeader: PropTypes.bool,
};

Collection.defaultProps = {
  image: 'MISSING IMAGE',
  name: 'MISSING NAME',
  description: 'MISSING DESCRIPTION',
  isCollectionPageHeader: false,
};
