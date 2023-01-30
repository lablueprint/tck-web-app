import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@mui/material';
import CreatorInfoCard from '../Components/CreatorPage/CreatorInfoCard';
import CreatedWorksCard from '../Components/CreatorPage/CreatedWorksCard';
import Loading from '../Components/Loading/Loading';
import base from '../Airtable';

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
        <Loading />
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
