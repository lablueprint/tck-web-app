import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardActions, CardContent, Button, Grid, Avatar,
} from '@mui/material';
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

export default function DictionaryCard({
  word, def, links, phoeneticSpelling,
}) {
  const [showMore, setShowMore] = useState(false);
  /* Individualize links */
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
      borderRadius: 8, margin: 4, boxShadow: 5, marginRight: 20, marginLeft: 20,
    }}
    >
      <CardContent>
        <div className="img">
          <Avatar sx={{ height: '88px', width: '106px' }} alt="Dictionary Image" src={mapping[displayLet]} />
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
