/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import propTypes from 'prop-types';
import AuthorInfo from '../Components/creatorPage/AuthorInfo';
import CreatedWorksCard from '../Components/creatorPage/OtherWorks';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function CreatorPage() {
  const [posts, setPosts] = useState();
  const params = useParams();
  const authId = params.id;

  const getPosts = () => {
    base('Creator').find(
      authId,
      (err, record) => {
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

// CreatorPahe.propTypes = {
//   authId: propTypes.string.isRequired,
// };

export default CreatorPage;
