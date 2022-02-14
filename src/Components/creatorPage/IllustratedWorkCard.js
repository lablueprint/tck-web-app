import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

function IllustratedWorkCard({ key, image, title }) {
  return (
    <div key={key} className="related-works-card">
      <img width="120" height="72" src={image} alt="" />
      <div><h4>{title}</h4></div>
      <Link to={`/book/${key}`}>Book Page</Link>
    </div>
  );
}

IllustratedWorkCard.propTypes = {
  key: propTypes.number.isRequired,
  image: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
};

export default IllustratedWorkCard;
