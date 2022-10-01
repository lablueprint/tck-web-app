/* eslint-disable import/no-unresolved */
import 'swiper/css/bundle';
import 'swiper/css';
import React, { useRef, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import './CollectionsCarousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation, A11y, EffectCoverflow,
} from 'swiper';
import { v4 as uuidv4 } from 'uuid';
import CollectionCard from './CollectionCard';
import primaryBlueIcon from '../../Assets/Images/collection-header-primary-blue-icon.svg';
import blackIcon from '../../Assets/Images/black-card-icon-collection-header.svg';
import redIcon from '../../Assets/Images/red-card-icon-collection-header.svg';
import orangeIcon from '../../Assets/Images/orange-card-icon-collection-header.svg';
import greenIcon from '../../Assets/Images/green-card-icon-collection-header.svg';
import royalBlueIcon from '../../Assets/Images/royal-blue-card-icon-collection-header.svg';
import pinkIcon from '../../Assets/Images/pink-icon-card-collection-header.svg';
import maroonIcon from '../../Assets/Images/maroon-icon-card-collection-header.svg';
import purpleIcon from '../../Assets/Images/purple-icon-card-collection-header.svg';

export const collectionCardColors = [{ backgroundColor: '#393EBA', icon: primaryBlueIcon }, { backgroundColor: '#333333', icon: blackIcon }, { backgroundColor: '#F99E16', icon: orangeIcon }, { backgroundColor: '#3477DE', icon: royalBlueIcon }, { backgroundColor: '#E85757', icon: redIcon }, { backgroundColor: '#20B28F', icon: greenIcon }, { backgroundColor: '#E375DF', icon: pinkIcon }, { backgroundColor: '#B5387C', icon: maroonIcon }, { backgroundColor: '#963CB6', icon: purpleIcon }];

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
  const [activeSlideId, setActiveSlideId] = useState(null);
  let activeSlideIndex = 0;

  const OnSlideChange = () => {
    if (swiperInst !== null) {
      const document = swiperInst.slides[swiperInst.activeIndex].innerHTML;
      const href = document.split('/')[2].split('"');
      setCollecID(href[0]);
      setActiveSlideId(href[0]);
    }
  };

  useEffect(() => {
    swiperRef.current.swiper.on('breakpoint', () => {
      const swiperArray = swiperRef.current.swiper.slides.map((element) => element.innerHTML.split('/')[2].split('" ')[0].split('"')[0]);
      if (activeSlideId !== null) {
        swiperRef.current.swiper.slideTo(
          swiperArray.findIndex((element) => activeSlideId === element),
        );
      } else {
        swiperRef.current.swiper.slideTo(
          swiperArray.findIndex((element) => initialID === element),
        );
      }
    });
  }, [activeSlideId]);

  useEffect(() => {
    if (isCollectionPageHeader) {
      const swiperArray = swiperRef.current.swiper.slides.map((element) => element.innerHTML.split('/')[2].split('" ')[0].split('"')[0]);
      swiperRef.current.swiper.slideTo(
        swiperArray.findIndex((element) => initialID === element),
      );
      setActiveSlideId(initialID);
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
      {isCollectionPageHeader
        ? (
          <Swiper
            style={{ zIndex: '0', width: '90%' }}
            ref={swiperRef}
            loop={shouldLoop}
            centeredSlides={centeredSlides}
            centerInsufficientSlides
            on="true"
            onSwiper={setSwiper}
            breakpoints={isCollectionPageHeader ? {
              320: {
                slidesPerView: 1,
                // spaceBetween: 10,
                slidesPerGroup: 1,
              },
              768: {
                slidesPerView: 2,
                // spaceBetween: spaceBetweenEntries,
                slidesPerGroup: 1,
              },
              990: {
                slidesPerView: slidesAtATime,
                spaceBetween: spaceBetweenEntries,
                slidesPerGroup: 1,
              },
            } : {
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
                slidesPerGroup: isCollectionPageHeader ? 1 : 2,
              },
              // when window width is >= 480px
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: isCollectionPageHeader ? 1 : 3,
              },
              // when window width is >= 640px
              1024: {
                slidesPerView: slidesAtATime,
                spaceBetween: spaceBetweenEntries,
                slidesPerGroup: slidesAtATime,
              },
            }}
            direction="horizontal"
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            coverflowEffect={{
              rotate: 40,
              slideShadows: false,
            }}
            effect="coverflow"
            onSlideChangeTransitionEnd={
              isCollectionPageHeader ? OnSlideChange : defaultOnSlideChange
            }
            modules={[Navigation, A11y, EffectCoverflow]}
          >
            {elementArray.map((element) => {
              activeSlideIndex += 1;
              return (
                <SwiperSlide key={uuidv4()}>
                  <CollectionCard
                    collectionId={element.id}
                    bigLine={element.fields.name !== undefined ? element.fields.name : 'MISSING TITLE'}
                    imageHeightPercent={cardImageHeightPercent}
                    imageWidthPercent={cardImageWidthPercent}
                    isCollectionPageHeader={isCollectionPageHeader}
                    isSlideActive={element.id === activeSlideId}
                    color={collectionCardColors[activeSlideIndex
                     % collectionCardColors.length].backgroundColor}
                    image={collectionCardColors[activeSlideIndex
                 % collectionCardColors.length].icon}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )
        : (
          <Swiper
            style={{ zIndex: '0', width: '90%' }}
            ref={swiperRef}
            loop={shouldLoop}
            centeredSlides={centeredSlides}
            centerInsufficientSlides
            on="true"
            onSwiper={setSwiper}
            breakpoints={isCollectionPageHeader ? {
              320: {
                slidesPerView: 2,
                spaceBetween: spaceBetweenEntries,
                slidesPerGroup: 1,
              },
              990: {
                slidesPerView: slidesAtATime,
                spaceBetween: spaceBetweenEntries,
                slidesPerGroup: 1,
              },
            } : {
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
                slidesPerGroup: isCollectionPageHeader ? 1 : 2,
              },
              // when window width is >= 480px
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: isCollectionPageHeader ? 1 : 3,
              },
              // when window width is >= 640px
              1024: {
                slidesPerView: slidesAtATime,
                spaceBetween: spaceBetweenEntries,
                slidesPerGroup: slidesAtATime,
              },
            }}
            direction="horizontal"
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onSlideChangeTransitionEnd={
              isCollectionPageHeader ? OnSlideChange : defaultOnSlideChange
            }
            modules={[Navigation, A11y]}
          >
            {elementArray.map((element) => {
              activeSlideIndex += 1;
              return (
                <SwiperSlide key={uuidv4()}>
                  <CollectionCard
                    collectionId={element.id}
                    bigLine={element.fields.name !== undefined ? element.fields.name : 'MISSING TITLE'}
                    imageHeightPercent={cardImageHeightPercent}
                    imageWidthPercent={cardImageWidthPercent}
                    isCollectionPageHeader={isCollectionPageHeader}
                    isSlideActive={element.id === activeSlideId}
                    color={collectionCardColors[activeSlideIndex
                   % collectionCardColors.length].backgroundColor}
                    image={collectionCardColors[activeSlideIndex
               % collectionCardColors.length].icon}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

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
  // activeSlideString: propTypes.string,
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
  // activeSlideString: '',
};

export default CollectionsCarousel;
