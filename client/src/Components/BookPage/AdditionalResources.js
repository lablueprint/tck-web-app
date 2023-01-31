import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Card, CardContent, Typography, Link as LinkUI, Box,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import EducatorLink from './EducatorLink';

const styles = {
  sideCardContainer: {
    margin: 'auto 1vw auto 1vw',
  },
  sideCard: {
    minWidth: '18vw',
    width: 'min-content',
    borderRadius: '1.31em',
    marginBottom: '4vh',
    background: '#FDFDFD',
    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.05)',
    border: '0.5px solid #E8E8E8',
    '@media (max-width: 1440px)': {
      minWidth: '22vw',
    },
    '@media (max-width: 960px)': {
      width: '95%',
      margin: 'auto 2vw',
    },
  },
  sideCardTitle: {
    textAlign: 'left',
    fontFamily: 'Work Sans',
    fontSize: '1.12em',
    fontWeight: '600',
    lineHeight: '1.5em',
    color: '#020202',
    marginTop: '2vh',
  },
  sideCardLinkContainer: {
    textAlign: 'left',
    fontSize: '0.85em',
    margin: '2vh auto 2vh auto',
  },
  linkUI: {
    textDecoration: 'none',
    color: '#3477DE',
    fontWeight: '400',
    lineHeight: '1.8em',
    fontSize: '1.05em',
    fontFamily: 'DM Sans',
  },
};

function AdditionalResources({ readAloudURL, educatorURLs }) {
  const educatorLinks = educatorURLs.map((url, index) => (
    <EducatorLink
      url={url}
      index={index}
      key={uuidv4()}
    />
  ));
  const hydrated = readAloudURL || educatorURLs.length !== 0;
  return hydrated && (
    <Card sx={styles.sideCard}>
      <CardContent>
        <Box sx={styles.sideCardContainer}>
          <Typography sx={styles.sideCardTitle}>Additional Resources</Typography>
          <Box sx={styles.sideCardLinkContainer}>
            { (readAloudURL) && (
            <LinkUI sx={styles.linkUI} href={readAloudURL} rel="noreferrer" target="_blank" aria-label="Go to the story read aloud">
              Story Read Aloud
            </LinkUI>
            ) }
            {educatorLinks}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

AdditionalResources.propTypes = {
  readAloudURL: PropTypes.string,
  educatorURLs: PropTypes.arrayOf(PropTypes.string),
};

AdditionalResources.defaultProps = {
  readAloudURL: '',
  educatorURLs: [],
};

export default AdditionalResources;
