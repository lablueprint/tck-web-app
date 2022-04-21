/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'swiper/css/bundle';
import 'swiper/css';
import React, { useRef } from 'react';
import propTypes from 'prop-types';
import './OtherWorks.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, A11y,
} from 'swiper';
import { v4 as uuidv4 } from 'uuid';
import BookCard from '../bookHub/BookCard';

// Authored and illustrated work components
function Carousel({
  elementArray, slidesAtATime, prevArrow, nextArrow, widthPercent, spaceBetweenEntries,
}) {
  SwiperCore.use([Navigation, A11y]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', rowGap: '3rem',
    }}
    >
      <div
        style={{
          display: 'flex', flexDirection: 'row', height: '350', width: `${widthPercent}%`,
        }}
      >
        <div
          className="carousel-button-prev"
          style={{
            display: 'flex', justifyContent: 'end', flexGrow: 1, alignItems: 'center', marginRight: 46,
          }}
        >
          <button
            ref={navigationPrevRef}
            style={{
              border: 'none', borderRadius: '9999px', background: 'none', color: '#D0D0D0',
            }}
            type="button"
          >
            <img src={prevArrow} alt="Left navigation arrow" />

          </button>
        </div>
        <Swiper
          style={{
            zIndex: '0', marginLeft: 'auto', marginRight: 'auto', width: '100%', height: '400px',
          }}
          // loop
          // createElements
          // centeredSlides
        //   centerInsufficientSlides
        // width={745}
          // height={350}
        //   autoHeight
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
              slidesPerView: slidesAtATime,
              spaceBetween: spaceBetweenEntries,
            },
          }}
          direction="horizontal"
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSlideChange={() => console.log('slide change')}
          modules={[Navigation, A11y]}
        >
          {elementArray.map((element) => (
            <div style={{ paddingTop: '20', paddingBottom: '20' }}>
              <SwiperSlide key={uuidv4()}>
                <BookCard
                  id={element.id}
                  image={element.image}
                  title={element.title}
                  author={element.author}
                  inCarousel
                />
              </SwiperSlide>
            </div>

          ))}
        </Swiper>
        <div
          style={{
            display: 'flex', justifyContent: 'start', flexGrow: 1, alignItems: 'center', marginLeft: 46,
          }}
        >
          <button
            ref={navigationNextRef}
            style={{
              border: 'none', borderRadius: '9999px', background: 'none', color: '#D0D0D0', marginLeft: '10%',
            }}
            type="button"
          >
            <img src={nextArrow} alt="Right navigation arrow" />

          </button>
        </div>
      </div>
    </div>
  );
}

Carousel.propTypes = {
  elementArray: propTypes.arrayOf(propTypes.shape({
    author: propTypes.arrayOf(propTypes.string),
    image: propTypes.string,
    title: propTypes.string,
    id: propTypes.string,
  })).isRequired,

  slidesAtATime: propTypes.number.isRequired,
  prevArrow: propTypes.string.isRequired,
  nextArrow: propTypes.string.isRequired,
  widthPercent: propTypes.number,
  spaceBetweenEntries: propTypes.number,
};

Carousel.defaultProps = {
  widthPercent: 100,
  spaceBetweenEntries: 0,
};

export default Carousel;
