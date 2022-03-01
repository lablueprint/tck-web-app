import PropTypes from 'prop-types';
import React from 'react';
import './CollectionPage.css';

// Collection name/picture/description components
export default function CollectionInfo({ name, picture, description }) {
  return (
    <>
      <div className="Header">
        {name}
        <img width="10%" height="10%" align="center" src={picture} alt="author" />
      </div>
      <div className="SubHeader">
        About this collection
      </div>
      <div className="Paragraph">
        {description}
      </div>
    </>
  );
}

CollectionInfo.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  description: PropTypes.string.isRequired,
};
