import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import propTypes from 'prop-types';
import './OtherWorks.css';
import RightArrowAuthorPage from '../../Assets/Images/right-arrow-author-page.svg';
import LeftArrowAuthorPage from '../../Assets/Images/left-arrow-author-page.svg';
import Carousel from './BookCarousel';

const styles = {
  root: {
    width: '45%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 75,
    paddingRight: 50,
  },
  titleText: {
    alignSelf: 'flex-start',
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '28px',
    textAlign: 'center',
    color: '#444444',
    paddingBottom: 2,
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

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey }).base(airtableConfig.baseKey);

function CreatedWorksCard({ authorId }) {
  const [authoredWorks, setAuthoredWorks] = useState([]);
  const [illustratedWorks, setillustratedWorks] = useState([]);

  function FindWorks() {
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
              console.error(error);
            }
            setAuthoredWorks((prevValue) => prevValue.concat(
              {
                author: (record.fields.author !== undefined ? record.fields.author : ['MISSING CREATOR']),
                image: (record.fields.image !== undefined ? record.fields.image[0].url : ''),
                title: (record.fields.title !== undefined ? record.fields.title : 'No Title'),
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
                author: (record.fields.author !== undefined ? record.fields.author : ['MISSING CREATOR']),
                image: (record.fields.image !== undefined ? record.fields.image[0].url : ''),
                title: (record.fields.title !== undefined ? record.fields.title : 'No Title'),
                id: element,
              },
            ));
          });
        });
      }
    });
  }

  useEffect(FindWorks, []);

  return (
    <Box style={styles.root}>
      <Typography sx={styles.titleText}>Featured Books</Typography>
      {authoredWorks.length && <Typography sx={styles.creatorText}> Authored </Typography>}
      <Carousel
        elementArray={authoredWorks}
        slidesAtATime={3}
        prevArrow={LeftArrowAuthorPage}
        nextArrow={RightArrowAuthorPage}
        widthPercent={100}
        spaceBetweenEntries={16}
      />
      {illustratedWorks.length && <Typography sx={styles.creatorText}> Illustrated </Typography>}
      <Carousel
        elementArray={illustratedWorks}
        slidesAtATime={3}
        prevArrow={LeftArrowAuthorPage}
        nextArrow={RightArrowAuthorPage}
        widthPercent={100}
        spaceBetweenEntries={16}
      />

    </Box>
  );
}

CreatedWorksCard.propTypes = {
  authorId: propTypes.string.isRequired,
}; export default CreatedWorksCard;
