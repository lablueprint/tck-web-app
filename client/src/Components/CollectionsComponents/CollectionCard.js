import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CollectionCard.css';
import useWindowSize from '../Hooks/useWindowSize';

export default function CollectionCard({
  collectionId, image, bigLine, imageHeightPercent,
  imageWidthPercent, isCollectionPageHeader, color, // isSlideActive
}) {
  const size = useWindowSize();

  return (

  // WARNING: IF YOU RESTYLE THIS, IT WILL BREAK THE COLLECTION PAGE'S ONSLIDECHANGE FUNCTION!!
  // UPDATE THE FUNCTION SO THAT IT CAN READ THE COLLECTION
  // ID FROM HERE AFTER IT HAS BEEN RESTRUCTURED
    <Link
      className="link"
      to={`/collection/${collectionId}`}
      id="collection-card-wrapper"
      style={{ background: color, columnGap: isCollectionPageHeader ? '15px' : '3px' }}
    >
      <div className="collection-image-container">
        <img
          src={image}
          style={{
            maxWidth: `${imageWidthPercent}%`,
            maxHeight: `${imageHeightPercent}%`,
          }}
          alt=""
        />
      </div>

      {isCollectionPageHeader
        ? (
          <div className="card-text-wrapper">
            {size.width > 600 && (
            <p style={{
              fontFamily: 'Work Sans', fontWeight: 'bold', fontSize: '1em', textAlign: 'start', margin: '0em 0 0.5em 0',
            }}
            >
              Stories From
            </p>
            )}
            <p
              className="card-title"
              style={{
                fontSize: size.width > 600 ? `${1.55 - ((bigLine.length / 22) / 10.0)}em` : '0.9em',
                overflowWrap: 'break-word',
                width: size.width > 600 ? '100%' : '90%',
              }}
            >
              {bigLine}
            </p>
          </div>
        )
        : (
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '70%', flex: '0 0 70%', marginRight: '15px',
          }}
          >
            <p
              style={{
                fontSize: `${1.3 - ((bigLine.length / 17) / 10.0)}em`,
                fontFamily: 'Work Sans',
                fontWeight: 'bold',
                textAlign: 'left',
                overflowWrap: 'break-word',
                minWidth: '0',
              }}
            >
              {bigLine}
            </p>
          </div>
        )}
    </Link>

  );
}

CollectionCard.propTypes = {
  collectionId: PropTypes.string.isRequired,
  image: PropTypes.string,
  bigLine: PropTypes.string,
  imageHeightPercent: PropTypes.number.isRequired,
  imageWidthPercent: PropTypes.number.isRequired,
  isCollectionPageHeader: PropTypes.bool,
  // isSlideActive: PropTypes.bool,
  color: PropTypes.string,
};

CollectionCard.defaultProps = {
  image: 'MISSING IMAGE',
  bigLine: 'MISSING NAME',
  isCollectionPageHeader: false,
  // isSlideActive: false,
  color: '#2E3E64',
};
