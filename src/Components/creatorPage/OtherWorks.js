/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import './OtherWorks.css';
import SwiperCore, {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper';
import RightArrowAuthorPage from '../../Assets/Images/right-arrow-author-page.svg';
import LeftArrowAuthorPage from '../../Assets/Images/left-arrow-author-page.svg';
import RightArrow from '../../Assets/Images/right-arrow.svg';
import LeftArrow from '../../Assets/Images/left-arrow.svg';
import Carousel from './BookCarousel';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

// Authored and illustrated work components
function CreatedWorksCard({ authorId }) {
  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
  const [authoredWorks, setAuthoredWorks] = useState([]);
  const [illustratedWorks, setillustratedWorks] = useState([]);
  // const swiperHook = useSwiper();
  // const swiper = useSwiper();

  function FindPosts() {
    const id = authorId;
    base('Creator').find(id, (err, records) => {
      if (err) {
        console.error(err);
      }
      const bookid = records.fields.authored;
      const illustratedId = records.fields.illustrated;
      if (bookid.length) {
        bookid.forEach((element) => {
          base('Book').find(element, (error, record) => {
            if (error) {
              console.error(err);
            }
            setAuthoredWorks((prevValue) => prevValue.concat(
              {
                author: record.fields.author,
                image: record.fields.image[0].thumbnails.large.url,
                title: record.fields.title,
                id: element,
              },
            ));
          });
        });
      }
      if (illustratedId.length) {
        illustratedId.forEach((element) => {
          base('Book').find(element, (error, record) => {
            if (error) {
              console.error(err);
            }
            setillustratedWorks((prevValue) => prevValue.concat(
              {
                author: record.fields.author,
                image: record.fields.image[0].thumbnails.large.url,
                title: record.fields.title,
                id: element,
              },
            ));
          });
        });
      }
    });
  }

  useEffect(() => {
    FindPosts();
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', rowGap: '3rem',
    }}
    >
      {authoredWorks.length && <div> Authored Works: </div>}
      <Carousel
        elementArray={authoredWorks}
        slidesAtATime={3}
        prevArrow={LeftArrowAuthorPage}
        nextArrow={RightArrowAuthorPage}
        widthPercent={50}
        spaceBetweenEntries={29}
      />
      {illustratedWorks.length && <div> Illustrated Works: </div>}
      <Carousel
        elementArray={illustratedWorks}
        slidesAtATime={7}
        prevArrow={LeftArrow}
        nextArrow={RightArrow}
        widthPercent={100}
        spaceBetweenEntries={35}
      />

    </div>
  );
}

CreatedWorksCard.propTypes = {
  authorId: propTypes.string.isRequired,
}; export default CreatedWorksCard;

// refactor the carousel to make these editable:
// slides per view
// slides per group
// background color
// arrow color
// width
// space between entries
// looping
