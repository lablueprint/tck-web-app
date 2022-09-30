import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './BookCard.css';
import { makeStyles } from '@mui/styles';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const useStyles = makeStyles({
  title: {
    gridRowStart: 3,
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: '5px',
  },

  author: {
    gridRowStart: 4,
    fontSize: 12,
    fontWeight: 100,
  },
});

export default function BookCard({
  id, title, author, image, inCarousel,
}) {
  const classes = useStyles();

  const [authorVar, setAuthor] = useState([]);

  const getAuthor = () => {
    author.forEach((name) => {
      console.log(author);
      if (name === 'MISSING CREATOR') { setAuthor(name); return; }
      base('Creator').find(name, (err, record) => {
        if (err) { console.error(err); }
        setAuthor((prevValue) => prevValue.concat(record));
      });
    });
  };

  useEffect(getAuthor, []);

  return ( // horizontal scroll not implemented
    <div
      className="card"
      style={{
        margin: inCarousel ? '0' : '10px 16px 10px 16px',

      }}
    >
      <Link className="link" to={`/book/${id}`}>
        <div className="card-action-area">
          <div className="img-container">
            <img
              className="image"
              src={image}
              alt="missing_book_cover"
            />
          </div>
          <p className="book-card-text">
            {title.length > 50 ? `${title.substring(0, 50)}...` : title}
          </p>

        </div>
      </Link>
      <div className={classes.author} color="text.secondary" style={{ fontFamily: 'DM Sans' }}>
        By
        {' '}
        {authorVar !== undefined && (authorVar !== 'MISSING CREATOR' ? authorVar.map((element, index) => {
          if (index < 2) {
            return (
              <Link key={element.id} className="link" to={`/creator/${element.id}`}>
                {element.fields.name}
                <br />
              </Link>
            );
          }
          if (index === 2) {
            return ('and more');
          }

          return (<div />);
        })

          : (
            <div className="link">
              Unknown
              <br />
            </div>
          )
        )}
      </div>

    </div>
  );
}

BookCard.defaultProps = {
  image: '',
};

BookCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
  image: PropTypes.string,
  inCarousel: PropTypes.bool,
};

BookCard.defaultProps = {
  inCarousel: false,
  image: '',
};
