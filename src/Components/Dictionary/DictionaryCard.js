import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardActions, CardContent, Button, Grid, Avatar, Typography, Box,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import './DictionaryCard.css';
import LetterA from '../../Assets/Dictionary/LetterA.svg';
import LetterB from '../../Assets/Dictionary/LetterB.svg';
import LetterC from '../../Assets/Dictionary/LetterC.svg';
import LetterD from '../../Assets/Dictionary/LetterD.svg';
import LetterE from '../../Assets/Dictionary/LetterE.svg';
import LetterF from '../../Assets/Dictionary/LetterF.svg';
import LetterG from '../../Assets/Dictionary/LetterG.svg';
import LetterH from '../../Assets/Dictionary/LetterH.svg';
import LetterI from '../../Assets/Dictionary/LetterI.svg';
import LetterJ from '../../Assets/Dictionary/LetterJ.svg';
import LetterK from '../../Assets/Dictionary/LetterK.svg';
import LetterL from '../../Assets/Dictionary/LetterL.svg';
import LetterM from '../../Assets/Dictionary/LetterM.svg';
import LetterN from '../../Assets/Dictionary/LetterN.svg';
import LetterO from '../../Assets/Dictionary/LetterO.svg';
import LetterP from '../../Assets/Dictionary/LetterP.svg';
import LetterQ from '../../Assets/Dictionary/LetterQ.svg';
import LetterR from '../../Assets/Dictionary/LetterR.svg';
import LetterS from '../../Assets/Dictionary/LetterS.svg';
import LetterT from '../../Assets/Dictionary/LetterT.svg';
import LetterU from '../../Assets/Dictionary/LetterU.svg';
import LetterV from '../../Assets/Dictionary/LetterV.svg';
import LetterW from '../../Assets/Dictionary/LetterW.svg';
import LetterX from '../../Assets/Dictionary/LetterX.svg';
import LetterY from '../../Assets/Dictionary/LetterY.svg';
import LetterZ from '../../Assets/Dictionary/LetterZ.svg';

const styles = {
  seeMoreContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  seeMoreText: {
    fontFamily: 'DM Sans',
    fontWeight: 700,
    fontSize: '0.875em',
    color: '#0068C9',
    paddingTop: 2,
    '&:hover': {
      color: '#669afa',
      cursor: 'pointer',
    },
  },
  seeMoreIcon: {
    fontSize: '1em',
    color: '#0068C9',
    paddingTop: 2,
    '&:hover': {
      color: '#669afa',
      cursor: 'pointer',
    },
  },
};

export default function DictionaryCard({
  word, def, links, phoeneticSpelling,
}) {
  const [showMore, setShowMore] = useState(false);

  /* Split links */
  const linksArray = links.split('\n');
  if (linksArray.length !== 0) { linksArray.pop(); }

  /* Map each letter to image */
  const mapping = {
    A: LetterA,
    B: LetterB,
    C: LetterC,
    D: LetterD,
    E: LetterE,
    F: LetterF,
    G: LetterG,
    H: LetterH,
    I: LetterI,
    J: LetterJ,
    K: LetterK,
    L: LetterL,
    M: LetterM,
    N: LetterN,
    O: LetterO,
    P: LetterP,
    Q: LetterQ,
    R: LetterR,
    S: LetterS,
    T: LetterT,
    U: LetterU,
    V: LetterV,
    W: LetterW,
    X: LetterX,
    Y: LetterY,
    Z: LetterZ,
  };

  /* Get first letter and make upper case  */
  const firstLet = (str) => (JSON.stringify(str).substring(9, 10));
  const displayLet = firstLet({ word }).toUpperCase();

  return (
    <Card sx={{
      borderRadius: 8,
      boxShadow: 2,
      marginTop: 4,
    }}
    >
      <CardContent>
        <div className="img">
          <Avatar
            sx={{
              height: '110px',
              width: '110px',
              '@media screen and (max-width: 960px)': {
                height: '75px',
                width: '75px',
              },
            }}
            alt="Dictionary Image"
            src={mapping[displayLet]}
          />
          <div className="wrap-term-and-phonetic-spelling">
            <div className="term">
              {word}
            </div>
            <div className="phonetic-spelling">
              [
              {phoeneticSpelling}
              ]
            </div>
          </div>
        </div>
        <div className="body">
          {def.length < 250 ? def
            : (
              <div>
                {showMore ? def : `${def.substring(0, 250)}...`}
                <Box sx={styles.seeMoreContainer} onClick={() => setShowMore(!showMore)}>
                  <Typography sx={styles.seeMoreText}>
                    {showMore ? 'See Less' : 'See More'}
                  </Typography>
                  { (showMore) ? <KeyboardArrowUp sx={styles.seeMoreIcon} />
                    : <KeyboardArrowDown sx={styles.seeMoreIcon} />}
                </Box>
              </div>
            )}
        </div>
      </CardContent>
      <div className="wrap-more-resources-and-links">
        <CardActions sx={{ justifyContent: 'left', marginLeft: '15%' }}>
          <div>
            { linksArray.length !== 0 ? (
              <Grid
                sx={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, auto)', rowGap: 2, columnGap: 2,
                }}
              >
                <div className="more-resources">
                  Resources:
                </div>
                <div>
                  {linksArray.filter((v) => Object.keys(v).length).map((url) => (
                    <Button
                      className="more-resources-links"
                      key={uuidv4()}
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
