import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './BookCard.css';
import { makeStyles } from '@mui/styles';

// airtable configuration
// const Airtable = require('airtable');

// const airtableConfig = {
//   apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
//   baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
// };

// const base = new Airtable({ apiKey: airtableConfig.apiKey })
//   .base(airtableConfig.baseKey);

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
  id, title, author, image, inCarousel, label, inQuiz,
}) {
  const classes = useStyles();

  const [authorVar, setAuthor] = useState([]);

  // retrieving ids of authors from names
  const getAuthor = () => {
    author.name.forEach((elem, index) => {
      // console.log(author);
      if (elem.name === 'MISSING CREATOR') { setAuthor(elem); return; }
      setAuthor((prevValue) => prevValue.concat({ id: author.id[index], name: elem }));
      // base('Creator').find(name, (err, record) => {
      //   if (err) { console.error(err); }
      //   setAuthor((prevValue) => prevValue.concat(record));
      // });
    });
  };

  useEffect(getAuthor, []);

  return ( // horizontal scroll not implemented
    <div
      className={`card${inCarousel ? '-in-carousel' : ''}`}
    >
      <Link className="link" to={`/book/${id}`}>
        <div className="card-action-area">
          <div className={`img-container${inQuiz ? '-in-quiz' : ''}`}>
            <img
              className="image"
              src={image}
              alt="missing_book_cover"
              aria-label={`${label}`}
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
                {element.name}
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
  label: '', // This is temporary, should we want all book cards to have title in aria-label? if so, make this req
};

BookCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
    id: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
  }).isRequired,
  image: PropTypes.string,
  inCarousel: PropTypes.bool,
  label: PropTypes.string,
  inQuiz: PropTypes.bool,
};

BookCard.defaultProps = {
  inCarousel: false,
  image: '',
  inQuiz: false,
};
