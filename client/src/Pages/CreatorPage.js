import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@mui/material';
import axios from 'axios';
import CreatorInfoCard from '../Components/CreatorPage/CreatorInfoCard';
import CreatedWorksCard from '../Components/CreatorPage/CreatedWorksCard';
import Loading from '../Components/Loading/Loading';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    '@media (max-width: 960px)': {
      flexDirection: 'column',
    },
  },
};

function CreatorPage() {
  const [creatorDetails, setCreatorDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [creatorRole, setCreatorRole] = useState();
  const params = useParams();
  const creatorId = params.id;

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    axios.get(`/api/creator/${creatorId}`, { cancelToken: source.token })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.err('successfully aborted');
        } else console.err(err);
        // add other error handling
      })
      .then((response) => {
        const record = response.data;
        setCreatorDetails(record);
        if (record.fields.authored) {
          if (record.fields.illustrated !== undefined) {
            setCreatorRole('Author, Illustrator');
          }
          setCreatorRole('Author');
        } else if (record.fields.illustrated !== undefined) {
          setCreatorRole('Illustrator');
        }
        setLoading(false);
      });

    return () => { source.cancel(); };
  }, [creatorId]);

  if (loading) return <Loading />;

  return (
    <Card sx={styles.root}>
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
