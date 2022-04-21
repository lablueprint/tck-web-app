import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

function IllustratedWorkCard({ id, image, title }) {
  return (
    <div width="106.77" height="146.14" key={id} className="related-works-card">
      <img className="rec-book-img" src={image} alt="" />
      <div><h4>{title}</h4></div>
      <Link to={`/book/${id}`}>Book Page</Link>
    </div>
  );
}

IllustratedWorkCard.propTypes = {
  id: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
};

export default IllustratedWorkCard;
