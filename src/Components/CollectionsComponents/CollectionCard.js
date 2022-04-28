import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Collection.css';

export default function Collection({
  Collid, image, name, description, imageHeightPercent,
  imageWidthPercent, isCollectionPageHeader,
}) {
  return (

  // WARNING: IF YOU RESTYLE THIS, IT WILL BREAK THE COLLECTION PAGE'S ONSLIDECHANGE FUNCTION!!
  // UPDATE THE FUNCTION SO THAT IT CAN READ THE COLLECTION
  // ID FROM HERE AFTER IT HAS BEEN RESTRUCTURED
    <Link
      className="link"
      to={`/collection/${Collid}`}
      id="collection-card"
    >
      <div className="collection-image-container">
        <img className="collection-image" src={image} style={{ maxWidth: `${imageWidthPercent}%`, maxHeight: `${imageHeightPercent}%` }} alt="description" />
      </div>

      {isCollectionPageHeader
        ? (
          <div className="card-text-container">
            <p
              className="card-title"
              style={{
                fontSize: '3rem',
                alignItems: 'end',
              }}
            >
              {name}
            </p>
            <div className="card-description-wrapper">
              <p className="card-description">
                {description}
              </p>
            </div>
          </div>
        )
        : (
          <p
            className="card-title"
            style={{
              fontSize: '1.05rem',
              alignItems: 'center',
            }}
          >
            {name}
          </p>
        )}
    </Link>

  );
}

Collection.propTypes = {
  Collid: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  imageHeightPercent: PropTypes.number.isRequired,
  imageWidthPercent: PropTypes.number.isRequired,
  isCollectionPageHeader: PropTypes.bool,
};

Collection.defaultProps = {
  image: 'MISSING IMAGE',
  name: 'MISSING NAME',
  description: 'MISSING DESCRIPTION',
  isCollectionPageHeader: false,
};
