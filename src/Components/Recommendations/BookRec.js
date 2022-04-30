/*
    ============ TODO =============
    - Get current book's tags
    - query airtable for a list of similar books
    - store the list somewhere

    Prioritization:
      primary -> age-range, grade-range, race/ethnicity, and identity
      secondary -> author,  genre, theme/lessons

    Filter:
      must make sure that the same book is not shown

    How to make sure prioritization is in the correct range:
      - priorisation: books that have the most correct matches to the top tier.
      - top tier: age_range, grade_range, race/ethnicity
      - if books have same number of correct matches,
        prioritize age_range > grade_range > race_ethnicity

    Challenges:
      - Tweak filter that can work with array of data
      - Tweak filter to work with range of values

    If airtable filter doesn't work:
      fetch all books from airtable
      apply filters and increment the priority counter for each book accordingly
      sort based on priority and display the top n books

*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookCards from './BookRecCards';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function RecCardsDisplay({
  minAge, maxAge, minGrade, maxGrade, raceEthnicity,
}) {
  const [book, setBook] = useState([]);
  const gradeList = ['0 to Pre-K', 'Kindergarten', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const prioMap = new Map();
  const [recList, setRecList] = useState([]);
  // const [ageRange, setAgeRange] = useState([]);
  // const [gradeRange, setGradeRange] = useState([]);
  /*
  const [ethnicity, setEthnicity] = useState([]); */
  // const [identity, setIdentity] = useState();
  // const [filteredRec, setFilteredRec] = useState([]);

  // const getCards = () => {
  //   base('Book').select({ view: 'Grid view' }).all()
  //     .then((records) => {
  //       setBook(records);
  //     });
  // };

  // Instead of using props, we pull bookId from URL
  const { bookId } = useParams();

  // Airtable Filter implementation
  // filterByFormula: `IF(${field} = {id},
  // SEARCH("search for age_range", "id"), IF("", "", SEARCH("${fieldKeyword}", {${field}})))`
  /*
IF(
        ${field} = {id},
        SEARCH("search for age_range", "id"),
        IF("", "", SEARCH("${fieldKeyword}", {${field}}))
      )
  */
  console.log({ minAge });
  console.log({ maxAge });
  console.log({ minGrade });
  console.log({ maxGrade });
  console.log({ raceEthnicity });

  function RecFilter(field, fieldKeyword) {
    // const map1 = new Map();
    base('Book').select({
      view: 'Grid view',
    }).eachPage((records, fetchNextPage) => {
      setBook(records);
      records.forEach((record) => {
        // do not check with the identical book
        if (bookId !== record.get('id')) {
          let priority = 0;
          if ((minAge <= record.fields.age_max) && (maxAge >= record.fields.age_min)) {
            priority += 2;
          }

          const minGradeIndex = gradeList.indexOf(minGrade, 0);
          const maxGradeIndex = gradeList.indexOf(maxGrade, 0);
          const minGradeIndexRecord = gradeList.indexOf(record.fields.grade_min, 0);
          const maxGradeIndexRecord = gradeList.indexOf(record.fields.grade_max, 0);

          if ((minGradeIndex <= maxGradeIndexRecord) && (maxGradeIndex >= minGradeIndexRecord)) {
            priority += 2;
          }

          if (raceEthnicity && record.fields['race/ethnicity']) {
            for (let i = 0; i < raceEthnicity.length; i += 1) {
              if (record.fields['race/ethnicity'].includes(raceEthnicity[i])) {
                priority += 1;
              }
            }
          }
          console.log(record.get('id'), priority);
          /*
          race
          identity
          genre
        */
          // Storing book ID based on its priority in a Map data structure
          // Key is priority; Value is an array of corresponding bookIDs
          if (prioMap.has(priority)) {
            const array = [];
            const prioList = array.concat(prioMap.get(priority));
            const newPrioList = prioList.concat(record.get('id'));
            prioMap.set(priority, newPrioList);
          } else {
            prioMap.set(priority, record.get('id'));
          }
          console.log(prioMap);
          /*
          // console.log(record.fields['race/ethnicity']);
          if (record.fields['race/ethnicity'] === undefined) {
            console.log('Race/Ethnicity is undefined');
          } else if (prioMap.has(priority)) {
            const prioList = prioMap.get(priority);
            let newPrioList = prioList;
            for (let i = 0; i < record.fields['race/ethnicity'].length; i += 1) {
              if (!prioList.includes(record.fields['race/ethnicity'][i])) {
                newPrioList = prioList.concat(record.fields['race/ethnicity'][i]);
              }
            }
            prioMap.set(priority, newPrioList);
          } else {
            prioMap.set(priority, record.fields['race/ethnicity']);
          }
          // console.log(prioMap);
          console.log('.');
          */

          for (const [key, value] of prioMap) {
            console.log(`${key}=${value}`);
          }
        }
      });
      console.log(fieldKeyword);
      console.log(bookId);
      /*
      book.forEach((record) => {

      });
      */
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    }, (err) => {
      if (err) { console.error(err); }
    });
  }

  // console.log(book);
  // console.log(ageRange);

  useEffect(() => {
    // getCards();
    RecFilter('id', bookId);
    // console.log(curBook.record);
  }, []);

  return (
    <div>
      <h2>Books Like This</h2>
      <div className="library-display">
        {book.map((card) => (
          <BookCards
            key={card.id}
            id={card.id}
            title={card.fields.title !== undefined ? card.fields.title : 'MISSING TITLE'}
            author={card.fields.author !== undefined ? card.fields.author[0] : 'MISSING AUTHOR'}
            image={card.fields.image !== undefined ? card.fields.image[0].url : 'MISSING IMAGE'}
          />
        ))}
      </div>
    </div>
  );
}

RecCardsDisplay.propTypes = {
  minAge: PropTypes.number,
  maxAge: PropTypes.number,
  minGrade: PropTypes.string,
  maxGrade: PropTypes.string,
  raceEthnicity: PropTypes.string,
};

RecCardsDisplay.defaultProps = {
  minAge: 0,
  maxAge: 0,
  minGrade: '0',
  maxGrade: '0',
  raceEthnicity: '0',
};
