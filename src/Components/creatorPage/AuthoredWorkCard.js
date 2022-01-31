import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AuthoredWorkCard({ key, image, title }) {
  return (
    <div key={key} className="related-works-card">
      <img width="120" height="72" src={image} alt="" />
      <div><h4>{title}</h4></div>
      <Link to={`/book/${key}`}>Book Page</Link>
    </div>
  );
}

AuthoredWorkCard.propTypes = {
  key: propTypes.number.isRequired,
  image: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
};

export default AuthoredWorkCard;
