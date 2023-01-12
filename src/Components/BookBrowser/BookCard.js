import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './BookCard.css';
import { makeStyles } from '@mui/styles';

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

  // reformatted author for easier iterating
  const [authorVar, setAuthor] = useState([]);

  // retrieving ids of authors from names
  const getAuthor = () => {
    if (author.name[0] === 'MISSING CREATOR') { setAuthor(author.name[0]); return; }

    setAuthor([]);

    author.name.forEach((elem, index) => {
      setAuthor((prevValue) => prevValue.concat({ id: author.id[index], name: elem }));
    });
  };

  useEffect(getAuthor, []);

  const punctuation = (index) => {
    switch (author.name.length - index - 1) {
      case 0: return '';
      case 1: return ' & ';
      default: return ', ';
    }
  };

  return ( // horizontal scroll not implemented
    <div
      className={`card${inCarousel ? '-in-carousel' : ''}`}
    >
      <Link className="link" to={`/browser/book/${id}`}>
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
              <Link key={element.id} className="link" to={`/browser/creator/${element.id}`}>
                {element.name}
                {punctuation(index)}
              </Link>
            );
          }
          if (index === 2) {
            return (' & more');
          }

          return (null);
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
