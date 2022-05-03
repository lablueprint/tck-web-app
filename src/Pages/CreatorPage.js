import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthorInfoCard from '../Components/creatorPage/AuthorInfoCard';
import CreatedWorksCard from '../Components/creatorPage/OtherWorks';
import '../styles/fonts.css';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
  },
};

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
    <div style={styles.root}>
      {AuthorDetails !== undefined ? (
        <AuthorInfoCard
          authorName={AuthorDetails.fields.name}
          authorBio={AuthorDetails.fields.bio}
          authorWebsite={AuthorDetails.fields.personal_site}
          authorImage={AuthorDetails.fields.image[0].thumbnails.large.url}
        />
      ) : (
        <p>No such author found!</p>
      )}
      <CreatedWorksCard authorId={authId} />
    </div>
  );
}

export default CreatorPage;
