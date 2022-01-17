import PropTypes from 'prop-types';
import React from 'react';

export default function Card({ title, author, image }) {
  return (
    <div>
      <div id="title">
        Title:
        {' '}
        {title}
      </div>
      <div id="author">
        Author:
        {' '}
        {author}
      </div>
      <div id="image">
        Image:
        {' '}
        {image}
      </div>
    </div>
  );
}

Card.defaultProps = {
  image: '',
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string,
};
