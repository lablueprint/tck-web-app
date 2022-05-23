import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Collection.css';

export default function Collection({
  collectionId, image, bigLine, imageHeightPercent,
  imageWidthPercent, isCollectionPageHeader, isSlideActive, color,
}) {
  return (

  // WARNING: IF YOU RESTYLE THIS, IT WILL BREAK THE COLLECTION PAGE'S ONSLIDECHANGE FUNCTION!!
  // UPDATE THE FUNCTION SO THAT IT CAN READ THE COLLECTION
  // ID FROM HERE AFTER IT HAS BEEN RESTRUCTURED
    <Link
      className="link"
      to={`/collection/${collectionId}`}
      id="collection-card-wrapper"
      style={{ background: color, justifyContent: 'start' }}
    >

      <div className="card-description-wrapper">
        <p className="card-description">
          {isSlideActive && 'Currently Viewing'}
        </p>
      </div>

      <div className="collection-card">
        <div className="collection-image-container">
          <img
            src={image}
            style={{
              maxWidth: `${imageWidthPercent}%`,
              maxHeight: `${imageHeightPercent}%`,
              position: isSlideActive ? 'relative' : 'static',
              bottom: isSlideActive ? '10px' : '0px',
            }}
            alt="description"
          />
        </div>

        {isCollectionPageHeader
          ? (
            <div className="card-text-wrapper">
              <p style={{
                fontFamily: 'Work Sans', fontWeight: 'bold', fontSize: '1.25em', textAlign: 'start', margin: isSlideActive ? '0em 0 0.75em 0' : '0em 0 0.35em 0',
              }}
              >
                Stories From
              </p>
              <p
                className="card-title"
                style={{
                  fontSize: '1.75rem',
                  position: isSlideActive ? 'relative' : 'static',
                  bottom: isSlideActive ? '10px' : '0px',
                }}
              >
                {bigLine}
              </p>
            </div>
          )
          : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <p
                className="card-title"
                style={{
                  fontSize: '1.05rem',
                  flex: '0 0 100%',
                }}
              >
                {bigLine}
              </p>
            </div>
          )}

      </div>
    </Link>

  );
}

Collection.propTypes = {
  collectionId: PropTypes.string.isRequired,
  image: PropTypes.string,
  bigLine: PropTypes.string,
  imageHeightPercent: PropTypes.number.isRequired,
  imageWidthPercent: PropTypes.number.isRequired,
  isCollectionPageHeader: PropTypes.bool,
  isSlideActive: PropTypes.bool,
  color: PropTypes.string,
};

Collection.defaultProps = {
  image: 'MISSING IMAGE',
  bigLine: 'MISSING NAME',
  isCollectionPageHeader: false,
  isSlideActive: false,
  color: '#2E3E64',
};
