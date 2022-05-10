import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import CreatorInfoCard from '../Components/creatorPage/CreatorInfoCard';
import CreatedWorksCard from '../Components/creatorPage/OtherWorks';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  loadingBox: {
    width: '40%',
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
  const [creatorDetails, setCreatorDetails] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const authId = params.id;

  const getCreatorDetails = () => {
    base('Creator').find(
      authId,
      (err, record) => {
        setCreatorDetails(record);
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    getCreatorDetails();
  }, []);

  return (
    <div style={styles.root}>
      {loading && (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      )}
      {creatorDetails !== undefined && !loading && (
        <CreatorInfoCard
          creatorName={creatorDetails.fields.name ? creatorDetails.fields.name : 'Anonymous'}
          creatorBio={creatorDetails.fields.bio ? creatorDetails.fields.bio : ''}
          creatorWebsite={creatorDetails.fields.personal_site ? creatorDetails.fields.personal_site : ''}
          creatorImage={creatorDetails.fields.image ? creatorDetails.fields.image[0].url : ''}
        />
      )}
      {creatorDetails === undefined && !loading && (
        <p>No such author found!</p>
      )}
      <CreatedWorksCard authorId={authId} />
    </div>
  );
}

export default CreatorPage;
