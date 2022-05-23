import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import BookList from '../BookList/BookList';
import '../BookBrowser/BookCard.css';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

function BooksInCollection({ authorId }) {
  const [books, setBooks] = useState([]);

  function FindPosts() {
    const id = authorId;
    base('Collection').find(id, (err, records) => {
      if (err) {
        console.error(err);
      }
      const bookid = records.fields.books;
      if (bookid !== undefined && bookid.length) {
        bookid.forEach((element) => {
          base('Book').find(element, (error, record) => {
            if (error) {
              console.error(err);
            }
            setBooks((prevBooks) => [...prevBooks, record]);
          });
        });
      }
    });
  }

  useEffect(() => {
    setBooks([]);
    FindPosts();
  }, [authorId]);

  return (
    <div>
      <BookList books={books} />
    </div>
  );
}

BooksInCollection.propTypes = {
  authorId: propTypes.string.isRequired,
}; export default BooksInCollection;
