import PropTypes from 'prop-types';
import React from 'react';
import './CollectionPage.css';

// Collection name/picture/description components
export default function CollectionInfo({ name, description }) {
  return (
    <div>
      <div className="collectionHeading" style={{ fontFamily: 'Work Sans', fontWeight: 'bold', fontSize: '600' }}>
        {name}
      </div>
      <div className="collectionParagraph" style={{ fontFamily: 'DM Sans', fontWeight: 'normal', fontSize: '400' }}>
        {description}
      </div>
    </div>
  );
}

CollectionInfo.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
