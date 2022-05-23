/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types';
import React from 'react';
import './CollectionPage.css';

// Collection name/picture/description components
export default function CollectionInfo({ name, description }) {
  return (
    <div>
      <div className="collection-heading">
        Children's Books from
        {' '}
        {name}
      </div>
      <div className="collection-paragraph">
        {description}
      </div>
    </div>
  );
}

CollectionInfo.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
