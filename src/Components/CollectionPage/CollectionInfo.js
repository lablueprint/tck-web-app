import PropTypes from 'prop-types';
import React from 'react';
import './CollectionPage.css';

// Collection name/picture/description components
export default function CollectionInfo({ name, picture, description }) {
  return (
    <div>
      <div className="header" style={{ fontFamily: 'Work Sans', fontWeight: 'normal', fontSize: '400' }}>
        {name}
        <img className="collection-card-image" src={picture} alt="author" />
      </div>
      <div className="sub-header">
        About this collection
      </div>
      <div className="paragraph" style={{ fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: '400' }}>
        {description}
      </div>
    </div>
  );
}

CollectionInfo.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
