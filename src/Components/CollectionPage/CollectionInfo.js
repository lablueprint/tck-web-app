import PropTypes from 'prop-types';
import React from 'react';
import './CollectionPage.css';

// Collection name/picture/description components
export default function CollectionInfo({ name, picture, description }) {
  return (
    <div>
      <div className="Header">
        {name}
        <img className="collection-card-image" src={picture} alt="author" />
      </div>
      <div className="SubHeader">
        About this collection
      </div>
      <div className="Paragraph">
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
