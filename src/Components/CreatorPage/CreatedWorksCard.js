import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import propTypes from 'prop-types';
import './CreatedWorksCard.css';
import RightArrowAuthorPage from '../../Assets/Images/right-arrow-author-page.png';
import LeftArrowAuthorPage from '../../Assets/Images/left-arrow-author-page.png';
import Carousel from './BookCarousel';
import base from '../../airtable';

const styles = {
  root: {
    width: '45%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 75,
    paddingRight: 50,
  },
  mobileRoot: {
    width: '100vw',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleText: {
    alignSelf: 'flex-start',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '28px',
    textAlign: 'center',
    color: '#444444',
    '@media (max-width: 960px)': {
      padding: 2,
    },
  },
  creatorText: {
    alignSelf: 'flex-start',
    paddingLeft: 5,
    fontWeight: 700,
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#444444',
  },
};

function CreatedWorksCard({ authoredBookIds, illustratedBookIds }) {
  const [authoredWorks, setAuthoredWorks] = useState([]);
  const [illustratedWorks, setillustratedWorks] = useState([]);
  const [width, setWidth] = useState(
    window.innerWidth,
  );

  function FindWorks() {
    if (authoredBookIds) {
      authoredBookIds.forEach((element) => {
        base('Book').find(element, (error, record) => {
          if (error) {
            console.error(error);
          }
          setAuthoredWorks((prevValue) => prevValue.concat(
            {
              author: { name: record.fields.author_name !== undefined ? record.fields.author_name : ['MISSING CREATOR'], id: record.fields.author !== undefined ? record.fields.author : ['MISSING CREATOR'] },
              image: (record.fields.image !== undefined ? record.fields.image[0].url : ''),
              title: (record.fields.title !== undefined ? record.fields.title : 'No Title'),
              id: element,
            },
          ));
        });
      });
    }
    if (illustratedBookIds) {
      illustratedBookIds.forEach((element) => {
        base('Book').find(element, (error, record) => {
          if (error) {
            console.error(error);
          }
          setillustratedWorks((prevValue) => prevValue.concat(
            {
              author: { name: record.fields.author_name !== undefined ? record.fields.author_name : ['MISSING CREATOR'], id: record.fields.author !== undefined ? record.fields.author : ['MISSING CREATOR'] },
              image: (record.fields.image !== undefined ? record.fields.image[0].url : ''),
              title: (record.fields.title !== undefined ? record.fields.title : 'No Title'),
              id: element,
            },
          ));
        });
      });
    }
  }

  useEffect(FindWorks, [authoredBookIds, illustratedBookIds]);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 960;

  return (
    <Box style={isMobile ? styles.mobileRoot : styles.root}>
      {authoredWorks.length !== 0
       && (
       <>
         <Typography sx={styles.titleText}> Authored </Typography>
         <Carousel
           elementArray={authoredWorks}
           slidesAtATime={isMobile ? 1 : 3}
           prevArrow={LeftArrowAuthorPage}
           nextArrow={RightArrowAuthorPage}
           widthPercent={100}
           spaceBetweenEntries={16}
           inAuthorPage
         />
       </>
       )}
      {illustratedWorks.length !== 0 && (
        <>
          <Typography sx={styles.titleText}> Illustrated </Typography>
          <Carousel
            elementArray={illustratedWorks}
            slidesAtATime={isMobile ? 1 : 3}
            prevArrow={LeftArrowAuthorPage}
            nextArrow={RightArrowAuthorPage}
            widthPercent={100}
            spaceBetweenEntries={16}
            inAuthorPage
          />
        </>
      )}
    </Box>
  );
}

CreatedWorksCard.propTypes = {
  authoredBookIds: propTypes.arrayOf(propTypes.string),
  illustratedBookIds: propTypes.arrayOf(propTypes.string),
};

CreatedWorksCard.defaultProps = {
  authoredBookIds: [],
  illustratedBookIds: [],
};

export default CreatedWorksCard;
