/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import propTypes from 'prop-types';
import AuthorInfo from './AuthorInfo';
import CreatedWorksCard from './creatorAvnish';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function AuthorDisplay() {
  const [posts, setPosts] = useState();
  const params = useParams();
  const authId = params.id;

  const getPosts = () => {
    base('Creator').find(
      authId,
      (err, record) => {
        if (err) { console.error(err); return; }
        setPosts(record);
      },
    );
  };

  useEffect(getPosts, []);

  return (
    <div>
      { posts !== undefined
    && (
    <AuthorInfo
      author={posts.fields.name}
      bio={posts.fields.bio}
      links={posts.fields.personal_site}
      authorPic={posts.fields.image[0].thumbnails.large.url}
    />
    ) }
      <CreatedWorksCard authorId={authId} />
    </div>
  );
}

// AuthorDisplay.propTypes = {
//   authId: propTypes.string.isRequired,
// };

export default AuthorDisplay;
