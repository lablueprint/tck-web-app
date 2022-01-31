import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AuthoredWorkCard({ id, image, title }) {
  return (
    <div key={id} className="related-works-card">
      <img width="120" height="72" src={image} alt="" />
      <div><h4>{title}</h4></div>
      <Link to={`/book/${id}`}>Book Page</Link>
    </div>
  );
}

AuthoredWorkCard.propTypes = {
  id: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
};

export default AuthoredWorkCard;
