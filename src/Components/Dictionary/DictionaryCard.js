import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardActions, CardContent, Button, Grid, Avatar, Typography, Box,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import './DictionaryCard.css';
import LetterA from '../../Assets/Dictionary/Letter A.png';
import LetterB from '../../Assets/Dictionary/Letter B.png';
import LetterC from '../../Assets/Dictionary/Letter C.png';
import LetterD from '../../Assets/Dictionary/Letter D.png';
import LetterE from '../../Assets/Dictionary/Letter E.png';
import LetterF from '../../Assets/Dictionary/Letter F.png';
import LetterG from '../../Assets/Dictionary/Letter G.png';
import LetterH from '../../Assets/Dictionary/Letter H.png';
import LetterI from '../../Assets/Dictionary/Letter I.png';
import LetterJ from '../../Assets/Dictionary/Letter J.png';
import LetterK from '../../Assets/Dictionary/Letter K.png';
import LetterL from '../../Assets/Dictionary/Letter L.png';
import LetterM from '../../Assets/Dictionary/Letter M.png';
import LetterN from '../../Assets/Dictionary/Letter N.png';
import LetterO from '../../Assets/Dictionary/Letter O.png';
import LetterP from '../../Assets/Dictionary/Letter P.png';
import LetterQ from '../../Assets/Dictionary/Letter Q.png';
import LetterR from '../../Assets/Dictionary/Letter R.png';
import LetterS from '../../Assets/Dictionary/Letter S.png';
import LetterT from '../../Assets/Dictionary/Letter T.png';
import LetterU from '../../Assets/Dictionary/Letter U.png';
import LetterV from '../../Assets/Dictionary/Letter V.png';
import LetterW from '../../Assets/Dictionary/Letter W.png';
import LetterX from '../../Assets/Dictionary/Letter X.png';
import LetterY from '../../Assets/Dictionary/Letter Y.png';
import LetterZ from '../../Assets/Dictionary/Letter Z.png';

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
  avatar: {
    height: '110px',
    width: '110px',
    '@media screen and (max-width: 960px)': {
      height: '75px',
      width: '75px',
    },
  },
  cardActions: {
    justifyContent: 'left',
    marginLeft: '15%',
  },
  resourceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, auto)',
    rowGap: 2,
    columnGap: 2,
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
            sx={styles.avatar}
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
        <CardActions sx={styles.cardActions}>
          <div>
            { linksArray.length !== 0 ? (
              <Grid
                sx={styles.resourceGrid}
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
