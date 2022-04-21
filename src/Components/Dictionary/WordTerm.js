import PropTypes from 'prop-types';
import React from 'react';
import {
  Card, CardActions, CardContent, Button, Typography,
} from '@mui/material';

export default function WordTerm({ word, def, links }) {
  const linksArray = links.split('\n');
  if (linksArray.length !== 0) { linksArray.pop(); }
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          Term
        </Typography>
        <Typography variant="h5" component="div">
          {word}
        </Typography>
        <Typography variant="body1">
          {def}
          <br />
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        {linksArray.filter((v) => Object.keys(v).length).map((url) => (
          <Button
            key={url}
            variant="outlined"
            size="small"
            href={url}
          >
            {url}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
}

WordTerm.propTypes = {
  word: PropTypes.string.isRequired,
  def: PropTypes.string.isRequired,
  links: PropTypes.string.isRequired,
};
