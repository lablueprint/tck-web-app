/* eslint-disable import/no-unresolved */
import 'swiper/css/bundle';
import 'swiper/css';
import React, { useRef, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import './CollectionCarousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, A11y,
} from 'swiper';
import { v4 as uuidv4 } from 'uuid';
import Collection from './Collection';

// let init = 1;
const defaultOnSlideChange = () => { };
// Authored and illustrated work components
function CollectionsCarousel({
  elementArray, slidesAtATime, prevArrow, nextArrow,
  widthPercent, spaceBetweenEntries, swiperHeight, cardImageHeightPercent,
  cardImageWidthPercent, shouldLoop, centeredSlides, isCollectionPageHeader, setCollecID, initialID,
}) {
  SwiperCore.use([Navigation, A11y]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);
  const [swiperInst, setSwiper] = useState(null);

  const OnSlideChange = () => {
    const document = swiperInst.slides[swiperInst.activeIndex].innerHTML;
    const href = document.split('/')[2].split('"');
    setCollecID(href[0]);
  };

  useEffect(() => {
    if (isCollectionPageHeader) {
      const swiperArray = swiperRef.current.swiper.slides.map((element) => element.innerHTML.split('/')[2].split('" ')[0].split('"')[0]);
      swiperRef.current.swiper.slideTo(
        swiperArray.findIndex((element) => initialID === element),
      );
      setCollecID(initialID);
    }
  }, [elementArray]);
  return (

    <div
      className="collection-carousel-wrapper"
      style={{
        height: `${swiperHeight}px`, width: `${widthPercent}%`,
      }}
    >
      <div
        className="carousel-button-prev"
      >
        <button
          ref={navigationPrevRef}
          type="button"
        >
          <img src={prevArrow} alt="Left navigation arrow" />

        </button>
      </div>
      <Swiper
        style={{ zIndex: '0', width: '90%' }}
        ref={swiperRef}
        loop={shouldLoop}
        centeredSlides={centeredSlides}
        centerInsufficientSlides
        on="true"
        onSwiper={setSwiper}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesPerGroup: isCollectionPageHeader ? 1 : 2,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: isCollectionPageHeader ? 1 : 3,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: slidesAtATime,
            spaceBetween: spaceBetweenEntries,
            slidesPerGroup: isCollectionPageHeader ? 1 : slidesAtATime,
          },
        }}
        direction="horizontal"
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onSlideChangeTransitionEnd={isCollectionPageHeader ? OnSlideChange : defaultOnSlideChange}
        modules={[Navigation, A11y]}
      >
        {elementArray.map((element) => (
          <SwiperSlide key={uuidv4()}>
            <Collection
              Collid={element.id}
              image={element.fields.image !== undefined ? element.fields.image[0].url : 'MISSING IMAGE'}
              name={element.fields.name !== undefined ? element.fields.name : 'MISSING TITLE'}
              description={element.fields.description !== undefined ? element.fields.description : 'MISSING DESCRIPTION'}
              imageHeightPercent={cardImageHeightPercent}
              imageWidthPercent={cardImageWidthPercent}
              isCollectionPageHeader={isCollectionPageHeader}
            />
          </SwiperSlide>

        ))}
      </Swiper>
      <div
        className="carousel-button-next"
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

CollectionsCarousel.propTypes = {
  elementArray: propTypes.arrayOf(propTypes.shape({
    author: propTypes.string,
    image: propTypes.string,
    title: propTypes.string,
    id: propTypes.string,
  })).isRequired,

  slidesAtATime: propTypes.number.isRequired,
  prevArrow: propTypes.string.isRequired,
  nextArrow: propTypes.string.isRequired,
  widthPercent: propTypes.number,
  spaceBetweenEntries: propTypes.number,
  swiperHeight: propTypes.number,
  cardImageHeightPercent: propTypes.number.isRequired,
  cardImageWidthPercent: propTypes.number.isRequired,
  shouldLoop: propTypes.bool,
  centeredSlides: propTypes.bool,
  isCollectionPageHeader: propTypes.bool,
  setCollecID: propTypes.func,
  initialID: propTypes.string,
};

CollectionsCarousel.defaultProps = {
  widthPercent: 100,
  spaceBetweenEntries: 0,
  swiperHeight: 150,
  shouldLoop: false,
  centeredSlides: false,
  isCollectionPageHeader: false,
  setCollecID: defaultOnSlideChange,
  initialID: '',
};

export default CollectionsCarousel;
