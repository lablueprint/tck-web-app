import React from 'react';
import { PropTypes } from 'prop-types';

import AboutBook from './AboutBook';
import AdditionalResources from './AdditionalResources';

function SideCards({
  authors, illustrators, ageMin, ageMax, gradeMin, gradeMax,
  bookType, datePublished, readAloudURL, educatorURLs, bookshopURL,
}) {
  return (
    <div>
      <AboutBook
        authors={authors}
        illustrators={illustrators}
        ageMin={ageMin}
        ageMax={ageMax}
        gradeMin={gradeMin}
        gradeMax={gradeMax}
        bookType={bookType}
        datePublished={datePublished}
        bookshopURL={bookshopURL}
      />
      <AdditionalResources
        readAloudURL={readAloudURL}
        educatorURLs={educatorURLs}
      />
    </div>
  );
}

SideCards.propTypes = {
  bookshopURL: PropTypes.string,
  readAloudURL: PropTypes.string,
  educatorURLs: PropTypes.arrayOf(PropTypes.string),
  ageMin: PropTypes.number,
  ageMax: PropTypes.number,
  gradeMin: PropTypes.string,
  gradeMax: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  })),
  illustrators: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  })),
  bookType: PropTypes.string,
  datePublished: PropTypes.string,
};

SideCards.defaultProps = {
  bookshopURL: '',
  readAloudURL: '',
  educatorURLs: [],
  ageMin: -1,
  ageMax: -1,
  gradeMin: '',
  gradeMax: '',
  authors: [],
  illustrators: [],
  bookType: '',
  datePublished: '',
};

export default SideCards;
