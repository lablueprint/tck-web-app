import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import './BookInfo.css';
import { makeStyles } from '@mui/styles';
import { CardActionArea, CardMedia } from '@mui/material';

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

export default function BookInfo({
  id, title, author, image,
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
    <Card className="card" sx={{ maxWidth: 345 }}>
      <Link class="link" to={`/book/${id}`} target="_blank">
        <CardActionArea className="cardActionArea">
          <div className="cover">
            <CardMedia
              className="image"
              component="img"
              image={image}
              alt="missing_book_cover"
            />
          </div>

          <Typography className={classes.title}>
            {title}
          </Typography>
          <Typography className={classes.author} color="text.secondary">
            By
            {' '}
            {authorVar !== undefined ? (authorVar.fields.name) : author}
          </Typography>
        </CardActionArea>
      </Link>
    </Card>
  );
}

BookInfo.defaultProps = {
  image: '',
};

BookInfo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string,
};
