/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import AuthorInfoCard from '../Components/creatorPage/AuthorInfoCard'
import { useParams } from 'react-router-dom';
import AuthorInfo from '../Components/creatorPage/AuthorInfo';
import CreatedWorksCard from '../Components/creatorPage/OtherWorks';
import '../styles/fonts.css'

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

function CreatorPage() {
  const [AuthorDetails, setAuthorDetails] = useState();
  const params = useParams();
  const authId = params.id;

  const getPosts = () => {
    base('Creator').find(
      authId,
      (err, record) => {
        setAuthorDetails(record);
      },
    );
  };

  useEffect(getPosts, []);

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {AuthorDetails !== undefined ? (
       <>
        <AuthorInfoCard
        authorName={AuthorDetails.fields.name}
          authorBio={AuthorDetails.fields.bio}
          authorWebsite={AuthorDetails.fields.personal_site}
          authorImage={AuthorDetails.fields.image[0].thumbnails.large.url}
          />
          </>
      ) : (
        <p>No such author found!</p>
      )}
      <CreatedWorksCard authorId={authId} />
    </div>
  );
}

export default CreatorPage;
