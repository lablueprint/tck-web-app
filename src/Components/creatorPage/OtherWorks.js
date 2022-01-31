import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import './OtherWorks.css';
import AuthoredWorkCard from './AuthoredWorkCard';
import IllustratedWorkCard from './IllustratedWorkCard';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

// Authored and illustrated work components
function CreatedWorksCard({ authorId }) {
  const [authoredWorks, setAuthoredWorks] = useState([]);
  const [illustratedWorks, setillustratedWorks] = useState([]);

  function FindPosts() {
    const id = authorId;
    base('Creator').find(id, (err, records) => {
      if (err) {
        console.log(err);
      }
      const bookid = records.fields.authored;
      const illustratedId = records.fields.illustrated;
      if (bookid.length) {
        bookid.forEach((element) => {
          base('Book').find(element, (error, record) => {
            if (error) {
              console.log(err);
            }
            setAuthoredWorks((prevValue) => prevValue.concat(
              {
                image: record.fields.image[0].thumbnails.large.url,
                title: record.fields.title,
                id: element,
              },
            ));
          });
        });
      }
      if (illustratedId.length) {
        illustratedId.forEach((element) => {
          base('Book').find(element, (error, record) => {
            if (error) {
              console.log(err);
            }
            setillustratedWorks((prevValue) => prevValue.concat(
              {
                image: record.fields.image[0].thumbnails.large.url,
                title: record.fields.title,
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
      {authoredWorks.length && <div> Authored Works: </div>}
      <div>
        {authoredWorks.map((element) => (
          <AuthoredWorkCard key={element.id} image={element.image} title={element.title} />
        ))}
      </div>
      {illustratedWorks.length && <div> Illustrated Works: </div>}
      <div>
        {illustratedWorks.map((element) => (
          <IllustratedWorkCard key={element.id} image={element.image} title={element.title} />
        ))}
      </div>
    </div>
  );
}

CreatedWorksCard.propTypes = {
  authorId: propTypes.string.isRequired,
}; export default CreatedWorksCard;
