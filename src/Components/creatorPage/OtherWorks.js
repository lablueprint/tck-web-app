/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import './OtherWorks.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper';
import AuthoredWorkCard from './AuthoredWorkCard';
import IllustratedWorkCard from './IllustratedWorkCard';

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
  // <div style={{ background: '#f2f2f2' }}>
    <Swiper
      style={{ background: '#f2f2f2' }}
      spaceBetween={59.05}
      autoHeight
        // centeredSlides
        // width={745}
      on="true"
      slidesPerView={4}
      slidesPerGroup={4}
      direction="horizontal"
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
    >
      {/* <div> */}
      {/* {authoredWorks.length && <div> Authored Works: </div>} */}
      <div>
        {authoredWorks.map((element) => (
          <SwiperSlide>
            <AuthoredWorkCard
              key={element.id}
              id={element.id}
              image={element.image}
              title={element.title}
            />
          </SwiperSlide>
        ))}
      </div>
      {/* {illustratedWorks.length && <div> Illustrated Works: </div>} */}
      <div>
        {illustratedWorks.map((element) => (
          <SwiperSlide>
            <IllustratedWorkCard
              key={element.id}
              id={element.id}
              image={element.image}
              title={element.title}
            />
          </SwiperSlide>
        ))}
      </div>
      {/* <button onClick={(swiper) => swiper.slideNext()} type="button">
      Slide to the next slide</button> */}
      {/* </div> */}
    </Swiper>
  // </div>
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
