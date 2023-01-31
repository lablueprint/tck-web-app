import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { Typography } from '@mui/material';
import RightArrow from '../../Assets/Images/right-arrow.png';
import LeftArrow from '../../Assets/Images/left-arrow.png';
import Carousel from '../CreatorPage/BookCarousel';
import RecFilter from '../Recommendations/BookRec';

const styles = {
  container: {
    margin: '5vh 2vw 0 2vw',
  },
  header: {
    textAlign: 'start',
    color: '#2F2F2F',
    fontFamily: 'Work Sans',
    fontSize: '18px',
    paddingLeft: '2vw',
    marginBottom: 0,
    fontWeight: 600,
  },
};

function BooksLikeThis({
  bookId,
  minAge,
  maxAge,
  minGrade,
  maxGrade,
  raceEthnicity,
  genre,
  bookType,
}) {
  const [similarBooks, setSimilarBooks] = useState([]);

  // Gets list of recommended books
  const getBooksLikeThis = async () => {
    const recList = await RecFilter(
      bookId,
      minAge,
      maxAge,
      minGrade,
      maxGrade,
      raceEthnicity,
      genre,
      bookType,
    );

    setSimilarBooks(recList.map((element) => ({
      author: { name: element.fields.author_name !== undefined ? element.fields.author_name : ['MISSING CREATOR'], id: element.fields.author !== undefined ? element.fields.author : ['MISSING CREATOR'] },
      image: (element.fields.image !== undefined ? element.fields.image[0].url : ''),
      title: (element.fields.title !== undefined ? element.fields.title : 'No Title'),
      id: element.id,
    })));
  };

  useEffect(() => {
    getBooksLikeThis();
  }, [bookId, minAge, maxAge, minGrade, maxGrade, raceEthnicity, genre, bookType]);

  return (
    <div style={styles.container}>
      <Typography style={styles.header}>
        Books Like This
      </Typography>
      <Carousel
        elementArray={similarBooks}
        slidesAtATime={6}
        prevArrow={LeftArrow}
        nextArrow={RightArrow}
        widthPercent={100}
        spaceBetweenEntries={16}
      />
    </div>
  );
}

BooksLikeThis.propTypes = {
  bookId: propTypes.string.isRequired,
  minAge: propTypes.number.isRequired,
  maxAge: propTypes.number.isRequired,
  minGrade: propTypes.string.isRequired,
  maxGrade: propTypes.string.isRequired,
  raceEthnicity: propTypes.arrayOf(propTypes.string).isRequired,
  genre: propTypes.arrayOf(propTypes.string).isRequired,
  bookType: propTypes.arrayOf(propTypes.string).isRequired,
};

export default BooksLikeThis;
