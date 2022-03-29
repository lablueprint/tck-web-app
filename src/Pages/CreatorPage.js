import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import propTypes from 'prop-types';
import AuthorInfo from '../Components/CreatorPage/AuthorInfo';
import CreatedWorksCard from '../Components/CreatorPage/OtherWorks';

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
    <div>
      { AuthorDetails !== undefined
        ? (
          <AuthorInfo
            author={AuthorDetails.fields.name}
            bio={AuthorDetails.fields.bio}
            links={AuthorDetails.fields.personal_site}
            authorPic={AuthorDetails.fields.image[0].thumbnails.large.url}
          />
        ) : <p>No such author found!</p> }
      <CreatedWorksCard authorId={authId} />
    </div>
  );
}

// CreatorPahe.propTypes = {
//   authId: propTypes.string.isRequired,
// };

export default CreatorPage;
