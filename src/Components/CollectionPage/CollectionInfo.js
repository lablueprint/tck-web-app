/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import useWindowSize from '../Hooks/useWindowSize';
import './CollectionPage.css';

// Collection name/picture/description components
export default function CollectionInfo({ name, description }) {
  const size = useWindowSize();
  const [displayedDescription, setDisplayedDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => { setDisplayedDescription(description); }, [description]);

  function handleExpand() {
    setDisplayedDescription(description);
    setIsExpanded(true);
  }

  function handleContract() {
    setDisplayedDescription(`${description.substring(0, 150)}...`);
    setIsExpanded(false);
  }

  return (
    <div>
      <div className={size.width > 600 ? 'collection-heading-full' : 'collection-heading-full collection-heading-mobile'}>
        Children's Books from
        {' '}
        {name}
      </div>
      <div className="collection-paragraph">
        {displayedDescription}
      </div>
      {size.width < 600 && description.length > 150
      && (
      <div>
        {isExpanded
          ? (
            <button
              type="button"
              onClick={handleContract}
              style={{
                display: 'flex', flexDirection: 'row', background: 'none', border: 'none',
              }}
            >
              <p className="collection-paragraph" style={{ fontFamily: 'DM Sans', color: '#006bc9', fontWeight: 'bold' }}>See Less</p>
              <ExpandLessIcon style={{ color: '#006bc9' }} />
            </button>
          )
          : (
            <button
              type="button"
              onClick={handleExpand}
              style={{
                display: 'flex', flexDirection: 'row', background: 'none', border: 'none',
              }}
            >
              <p
                className="collection-paragraph"
                style={{
                  fontFamily: 'DM Sans', color: '#006bc9', fontWeight: 'bold', padding: '0',
                }}
              >
                See More
              </p>
              <ExpandMoreIcon style={{ color: '#006bc9' }} />
            </button>
          )}

      </div>
      )}
    </div>
  );
}

CollectionInfo.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
