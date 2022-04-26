import React, { useState, useEffect } from 'react';
import DictionaryCard from '../Components/Dictionary/DictionaryCard';
import './PagesTemp.css';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function Dictionary() {
  const [definitions, setDefinitions] = useState([]);

  const getWordInfo = () => {
    base('Definition').select({ view: 'Grid view' }).all()
      .then((records) => {
        setDefinitions(records);
        console.log(records);
      });
  };

  useEffect(getWordInfo, []);

  return (
    <>
      <div className="title">
        Racial Literacy Terms: Key Terms
      </div>
      {definitions.map((wordInfo) => (
        <DictionaryCard
          key={wordInfo.id}
          word={wordInfo.fields.word !== undefined ? wordInfo.fields.word : 'MISSING WORD'}
          def={wordInfo.fields.definition !== undefined ? wordInfo.fields.definition : 'MISSING DEFINTION'}
          links={wordInfo.fields.links !== undefined ? wordInfo.fields.links : 'MISSING LINK'}
          phoeneticSpelling={wordInfo.fields.phonetic_spelling !== undefined ? wordInfo.fields.phonetic_spelling : 'Missing phonetic spelling'}
        />
      ))}
    </>
  );
}

export default Dictionary;
