import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Box, CircularProgress } from '@mui/material';
import CreatorInfoCard from '../Components/CreatorPage/CreatorInfoCard';
import CreatedWorksCard from '../Components/CreatorPage/CreatedWorksCard';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    '@media (max-width: 960px)': {
      flexDirection: 'column',
    },
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
  const [creatorRole, setCreatorRole] = useState();
  const params = useParams();
  const creatorId = params.id;

  const getCreatorDetails = () => {
    base('Creator').find(
      creatorId,
      (err, record) => {
        console.error(err);
        setCreatorDetails(record);
        if (record.fields.authored !== undefined) {
          if (record.fields.illustrated !== undefined) {
            setCreatorRole('Author, Illustrator');
          }
          setCreatorRole('Author');
        } else if (record.fields.illustrated !== undefined) {
          setCreatorRole('Illustrator');
        }
        setLoading(false);
      },
    );
  };

  useEffect(() => {
    getCreatorDetails();
  }, [creatorId]);

  return (
    <Card sx={styles.root}>
      {loading && (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      )}
      {creatorDetails !== undefined && !loading && (
        <>
          <CreatorInfoCard
            creatorName={creatorDetails.fields.name ? creatorDetails.fields.name : 'Anonymous'}
            creatorBio={creatorDetails.fields.bio ? creatorDetails.fields.bio : ''}
            creatorWebsite={creatorDetails.fields.personal_site ? creatorDetails.fields.personal_site : ''}
            creatorImage={creatorDetails.fields.image ? creatorDetails.fields.image[0].url : ''}
            creatorRole={creatorRole}
          />
          <CreatedWorksCard
            authoredBookIds={creatorDetails.fields.authored}
            illustratedBookIds={creatorDetails.fields.illustrated}
          />
        </>
      )}
      {creatorDetails === undefined && !loading && (
        <p>No such author found!</p>
      )}
    </Card>
  );
}

export default CreatorPage;
