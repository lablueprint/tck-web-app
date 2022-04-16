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
      - run the filter function once for each category
        and put all filtered books into a state/map. O(n)
      - priorisation: books that have the most correct matches to the top tier.
      - top tier: age_range, grade_range, race/ethnicity
      - if books have same number of correct matches,
        prioritize age_range > grade_range > race_ethnicity

    Challenges:
      - Tweak filter that can work with array of data
      - Tweak filter to work with range of values

*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookCards from './BookRecCards';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function RecCardsDisplay() {
  const [book, setBook] = useState([]);
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
  function RecFilter(field, fieldKeyword) {
    // const map1 = new Map();
    base('Book').select({
      filterByFormula: `IF(${field} = {id}, SEARCH("search for age_range", "id"), IF("", "", SEARCH("${fieldKeyword}", {${field}})))`,
      maxRecords: 3,
      view: 'Grid view',
    }).eachPage((records, fetchNextPage) => {
      setBook(records);
      records.forEach((record) => {
        console.log(fieldKeyword);
        console.log('Retrieved', record.get('id'));
        console.log('age min: ', record.fields.age_min);
        console.log('age max: ', record.fields.age_max);
        console.log('grade min: ', record.fields.grade_min);
        console.log('grade_max: ', record.fields.grade_max);
        console.log(record.fields['race/ethnicity']);
      });
      console.log(fieldKeyword);
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
