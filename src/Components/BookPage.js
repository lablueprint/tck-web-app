import React, { useState, useEffect } from 'react';

// Suppressed PropTypes in ESLint with comment
/* eslint react/prop-types: 0 */

const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY })
  .base(process.env.REACT_APP_AIRTABLE_BASE_KEY);

function BookPage({ bookId }) {
  const [book, setBook] = useState();
  const getBookPage = function () {
    base('Book').find(bookId, (err, record) => {
      if (err) {
        console.error(err);
        return;
      }
      setBook(record);
    });
  };

  useEffect(() => {
    getBookPage(bookId);
  }, []);

  if (book != null) {
    const title = book.get('title');
    const dateAdded = book.get('date_added');
    return (
      <div>
        {title}
        ,
        {' '}
        {dateAdded}
      </div>
    );
  }
  return <div>Loading!</div>;
}

export default BookPage;
