/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Card, CardActions, CardContent, Button, Grid, Avatar,
} from '@mui/material';
import './WordTerm.css';

export default function WordTerm({
  word, def, links, wordBreakdown,
}) {
  const [showMore, setShowMore] = useState(false);
  const linksArray = links.split('\n');
  if (linksArray.length !== 0) { linksArray.pop(); }
  return (
    <Card sx={{
      borderRadius: 8, margin: 4, boxShadow: 5, marginRight: 20, marginLeft: 20,
    }}
    >
      <CardContent>
        <span className="Img">
          <Avatar sx={{ height: '88px', width: '106px' }} alt="Dictionary Image" src="https://s3-alpha-sig.figma.com/img/5c11/914c/7b5e6390a3acbfe6997d4d7844dc27d5?Expires=1650240000&Signature=MBK60MWYKwVBakBNPjnxqsie7AXk67onKNxsLoNdK~HmRfhVMSgjHtigzVpVsKrSrSsdT~uALB4UiYOcSfsjDtXMLc2ROyalufnMaIYfL1GnX82iccS3Kej3CUBbpdD4sYtgxdljpwOaRZBVE-pJko4~r06Bpg9LgKAi15dSapcdvpsF519ry0bnlHc23jOvT8xPLApeCRBEDDXQC2vH3npr4zajhXgXycC0oRh~3Lvq4fsuDFY9YI8CTtF8cJIPToHdl46yNBb3OYloNKHao-6oXatJDUtE9j3SWUzKmUhQ9e8C-ZeKGbllcchGZcuk8jrqPwb7xO8wKGZUZcJNMw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
          <span className="Term">
            {word}
          </span>
          <span className="WordBreakdown">
            [
            {wordBreakdown}
            ]
          </span>
        </span>
        <span className="Body">
          {def.length < 250 ? def
            : (
              <div className="Body">
                {showMore ? def : `${def.substring(0, 250)}`}
                <Button onClick={() => setShowMore(!showMore)}>
                  {showMore ? 'See less' : 'See more'}
                </Button>
              </div>
            )}
        </span>
      </CardContent>
      <span src={{ padding: 10 }}>
        { linksArray.length !== 0 ? (
          <div className="MoreResources">
            More Resources:
          </div>
        ) : ''}
      </span>
      <span style={{ padding: 20 }}>
        <CardActions style={{ justifyContent: 'left', marginLeft: 75 }}>
          <Grid
            style={{ padding: 10 }}
            sx={{
              display: 'grid', gridTemplateColumns: 'repeat(3, auto)', rowGap: 2, columnGap: 2,
            }}
          >
            {linksArray.filter((v) => Object.keys(v).length).map((url) => (
              <Button
                className="Links"
                style={{ backgroundColor: '#eefbfb', color: '#607AAD' }}
                variant="contained"
                href={url}
                sx={{ borderRadius: 7 }}
              >
                {url}
              </Button>
            ))}
          </Grid>
        </CardActions>
      </span>
    </Card>
  );
}

WordTerm.propTypes = {
  word: PropTypes.string.isRequired,
  def: PropTypes.string.isRequired,
  links: PropTypes.string.isRequired,
  wordBreakdown: PropTypes.string.isRequired,
};
