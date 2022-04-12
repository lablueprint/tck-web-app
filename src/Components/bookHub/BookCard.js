import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import './BookCard.css';
import { makeStyles } from '@mui/styles';
// import { CardActionArea, CardMedia } from '@mui/material';

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

  const [authorVar, setAuthor] = useState();

  const getAuthor = () => {
    base('Creator').find(author, (err, record) => {
      if (err) { console.error(err); }
      setAuthor(record);
    });
  };

  useEffect(getAuthor, []);

  return ( // horizontal scroll not implemented
    <div className="card" style={{ margin: inCarousel ? '0' : '30px 16px 10px 16px' }}>
      <Link class="link" to={`/book/${id}`}>
        <div className="cardActionArea">
          <div className="img-container">
            <img
              className="image"
              // component="img"
              src={image}
              alt="missing_book_cover"
            />
          </div>

          <p className="book-card-text">
            {title}
          </p>
          <Link class="link" to={`/creator/${author}`}>
            <Typography className={classes.author} color="text.secondary">
              By
              {' '}
              {authorVar !== undefined ? (authorVar.fields.name) : author}
            </Typography>
          </Link>
        </div>
      </Link>
    </div>
  );
}

BookCard.defaultProps = {
  image: '',
};

BookCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string,
  inCarousel: PropTypes.bool.isRequired,
};
