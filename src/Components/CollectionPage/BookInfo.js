import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import AuthoredWorkCard from './AuthoredWorkCard';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

// Authored and illustrated work components
function BookInfo({ authorId }) {
  const [authoredWorks, setAuthoredWorks] = useState([]);

  function FindPosts() {
    const id = authorId;
    base('Collection').find(id, (err, records) => {
      if (err) {
        console.error(err);
      }
      const bookid = records.fields.books;
      if (bookid.length) {
        bookid.forEach((element) => {
          base('Book').find(element, (error, record) => {
            if (error) {
              console.error(err);
            }
            setAuthoredWorks((prevValue) => prevValue.concat(
              {
                image: record.fields.image[0].thumbnails.large.url,
                title: record.fields.title,
                author: record.fields.author[0],
                id: element,
              },
            ));
          });
        });
      }
    });
  }

  useEffect(() => {
    FindPosts();
  }, []);

  return (
    <div>
      {authoredWorks.length && <div> Books in this collection: </div>}
      <div>
        {authoredWorks.map((element) => (
          <AuthoredWorkCard
            key={element.id}
            image={element.image}
            title={element.title}
            author={element.author[0]}
          />
        ))}
      </div>
      <div />
    </div>
  );
}

BookInfo.propTypes = {
  authorId: propTypes.string.isRequired,
}; export default BookInfo;
