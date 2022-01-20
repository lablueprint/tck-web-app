import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import './Card.css';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function Card({ title, author, image }) {
  const [authorVar, setAuthor] = useState();

  const authorRecords = () => {
    base('Creator').find(author, (err, record) => {
      if (err) { console.error(err); }
      setAuthor(record);
      console.log(record);
    });
  };

  useEffect(authorRecords, []);

  return ( // App.css is flexed as a column
    <div id="card">
      <div id="title">
        Title:
        {' '}
        {title}
      </div>
      <div id="author">
        Author:
        {' '}
        { authorVar !== undefined ? (authorVar.fields.name) : 'loading'}
      </div>
      <div id="image">
        Image:
        <img id="book-cover" src={image} alt="book_cover" />
        {image}
      </div>
    </div>
  );
}

Card.defaultProps = {
  image: '',
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string,
};
