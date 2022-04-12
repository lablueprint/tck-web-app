import React, { useState, useEffect } from 'react';
import WordTerm from '../Components/Dictionary/WordTerm';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function WordTermDisplay() {
  const [definitions, setDefinitions] = useState([]);

  const getWordInfo = () => {
    base('Definition').select({ view: 'Grid view' }).all()
      .then((records) => {
        setDefinitions(records);
      });
  };

  useEffect(getWordInfo, []);

  return definitions.map((wordInfo) => (
    <div>
      <WordTerm
        word={wordInfo.fields.word !== undefined ? wordInfo.fields.word : 'MISSING WORD'}
        def={wordInfo.fields.definition !== undefined ? wordInfo.fields.definition : 'MISSING DEFINTION'}
        links={wordInfo.fields.links !== undefined ? wordInfo.fields.links : 'MISSING LINK'}
        wordBreakdown={wordInfo.fields.phonetic_spelling !== undefined ? wordInfo.fields.phonetic_spelling : 'Missing phonetic spelling'}
      />
    </div>
  ));
}

export default WordTermDisplay;
