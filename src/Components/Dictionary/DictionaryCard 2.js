/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Card, CardActions, CardContent, Button, Grid, Avatar,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import './DictionaryCard.css';

export default function DictionaryCard({
  word, def, links, phoeneticSpelling,
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
        <div className="img">
          <Avatar sx={{ height: '88px', width: '106px' }} alt="Dictionary Image" src="https://s3-alpha-sig.figma.com/img/cdf3/8f12/dd7dc80a699c7b042305b07487abb14a?Expires=1651449600&Signature=G5zsVsD1S2f55Nby1uu~w87yOv71xEx9cVIEgw3Xvn5ekN~9j~FHizLWiY1~NP9ojNWN7nnaqAscFx8~6Y1Km8aZdtnfnUVKfZDgrVY~yzteGQ8XBgqEVs4N-LTx8YJzuzKjPH2Dv0BgQD-axt40s3-JKScphqgm-6v7YFhl1bqsvWUtdgDtvwitalLNqG-e9tqLzTxm57swJqJA6rxmcVRJhe4B-s7~ib0WUcZd~ztQDs2Pl4cN2tI4J-lS~VZON3q-aEGmudube7W9Ox6oCIC1oOikLy1R4cmWhv-o7ZWJ-10vLTONAvaBN5Sg07sygqekuoz~GmU-GxCk1ThKBw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
          <div className="term">
            {word}
          </div>
          <div className="phonetic-spelling">
            [
            {phoeneticSpelling}
            ]
          </div>
        </div>
        <div className="body">
          {def.length < 250 ? def
            : (
              <div>
                {showMore ? def : `${def.substring(0, 250)}`}
                <Button style={{ textTransform: 'none', color: '#607AAD' }} onClick={() => setShowMore(!showMore)}>
                  {showMore ? 'See less' : 'See more'}
                </Button>
              </div>
            )}
        </div>
      </CardContent>
      <div style={{ padding: 10 }}>
        <CardActions style={{ justifyContent: 'left', marginLeft: 75 }}>
          <div>
            { linksArray.length !== 0 ? (
              <Grid
                style={{ paddingLeft: 15 }}
                sx={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, auto)', rowGap: 2, columnGap: 2,
                }}
              >
                <div className="more-resources">
                  More Resources:
                </div>
                <div>
                  {linksArray.filter((v) => Object.keys(v).length).map((url) => (
                    <Button
                      key={uuidv4()}
                      style={{ textTransform: 'none', color: '#607AAD', fontSize: '15px' }}
                      href={url}
                    >
                      {url}
                    </Button>
                  ))}
                </div>
              </Grid>
            ) : ''}
          </div>
        </CardActions>
      </div>
    </Card>
  );
}

DictionaryCard.propTypes = {
  word: PropTypes.string.isRequired,
  def: PropTypes.string.isRequired,
  links: PropTypes.string.isRequired,
  phoeneticSpelling: PropTypes.string.isRequired,
};
