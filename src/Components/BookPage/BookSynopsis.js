import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Card, CardContent, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/Images/TCK PNG Logo.png';
import './BookSynopsis.css';

function BookSynopsis({
  title, authorName, authorID, illustratorName, illustratorID, desc, imageURL,
}) {
  return (
    <div className="synopsis">
      <img
        src={imageURL}
        alt={`Book cover for ${title}`}
        className="book-cover"
      />

      <Card sx={{
        minWidth: '50vw', textAlign: 'left', display: 'flex', marginRight: '6vw',
      }}
      >
        <CardContent sx={{ margin: '0 90px 0 90px' }}>
          <p className="title">{title}</p>
          <Typography variant="h5">
            <div className="creators">
              <Link className="link" to={`/creator/${authorID}`}>
                <p className="creators">
                  {authorName}
                </p>
              </Link>
              {' '}
              |
              {' '}
              <Link className="link" to={`/creator/${illustratorID}`}>
                <p className="creators">
                  {illustratorName}
                </p>
              </Link>
              {' '}
              (illustrator)
            </div>
          </Typography>
          <Typography variant="body2">
            <p className="text">
              {desc}
            </p>
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

/** SANDBOX

 <Paper
        variant="outlined"
        sx={{ marginLeft: '10vw', width: '510px' }}
      >
        <img
          src={imageURL}
          alt=""
          style={{
            height: '100%', width: '100%',
          }}
        />
      </Paper>

   <Typography gutterBottom className="title" sx={{ fontSize: '3em', fontWeight: '700' }}>
            {title}
          </Typography>
 */
