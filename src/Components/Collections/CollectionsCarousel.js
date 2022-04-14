/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'swiper/css/bundle';
import 'swiper/css';
import React, { useRef, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import './Collection.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, A11y,
} from 'swiper';
import { renderToString } from 'react-dom/server';

// import AuthoredWorkCard from './AuthoredWorkCard';
// import IllustratedWorkCard from './IllustratedWorkCard';
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
    const href = document.split('/')[2].split('" ');
    setCollecID(href[0]);
  };

  useEffect(() => {
    if (isCollectionPageHeader) {
      console.log(initialID);
      const swiperArray = swiperRef.current.swiper.slides.map((element) => element.innerHTML.split('/')[2].split('" ')[0]);
      // swiperArray;
      swiperRef.current.swiper.slideTo(
        swiperArray.findIndex((element) => initialID === element),
      );
      setCollecID(initialID);
      // const realNum = swiperInst.activeIndex + 1;
      // swiperRef.current.swiper.slideTo(realNum);
      console.log(swiperRef.current.swiper.realIndex);
      console.log(swiperArray.findIndex((element) => initialID === element));
      console.log(swiperArray);
      // init = 0;
    }
  }, [elementArray]);
  return (

    <div
        // className="swiper-container"
      style={{
        display: 'flex', flexDirection: 'row', height: `${swiperHeight}px`, width: `${widthPercent}%`,
      }}
    >
      <div
        className="carousel-button-prev"
        style={{
          display: 'flex', justifyContent: 'end', flexGrow: 1, alignItems: 'center', marginRight: '10',
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
        ref={swiperRef}
        // initialSlide={isCollectionPageHeader
        //   ? elementArray.findIndex((element) => initialID === element.id) : 0}
        // init={false}
        style={{
          zIndex: '0', marginLeft: 'auto', marginRight: 'auto', width: '90%',
        }}
        // initialSlide={}
        loop={shouldLoop}
          // createElements
        centeredSlides={centeredSlides}
        //   centerInsufficientSlides
        // width={745}
        // height={350}
        //   autoHeight
        on="true"
        onSwiper={setSwiper}
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
        // runCallbacksOnInit
        direction="horizontal"
        // onTransitionStart={onInit}
        // onInit={onInit}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onSlideChangeTransitionEnd={isCollectionPageHeader ? OnSlideChange : defaultOnSlideChange}
        modules={[Navigation, A11y]}
      >
        {elementArray.map((element, index) => (
          // <div style={{ paddingTop: '20', paddingBottom: '20' }}>
          <SwiperSlide key={element.id}>
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
          // </div>

        ))}
      </Swiper>
      <div
          // className="carousel-button-prev"
        style={{
          display: 'flex', justifyContent: 'start', flexGrow: 1, alignItems: 'center', marginLeft: '10',
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

// refactor the carousel to make these editable:
// slides per view
// background color
// arrow color
// width
// space between entries
// looping
