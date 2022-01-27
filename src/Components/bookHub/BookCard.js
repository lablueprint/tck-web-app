import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import './BookCard.css';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function Card({
  id, title, author, image,
}) {
  const [authorVar, setAuthor] = useState();

  const authorRecords = () => {
    base('Creator').find(author, (err, record) => {
      if (err) { console.error(err); }
      setAuthor(record);
    });
  };

  useEffect(authorRecords, []);

  return ( // horizontal scroll not implemented
    <div className="card">
      <Link to={`/book/${id}`}>Book Page</Link>
      <div className="image">
        <img className="book-cover" src={image} alt="missing_book_cover" />
      </div>
      <div className="title">
        {' '}
        {title}
      </div>
      <div className="author">
        By
        {' '}
        { authorVar !== undefined ? (authorVar.fields.name) : 'loading'}
      </div>
    </div>
  );
}

Card.defaultProps = {
  image: '',
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string,
};
