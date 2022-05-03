/* eslint-disable import/no-unresolved */
import 'swiper/css/bundle';
import 'swiper/css';
import React, { useRef } from 'react';
import propTypes from 'prop-types';
import './BookCarousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, A11y,
} from 'swiper';
import { v4 as uuidv4 } from 'uuid';
import BookCard from '../BookBrowser/BookCard';

// Authored and illustrated work components
function Carousel({
  elementArray, slidesAtATime, prevArrow, nextArrow, widthPercent, spaceBetweenEntries,
}) {
  SwiperCore.use([Navigation, A11y]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div
      className="book-carousel-wrapper"
      style={{
        width: `${widthPercent}%`,
      }}
    >
      <div
        className="book-carousel-button-prev"
      >
        <button
          ref={navigationPrevRef}
          type="button"
        >
          <img src={prevArrow} alt="Left navigation arrow" />

        </button>
      </div>
      <Swiper
        style={{
          zIndex: '0',
          width: '100%',
          height: '400px',
        }}
        on="true"
        centerInsufficientSlides
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
        modules={[Navigation, A11y]}
      >
        {elementArray.map((element) => (
          <SwiperSlide key={uuidv4()} style={{ paddingTop: '20', paddingBottom: '20' }}>
            <BookCard
              id={element.id}
              image={element.image}
              title={element.title}
              author={element.author}
              inCarousel
            />
          </SwiperSlide>

        ))}
      </Swiper>
      <div
        className="book-carousel-button-next"
      >
        <button
          ref={navigationNextRef}
          type="button"
        >
          <img src={nextArrow} alt="Right navigation arrow" />

        </button>
      </div>
    </div>
  );
}

Carousel.propTypes = {
  elementArray: propTypes.arrayOf(propTypes.shape({
    author: propTypes.oneOfType([propTypes.arrayOf(propTypes.string), propTypes.string]),
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
