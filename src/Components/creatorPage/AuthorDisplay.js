import React, { useState, useEffect } from 'react';
import AuthorInfo from './AuthorInfo';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function AuthorDisplay() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    base('Creator').select({ maxRecords: 1, view: 'Grid view' }).all()
      .then((records) => {
        setPosts(records);
      });
  };

  useEffect(getPosts, []);

  return posts.map((post) => (
    <AuthorInfo
      key={post.fields.id}
      author={post.fields.name}
      bio={post.fields.bio}
      link={post.fields.links}
    />
  ));
}

export default AuthorDisplay;
