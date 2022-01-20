import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './creatorAvnish.css';
// import { v4 as uuidv4 } from 'uuid';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

function CreatedWorksCard({ authorId }) {
  const [imageTitleObject, setImageTitleObject] = useState([]);
  const [illustratedObject, setillustratedObject] = useState([]);

  function FindPosts() {
    const id = authorId;
    base('Creator').find(id, (err, records) => {
      if (err) {
        console.error(err);
        return;
      }
      const bookid = records.fields.authored;
      const illustratedId = records.fields.illustrated;
      if (bookid.length) {
        bookid.forEach((element) => {
          base('Book').find(element, (error, record) => {
            if (error) {
              console.error(error);
              return;
            }
            setImageTitleObject((prevValue) => prevValue.concat(
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
              console.error(error);
              return;
            }
            setillustratedObject((prevValue) => prevValue.concat(
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
      {imageTitleObject.length && <div> Authored Works: </div>}
      <div>
        {imageTitleObject.map((element) => (
          <div key={element.id} className="related-works-card">
            <img width="120" height="72" src={element.image} alt="" />
            <div><h4>{element.title}</h4></div>
          </div>
        ))}
      </div>
      {illustratedObject.length && <div> Illustrated Works: </div>}
      <div>
        {illustratedObject.map((element) => (
          <div key={element.id} className="related-works-card">
            <img width="120" height="72" src={element.image} alt="" />
            <div><h4>{element.title}</h4></div>
            <Link to={`/creator/${element.id}`}>Book Page</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

CreatedWorksCard.propTypes = {
  authorId: propTypes.string.isRequired,
}; export default CreatedWorksCard;
