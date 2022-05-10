import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Collection.css';

export default function Collection({
  collectionId, image, name, imageHeightPercent,
  imageWidthPercent, isCollectionPageHeader, isSlideActive, color,
}) {
  return (

  // WARNING: IF YOU RESTYLE THIS, IT WILL BREAK THE COLLECTION PAGE'S ONSLIDECHANGE FUNCTION!!
  // UPDATE THE FUNCTION SO THAT IT CAN READ THE COLLECTION
  // ID FROM HERE AFTER IT HAS BEEN RESTRUCTURED
    <Link
      className="link"
      to={`/collection/${collectionId}`}
      id="collection-card"
      style={{ background: color }}
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
                fontSize: '1.75rem',
                alignItems: isSlideActive ? 'end' : 'center',
              }}
            >
              {name}
            </p>
            {isSlideActive
            && (
            <div className="card-description-wrapper">
              <p className="card-description">
                Currently Viewing
              </p>
            </div>
            )}
          </div>
        )
        : (
          <p
            className="card-title"
            style={{
              fontSize: '1.05rem',
            }}
          >
            {name}
          </p>
        )}
    </Link>

  );
}

Collection.propTypes = {
  collectionId: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  imageHeightPercent: PropTypes.number.isRequired,
  imageWidthPercent: PropTypes.number.isRequired,
  isCollectionPageHeader: PropTypes.bool,
  isSlideActive: PropTypes.bool,
  color: PropTypes.string,
};

Collection.defaultProps = {
  image: 'MISSING IMAGE',
  name: 'MISSING NAME',
  isCollectionPageHeader: false,
  isSlideActive: false,
  color: '#2E3E64',
};
