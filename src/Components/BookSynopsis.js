import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Card, CardMedia, CardContent, Typography,
} from '@mui/material';
import Logo from '../Assets/Images/TCK PNG Logo.png';

function BookSynopsis({
  title, authorName, illustratorName, desc, imageURL,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <CardMedia
        component="img"
        image={imageURL}
        height="140"
        alt="book img desc"
      />
      <Card sx={{ minWidth: '50vw', textAlign: 'left', display: 'flex' }}>
        <CardContent>
          <Typography gutterBottom variant="h3" sx={{ marginBottom: '0' }}>
            {title}
          </Typography>
          <Typography variant="h5">
            {authorName}
            {' '}
            |
            {' '}
            {illustratorName}
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
  illustratorName: PropTypes.string,
  desc: PropTypes.string,
  imageURL: PropTypes.string,
};

BookSynopsis.defaultProps = {
  title: 'Untitled Book',
  authorName: 'Unknown Author',
  illustratorName: 'Unknown Illustrator',
  desc: 'It\'s a book. with words. **gasp**',
  imageURL: Logo,

};
