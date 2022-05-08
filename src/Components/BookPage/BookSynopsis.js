import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Card, Paper, CardContent, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/Images/TCK PNG Logo.png';

function BookSynopsis({
  title, authorName, authorID, illustratorName, illustratorID, desc, imageURL,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Paper variant="outlined">
        <img src={imageURL} alt="" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
      </Paper>
      <Card sx={{ minWidth: '50vw', textAlign: 'left', display: 'flex' }}>
        <CardContent>
          <Typography gutterBottom variant="h3" sx={{ marginBottom: '0' }}>
            {title}
          </Typography>
          <Typography variant="h5">
            <Link className="link" to={`/creator/${authorID}`}>
              {authorName}
            </Link>
            {' '}
            |
            {' '}
            <Link className="link" to={`/creator/${illustratorID}`}>
              {illustratorName}
            </Link>
            {' '}
            (illustrator)
          </Typography>
          <Typography variant="body2">
            {desc}
          </Typography>
        </CardContent>
      </Card>

    </div>
  );
}

export default BookSynopsis;

BookSynopsis.propTypes = {
  title: PropTypes.string,
  authorName: PropTypes.string,
  authorID: PropTypes.string,
  illustratorName: PropTypes.string,
  illustratorID: PropTypes.string,
  desc: PropTypes.string,
  imageURL: PropTypes.string,
};

BookSynopsis.defaultProps = {
  title: 'Untitled Book',
  authorName: 'Unknown Author',
  authorID: '',
  illustratorName: 'Unknown Illustrator',
  illustratorID: '',
  desc: 'It\'s a book. with words. **gasp**',
  imageURL: Logo,
};
