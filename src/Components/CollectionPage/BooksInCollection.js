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
  const [books, setBooks] = useState('init');
  const [loadingMsg, setLoadingMsg] = useState('Loading ...');

  // useEffect(() => {
  //   if (loadingMsg === 'Loading ...') {
  //     console.log('are we here?');
  //     setTimeout(() => setLoadingMsg('Sorry, there\'s no books here! 😰'), 5000);
  //   }
  // }, [loadingMsg]);

  function FindPosts() {
    const id = authorId;
    base('Collection').find(id, (err, records) => {
      if (err) {
        setLoadingMsg('Sorry, an error occurred :(');
        console.error(err);
      }
      const bookid = records.fields.books;
      if (bookid !== undefined && bookid.length) {
        bookid.forEach((element) => {
          base('Book').find(element, (error, record) => {
            if (error) {
              setLoadingMsg('Sorry, an error occurred :(');
              console.error(err);
            }
            setBooks((prevBooks) => [...prevBooks, record]);
          });
        });
      }
    });
    if (!books.length) { setLoadingMsg('Sorry, there\'s no books here! 😰'); }
  }

  useEffect(() => {
    setLoadingMsg('Loading ...');
    setBooks([]);
    FindPosts();
  }, [authorId]);

  return (

    <div style={{ margin: '0' }}>
      {books !== 'init' && books.length ? <BookList books={books} /> : <h1>{loadingMsg}</h1>}
    </div>
  );
}

BooksInCollection.propTypes = {
  authorId: propTypes.string.isRequired,
}; export default BooksInCollection;
