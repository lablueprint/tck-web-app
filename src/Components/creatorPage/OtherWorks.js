/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'swiper/css/bundle';
import 'swiper/css';
import React, { useEffect, useState, useRef } from 'react';
import propTypes from 'prop-types';
import './OtherWorks.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper';
import RightArrow from '../../Assets/Images/right-arrow.svg';
import LeftArrow from '../../Assets/Images/left-arrow.svg';

// import AuthoredWorkCard from './AuthoredWorkCard';
// import IllustratedWorkCard from './IllustratedWorkCard';
import BookCard from '../bookHub/BookCard';

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
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
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
  // <div style={{ background: '#f2f2f2' }}>

    <div style={{
      display: 'flex', flexDirection: 'column', rowGap: '3rem',
    }}
    >
      {authoredWorks.length && <div> Authored Works: </div>}
      <div className="swiper-container" style={{ background: '#FAFAFA' }}>
        <div className="carousel-button-prev" style={{ display: 'flex', justifyContent: 'center' }}>
          {/* <button
            type="button"
            style={{
              border: 'none', borderRadius: '9999px', background: 'none', color: '#D0D0D0',
            }}
            ref={navigationPrevRef}
          >
            <img src={LeftArrow} alt="left navigation arrow" />
          </button> */}
        </div>
        <Swiper
          style={{
            zIndex: '0', marginLeft: 'auto', marginRight: 'auto', width: '70%',
          }}
          spaceBetween={27}
          // loop
          // createElements
          // centeredSlides
          // centerInsufficientSlides
        // width={745}
          // height={242.22}
          autoHeight
          on="true"
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          direction="horizontal"
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          navigation={{
            draggable: true,
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSlideChange={() => console.log('slide change')}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
        >
          {authoredWorks.map((element) => (
            <div style={{ paddingTop: '20', paddingBottom: '20' }}>
              <SwiperSlide>
                <BookCard
                  key={element.id}
                  id={element.id}
                  image={element.image}
                  title={element.title}
                  author={element.author}
                />
              </SwiperSlide>
            </div>

          ))}
        </Swiper>
        <button ref={navigationPrevRef} type="button">
          <img src={LeftArrow} alt="Right navigation arrow" />

        </button>
        <button ref={navigationNextRef} type="button">
          <img src={RightArrow} alt="Right navigation arrow" />

        </button>
      </div>
      {illustratedWorks.length && <div> Illustrated Works: </div>}
      <div>
        <Swiper
          style={{ zIndex: '0' }}
          spaceBetween={59.05}
          // loop
          // createElements
          // centeredSlides
          // centerInsufficientSlides
        // width={745}
          // height={242.22}
          autoHeight
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
          {illustratedWorks.map((element) => (

            <SwiperSlide>
              <BookCard
                key={element.id}
                id={element.id}
                image={element.image}
                title={element.title}
                author={element.author}
              />
            </SwiperSlide>

          ))}
        </Swiper>
      </div>
      <div className="carousel-button-prev" style={{ display: 'flex', justifyContent: 'center' }} ref={navigationPrevRef}>
        <button
          type="button"
          style={{
            border: 'none', borderRadius: '9999px', background: 'none', color: '#D0D0D0',
          }}
        >
          <img src={RightArrow} alt="left navigation arrow" />
        </button>
      </div>
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
