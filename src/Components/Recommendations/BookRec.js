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
  minAge, maxAge, minGrade, maxGrade, raceEthnicity, genre,
}) {
  const gradeList = ['0 to Pre-K', 'Kindergarten', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const prioMap = new Map();
  const [recList, setRecList] = useState([]);

  // Instead of using props, we pull bookId from URL
  const { bookId } = useParams();

  function RecFilter() {
    base('Book').select({
      view: 'Grid view',
    }).all().then((records) => {
      records.forEach((record) => {
        // do not check with the identical book
        if (bookId !== record.get('id')) {
          let priority = 0;
          const minGradeIndex = gradeList.indexOf(minGrade, 0);
          const maxGradeIndex = gradeList.indexOf(maxGrade, 0);
          const minGradeIndexRecord = gradeList.indexOf(record.fields.grade_min, 0);
          const maxGradeIndexRecord = gradeList.indexOf(record.fields.grade_max, 0);

          // Matching age range gives 2 points
          if ((minAge <= record.fields.age_max) && (maxAge >= record.fields.age_min)) {
            priority += 2;
          }

          // Matching grade range gives 2 points
          if ((minGradeIndex <= maxGradeIndexRecord) && (maxGradeIndex >= minGradeIndexRecord)) {
            priority += 2;
          }

          // Matching race/ethnicity gives 1 point each
          if (raceEthnicity && record.fields['race/ethnicity']) {
            for (let i = 0; i < raceEthnicity.length; i += 1) {
              if (record.fields['race/ethnicity'].includes(raceEthnicity[i])) {
                priority += 1;
              }
            }
          }

          // Matching genre gives 1 point each
          if (genre && record.fields.genre) {
            for (let i = 0; i < genre.length; i += 1) {
              if (record.fields.genre.includes(genre[i])) {
                priority += 1;
              }
            }
          }

          // Storing book ID based on its priority in a Map data structure
          // Key is priority; Value is an array of corresponding bookIDs
          if (prioMap.has(priority)) {
            const array = [];
            const prioList = array.concat(prioMap.get(priority));
            const newPrioList = prioList.concat(record);
            prioMap.set(priority, newPrioList);
          } else {
            prioMap.set(priority, record);
          }
        }
      });
      const sortedArr = [];
      prioMap.forEach((value, key) => {
        sortedArr.push(key);
      });
      sortedArr.sort();
      sortedArr.reverse();

      const finalArr = [];
      let counter = 0;
      for (let i = 0; i < sortedArr.length; i += 1) {
        if (counter === 14) {
          break;
        }
        const value = prioMap.get(sortedArr[i]);
        if (Array.isArray(value)) {
          for (let j = 0; j < value.length; j += 1) {
            if (counter === 14) {
              break;
            }
            finalArr.push(value[j]);
            counter += 1;
          }
        } else {
          finalArr.push(value);
          counter += 1;
        }
      }
      setRecList(finalArr);
    }, (err) => {
      if (err) { console.error(err); }
    });
  }

  // Call the function upon first render
  useEffect(() => {
    RecFilter();
  }, []);

  // Re-render once if recList has changed
  useEffect(() => {}, [recList]);

  return (
    <div>
      <h2>Books Like This</h2>
      <div className="library-display">
        {recList.map((card) => (
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
  genre: PropTypes.string,
};

RecCardsDisplay.defaultProps = {
  minAge: 0,
  maxAge: 0,
  minGrade: '0',
  maxGrade: '0',
  raceEthnicity: '0',
  genre: '0',
};
