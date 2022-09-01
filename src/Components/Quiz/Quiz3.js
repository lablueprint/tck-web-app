import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import {
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProgressBar from './ProgressBar';
import QuizButton from './QuizButton';
import { useWindowSize } from '../Navigation/Header';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function Quiz3({
  slideCaption, setBookFilters, bookFilters,
  dispatch, type1,
}) {
  const size = useWindowSize();
  const [filters, setFilters] = useState([]);
  let filterVar;

  const getFilters = () => {
    base('Book Tag Metadata').select({
      filterByFormula: `IF(FIND("${'race/ethnicity'}", name) !=0, options, '')`,
      view: 'Grid view',
    }).all()
      .then((records) => {
        filterVar = records[0].fields.options.split(',').map((element) => element.trim());
        setFilters(filterVar);
      });
  };

  function HandleClick(name, checked) {
    if (checked) {
      setBookFilters((prevValue) => ({ ...prevValue, 'race/ethnicity': prevValue['race/ethnicity'].concat(name) }));
    } else {
      setBookFilters((prevValue) => {
        const index = prevValue['race/ethnicity'].indexOf(name);
        prevValue['race/ethnicity'].splice(index, 1);
        return { ...prevValue, 'race/ethnicity': prevValue['race/ethnicity'] };
      });
    }
  }

  useEffect(getFilters, []);
  return (
    <div>
      <h1 style={{ fontFamily: 'DM Sans', color: '#444444', marginTop: '150px' }}>
        {slideCaption}
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: size.width > 1024 ? 'repeat(3, minmax(0, 1fr))' : 'repeat(1, minmax(0, 1fr))' }}>
        {filters.map((option) => (
          <QuizButton
            desiredLabel={option}
            buttonCaption={option}
            onClick={(name, checked) => HandleClick(name, checked)}
            desiredArray={bookFilters['race/ethnicity']}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: 'parent back' })}
          sx={{
            background: '#f79927',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            boxShadow: 'none',
            '&.MuiButtonBase-root:hover': {
              bgcolor: '#F99E16',
            },
          }}
        >
          <ArrowBackIcon />

        </Button>
        <ProgressBar variant="determinate" progress={29} sx={{ flex: '0 1 60%' }} />
        <Button
          disabled={false}
          variant="contained"
          onClick={() => dispatch({ type: type1 })}
          sx={{
            background: '#f79927',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            boxShadow: 'none',
            '&.MuiButtonBase-root:hover': {
              bgcolor: '#F99E16',
            },
          }}
        >
          <ArrowForwardIcon />

        </Button>

      </div>
    </div>
  );
}
Quiz3.propTypes = {
  slideCaption: propTypes.string.isRequired,
  dispatch: propTypes.func.isRequired,
  setBookFilters: propTypes.func.isRequired,
  bookFilters: propTypes.shape({
    bookId: propTypes.string.isRequired,
    'race/ethnicity': propTypes.arrayOf(propTypes.string).isRequired,
    minAge: propTypes.number.isRequired,
    maxAge: propTypes.number.isRequired,
    minGrade: propTypes.number.isRequired,
    maxGrade: propTypes.number.isRequired,
    genre: propTypes.arrayOf(propTypes.string).isRequired,
    book_type: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
  type1: propTypes.string.isRequired,
};
