/* eslint-disable */ 
import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Card, CardContent, Typography, Link as LinkUI, Chip, Button
} from '@mui/material';
import { CallMade as Away } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/Images/TCK PNG Logo.png';
import './BookSynopsis.css';

const styles = {
  description: {
    maxWidth: '30vw', textAlign: 'left', display: 'flex', marginRight: '6vw', boxShadow: 'none',
  },
  sideCard: {
    borderRadius: '1.31em',
    marginBottom: '4vh',
    backgroundColor: '#FDFDFD',
    boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.05)",
    border: '0.5px solid #D0D0D0',
  },
  chip: {
    margin: "0.2vw",
    fontSize: "1em",
  },
  bolded: {
    textAlign: "left",
    fontFamily: "Work Sans",
    fontSize: "1.12em",
    fontWeight: "600",
    lineHeight: "0",
  },
  blockContainer: {
    margin: "1vh auto",
    border: "1vh 1vw 1vh 1vh",
    display: "flex",
    flexDirection: "row",
    marginTop: "4vh",
  },
  block: {
    fontFamily: "DM Sans",
    width: "45%",
    textAlign: "left",
    flex: "none",
    order: "1",
    flexGrow: "0",

  },
  sub: {
    lineHeight: "1.5em",
    color: "#656565"
  },
  bookshop: {
    fontFamily: "Work Sans",
    fontWeight: "600",
    color: "#3477DE",
    background: "rgba(52, 119, 222, 0.06)"

  }

};

function BookSynopsis({
  title, authorName, authorID, illustratorName, illustratorID, desc, imageURL,
  bookshopURL, readAloudURL, identityTags, ageMin, ageMax, gradeMin, gradeMax
}) {
  
  const identityTag = ['disability', 'lesbian', 'african', 'american', 'asian', 'heritage month']
  const identityChips = identityTag.map((tag) => (
    <Chip
      label={tag}
      sx={styles.chip}
      color="primary"
      key={tag.id}
      id={tag.id}
    />
  ));

  // Determine which 
  /*
    Airtable data for grade range is not dev-friendly.
    if gradeMin and gradeMax are undefined, we don't render at all.
    This does not handle Airtable user errors such as 
      gradeMin: 9th, gradeMax: Kindergarten
    where the order of grades are incorrect
  */
  let gradeRange;
  if (!gradeMin) {
    // gradeMin not given
    gradeRange = gradeMax;
  } 
  else if (!gradeMax) {
    // gradeMax not given
    gradeRange = gradeMin;
  }
  else if (gradeMin === "0 to Pre-K" && gradeMax.length < 5 ) {
    // 0 to Pre-K to short grade
    gradeRange = `0 to ${gradeMax}`;
  } else if (gradeMin === "0 to Pre-K" && gradeMax === "Kindergarten") {
    // 0 to Pre-K to Kindergarten
    gradeRange = "0 to K"
  } 
  else if (gradeMin === gradeMax) {
    // gradeMin same as gradeMax
    gradeRange = gradeMin;
  }
  else {
    // Short grade range e.g. 3rd to 6th
    gradeRange = `${gradeMin} to ${gradeMax}`;
    console.log("fuck")
  }



  return (
    <div className="synopsis">
      <div className="top-down-container">
        <img
          src={imageURL}
          alt={`Book cover for ${title}`}
          className="book-cover"
          />
          <div className="tag-container">
            {identityChips}
          </div>
      </div>

      <Card sx={styles.description}>
        <CardContent>
          <Typography>
            <p className="book-title">{title}</p>
          </Typography>

          <Typography variant="body2">
            <p className="text">
              {desc}
            </p>
          </Typography>
        </CardContent>
      </Card>
      <div className="side-cards">
        <Card sx={styles.sideCard}>
          <CardContent>
            <Typography>
              <div className="side-card-container">
                <p className="side-card-title">About this book</p>
                <div className="side-card-links">
                  <p className="creator"> Written by: </p>
                  {' '}
                  <Link className="link" style={{ color: 'royalblue' }} to={`/creator/${authorID}`}>
                    {authorName}
                  </Link>
                  <br />
                  <p className="creator"> Illustrated by: </p>
                  {' '}
                  <Link className="link" style={{ color: 'royalblue' }} to={`/creator/${illustratorID}`}>
                    {illustratorName}
                  </Link>
                </div>
                <div style={styles.blockContainer}>
                  {
                    (ageMin !== -1 && ageMax !== -1) ? (
                      <div style={styles.block}>
                        <Typography sx={styles.bolded}>{ageMin}-{ageMax}</Typography>
                        <p style={styles.sub}>Age Range</p>
                      </div>
                    ) : <div/>
                  }
                  {
                    (gradeMin || gradeMax) ? (
                      <div style={styles.block}>
                        <Typography sx={styles.bolded}>{gradeRange} </Typography>
                        <p style={styles.sub}>Grade level</p>
                      </div>
                    ) : <div/>
                  }
                </div>
                <Button 
                  sx={styles.bookshop}
                  endIcon={<Away/>}
                  size="large"
                >Buy from Bookshop.org</Button>
              </div>
            </Typography>
          </CardContent>
        </Card>
        <Card sx={styles.sideCard}>
          <CardContent>
            <Typography>
              <div className="side-card-container">
                <p className="side-card-title">Additional resources</p>
                <div className="side-card-links">
                  { (readAloudURL) ? (
                    <div>
                      <LinkUI sx={{ textDecoration: 'none', color: '#3477DE' }} href={readAloudURL} rel="noreferrer" target="_blank">
                        Story Read Aloud
                      </LinkUI>
                    </div>
                    ) :<div/>
                  }
                  { (bookshopURL)
                    ? (
                      <div>
                        <LinkUI sx={{ textDecoration: 'none', color: '#3477DE' }} href={bookshopURL} rel="noreferrer" target="_blank">
                          Bookshop Link
                        </LinkUI>
                      </div>
                    ) : <div />}
                </div>
              </div>
            </Typography>
          </CardContent>
        </Card>
      </div>

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

/** TO-DO:
 *  1. Make rainbow chips 
 *  2. Educator URL
 *  3. Video
 *  4. Add collections and Books Like This
 *  5. STRETCH: see more
 */
