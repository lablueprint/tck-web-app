/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import DictionaryCard from '../Components/Dictionary/DictionaryCard';
import './DictionaryPage.css';

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
      });
  };

  useEffect(getWordInfo, []);

  return (
    <div className="dictionary-background">
      <div className="tagline">
        TERMS TO KNOW:
      </div>
      <div className="title">
        Racial Literacy Dictionary
      </div>
      <div className="subtitle">
        <b> Racial literacy </b>
        is the knowledge, skills, advocacy and awareness needed to understand race and disrupt racism on a personal and systemic level. Racial literacy also provides tools to counter, cope and understand the role racism and white supremacy have in the larger society.
      </div>
      <div className="subtitle">
        <b> Why is racial literacy important? </b>
        Absence of a shared language can add to dysfunction, misrepresentation and lack of clarity surrounding racial equity.  Clearly defined terminology provides a shared language, and opportunities for solidarity, when engaging in open and honest conversation about issues of race and identity.
      </div>
      <div className="subtitle">
        We’ve outlined a list of some key terms to know!
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
    </div>
  );
}

export default Dictionary;
