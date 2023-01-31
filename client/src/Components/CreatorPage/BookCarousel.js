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
  elementArray, slidesAtATime, prevArrow, nextArrow, widthPercent, spaceBetweenEntries, inQuiz,
  inAuthorPage,
}) {
  SwiperCore.use([Navigation, A11y]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const breakpoints = {
    450: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    670: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    890: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1150: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1320: {
      slidesPerView: slidesAtATime,
      spaceBetween: spaceBetweenEntries,
    },
  };

  const quizBreakpoints = {
    450: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    670: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    890: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1150: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1320: {
      slidesPerView: slidesAtATime,
      spaceBetween: spaceBetweenEntries,
    },
  };

  const authorBreakpoints = {
    468: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    650: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    960: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1300: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  };

  let bp;
  if (inQuiz) bp = quizBreakpoints;
  else if (inAuthorPage) bp = authorBreakpoints;
  else bp = breakpoints;

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
        }}
        on="true"
        breakpoints={bp}
        direction="horizontal"
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        modules={[Navigation, A11y]}
      >
        {elementArray.map((element) => (
          <SwiperSlide key={uuidv4()} style={{ width: 'max-content', paddingTop: '20', paddingBottom: '20' }}>
            <BookCard
              id={element.id}
              image={element.image}
              title={element.title}
              author={element.author}
              inCarousel
              inQuiz={inQuiz}
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
    author: propTypes.shape({
      name: propTypes.oneOfType([propTypes.arrayOf(propTypes.string), propTypes.string]).isRequired,
      id: propTypes.oneOfType([propTypes.arrayOf(propTypes.string), propTypes.string]).isRequired,
    }).isRequired,
    image: propTypes.string,
    title: propTypes.string,
    id: propTypes.string,
  })).isRequired,

  slidesAtATime: propTypes.number.isRequired,
  prevArrow: propTypes.string.isRequired,
  nextArrow: propTypes.string.isRequired,
  widthPercent: propTypes.number,
  spaceBetweenEntries: propTypes.number,
  inQuiz: propTypes.bool,
  inAuthorPage: propTypes.bool,
};

Carousel.defaultProps = {
  widthPercent: 100,
  spaceBetweenEntries: 0,
  inQuiz: false,
  inAuthorPage: false,
};

export default Carousel;
