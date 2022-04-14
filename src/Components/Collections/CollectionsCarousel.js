/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'swiper/css/bundle';
import 'swiper/css';
import React, { useRef, useState } from 'react';
import propTypes from 'prop-types';
import './Collection.css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import SwiperCore, {
  Navigation, A11y,
} from 'swiper';
import { renderToString } from 'react-dom/server';

// import AuthoredWorkCard from './AuthoredWorkCard';
// import IllustratedWorkCard from './IllustratedWorkCard';
import Collection from './Collection';

const defaultOnSlideChange = () => { };
// Authored and illustrated work components
function CollectionsCarousel({
  elementArray, slidesAtATime, prevArrow, nextArrow,
  widthPercent, spaceBetweenEntries, swiperHeight, cardImageHeightPercent,
  cardImageWidthPercent, shouldLoop, centeredSlides, isCollectionPageHeader, setCollecID,
}) {
  SwiperCore.use([Navigation, A11y]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [swiperInst, setSwiper] = useState(null);

  const OnSlideChange = () => {
    const document = swiperInst.slides[swiperInst.activeIndex].innerHTML;
    // const element = String(document);
    const href = document.split('/')[2].split('" ');
    // console.log(href[0]);
    setCollecID(href[0]);
  };
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
        style={{
          zIndex: '0', marginLeft: 'auto', marginRight: 'auto', width: '90%',
        }}
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
        // onInit={(swiper) => { swiperInst = swiper; }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onSlideChange={isCollectionPageHeader ? OnSlideChange : defaultOnSlideChange}
        modules={[Navigation, A11y]}
      >
        {elementArray.map((element) => (
          // <div style={{ paddingTop: '20', paddingBottom: '20' }}>
          <SwiperSlide>
            <Collection
              key={element.id}
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
    id: propTypes.number,
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
};

CollectionsCarousel.defaultProps = {
  widthPercent: 100,
  spaceBetweenEntries: 0,
  swiperHeight: 150,
  shouldLoop: false,
  centeredSlides: false,
  isCollectionPageHeader: false,
  setCollecID: defaultOnSlideChange,
};

export default CollectionsCarousel;

// refactor the carousel to make these editable:
// slides per view
// background color
// arrow color
// width
// space between entries
// looping
