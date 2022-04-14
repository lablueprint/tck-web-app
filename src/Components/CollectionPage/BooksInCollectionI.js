import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import BookCard from '../bookHub/BookCard';
import '../bookHub/BookCard.css';

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
            setBooks((prevValue) => prevValue.concat(
              {
                image: record.fields.image[0].thumbnails.large.url,
                title: record.fields.title,
                author: record.fields.author,
                id: element,
              },
            ));
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
      <div className="SubHeader">
        Books in this collection:
      </div>
      <div className="library-display">
        {books.map((element) => (
          <BookCard
            image={element.image}
            title={element.title}
            author={element.author}
          // Speical Prop
            key={element.id}
            id={element.id}
          />
        ))}
      </div>
      <div />
    </div>
  );
}

BooksInCollection.propTypes = {
  authorId: propTypes.string.isRequired,
}; export default BooksInCollection;
