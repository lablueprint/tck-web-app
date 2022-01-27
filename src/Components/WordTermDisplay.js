import React, { useState, useEffect } from 'react';
import WordTerm from './WordTerm';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function WordTermDisplay() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    base('Definition').select({ view: 'Grid view' }).all()
      .then((records) => {
        setPosts(records);
      });
  };

  useEffect(getPosts, []);

  return posts.map((post) => (
    <WordTerm
      word={post.fields.word}
      def={post.fields.definition}
    />
  ));
}

export default WordTermDisplay;
