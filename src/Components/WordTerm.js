import PropTypes from 'prop-types';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function WordTerm({ word, def, links }) {
  const linksArray = links.split('\n');
  linksArray.pop();
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
        {linksArray.map((url) => (
          <Button
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
