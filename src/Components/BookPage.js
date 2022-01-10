import React, { useState } from 'react';

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

  if (book != null) {
    const title = book;
    const dateAdded = book.date_added;
    return (
      <div>
        <p>{title}</p>
        <p>{dateAdded}</p>
      </div>
    );
  }
  getBookPage(bookId);
}

export default BookPage;
