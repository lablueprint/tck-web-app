import React, { useReducer } from 'react';
import './QuizGroup.css';
import {
  Button, Avatar, Box, Card,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Quiz2Adult from './Quiz2Adult';
import Quiz3 from './Quiz3';
import Quiz4Kid from './Quiz4Kid';
import Quiz5 from './Quiz5Kid';
import Quiz8Adult from './Quiz8Adult';
import Quiz2Kid from './Quiz2Kid';
import Quiz6Kid from './Quiz6Kid';
import Quiz7Kid from './Quiz7Kid';
import ProgressAndArrows from './ProgressAndArrows';

function reducer(state, action) {
  switch (action.type) {
    case 'parent':
      return {
        ...state,
        isParent: true,
        count: state.count + 1,
      };
    case 'child':
      return {
        ...state,
        isChild: true,
        count: state.count + 1,
      };
    default:
      throw new Error();
  }
}

export default function Quiz1() {
  const initialState = {
    isParent: false,
    isChild: false,
    count: 1,
  };
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(reducer, initialState);
  // eslint-disable-next-line no-unused-vars
  const {
    // eslint-disable-next-line no-unused-vars
    isParent, isChild, count,
  } = state;

  // const action = {
  //   type: 'ActionType',
  // };

  if (isParent && count === 2) {
    return (
      <div>
        <Quiz2Adult />
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
      </div>

    );
  }
  if (isParent && count === 3) {
    return (
      <div>
        <Quiz3 />
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
        <ProgressAndArrows variant="determinate" value={0} />
        <Button
          startIcon={<ArrowForwardIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
      </div>

    );
  }
  if (isParent && count === 4) {
    return (
      <div>
        <Quiz5 />
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
        <ProgressAndArrows variant="determinate" value={0} />
        <Button
          startIcon={<ArrowForwardIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
      </div>

    );
  }
  if (isParent && count === 5) {
    return (
      <div>
        <Quiz8Adult />
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
        <ProgressAndArrows variant="determinate" value={0} />
        <Button
          startIcon={<ArrowForwardIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
      </div>

    );
  }
  if (isChild && count === 2) {
    return (
      <div>
        <Quiz2Kid />
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
        <Button
          startIcon={<ArrowForwardIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
      </div>

    );
  }
  if (isChild && count === 3) {
    return (
      <div>
        <Quiz3 />
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
        <ProgressAndArrows variant="determinate" value={0} />
        <Button
          startIcon={<ArrowForwardIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
      </div>
    );
  }
  if (isChild && count === 4) {
    return (
      <div>
        <Quiz4Kid />
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
        <ProgressAndArrows variant="determinate" value={0} />
        <Button
          startIcon={<ArrowForwardIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
      </div>

    );
  }
  if (isChild && count === 5) {
    return (
      <div>
        <Quiz5 />
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
        <ProgressAndArrows variant="determinate" value={0} />
        <Button
          startIcon={<ArrowForwardIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
      </div>

    );
  }
  if (isChild && count === 6) {
    return (
      <div>
        <Quiz6Kid />
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
        <ProgressAndArrows variant="determinate" value={0} />
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
      </div>

    );
  }
  if (isChild && count === 7) {
    return (
      <div>
        <Quiz7Kid />
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
        <ProgressAndArrows variant="determinate" value={0} />
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          onClick={() => {
            console.log('clicked');
          }}
        />
      </div>

    );
  }
  return (
    <div>
      <Card sx={{
        borderRadius: 5, boxShadow: 5, margin: 10,
      }}
      >
        <div>
          <h2>
            Are you a parent, educator, or kid?
          </h2>
          <Box>
            <Button class="button" onClick={() => dispatch({ type: 'parent' })} sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src="https://s3-alpha-sig.figma.com/img/d9f4/7470/d691947a53a8eddaa6a09fd66be195b8?Expires=1651449600&Signature=SM1G1Hy2cLBBvVyP9wGtsJZB4oQeHAmUbP9XKSZtbepagoz7W1sPE6v~JTFqm2t4SI34zbxc~gQSFl3-RasyO9qeAvkj6FvDp9kc5s3LkOakQCxnCtRxSKOnX6Ty1TlKWInmQ7gLju7BbcsM-ckNnz5wchlWoNe0DgtZinmec1s8ZHDYsObZtYf2PItzd3XTxFItpxwrTeAm1pWMdckjgD4EH-NN19JC-rGUSFojQVbISYEKetnBr5xPAHFPM21MtQgx8tj-AXHpWSnKyag8rkVNAX-0fD-QvZREsIOi3Xe7gvND-FC8ELeAVzLovxrx7Mz8TX4m2P62SpOztA3DaA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" style={{ borderRadius: 0 }} />}>
              <p>Parent</p>
            </Button>
            <Button class="button" onClick={() => dispatch({ type: 'parent' })} sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src="https://s3-alpha-sig.figma.com/img/ff4b/3d97/aeba26c0e7785d58d0912eb329b1bef3?Expires=1651449600&Signature=QqpMsdEPwetA8OoJ~IfQVdWd8JA-q4tgVw7BM3WXFRHp68wE6SAEWMbieVGi5Ke94iTCX0tqnwN3TO4HCsXsxhj1UFF3qQjh3pP-NUDAP3F~rRD8r2Xvt0~5q3zSferJ06ifMLI~7XEJT~I8cuunDrEQp5Sy3xMM8Boh8ns1nHMcfbXM67CoWbURCAzd9gMZO~wTVNW-8L1kRsJDkflePOTlM7sRVADJMSwzsjvP547dUsijnm61~OWkr8UTTe2E6rjGX~GStNw1dY690aPrv3P~P39dU0erNsfOkgz9YESHzIOR9O2oAvPeeF7tUm8HdVjlMmx9JTRyGFBmxeGE1w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" style={{ borderRadius: 0 }} />}>
              <p>Educator</p>
            </Button>
            <Button class="button" onClick={() => dispatch({ type: 'child' })} sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src="https://s3-alpha-sig.figma.com/img/d7b4/3233/1a24db2832ed72a9dd957ad6c77a2beb?Expires=1651449600&Signature=Ze36PS~pV62wr-lLl7dj72U4ZqAFJL-maJl7mir5qg-nFXMkdrscky-FPOR-FxRPo9aQGVcO2DrMFEBb9JLiS8eU022hAURjMrBLpPLh77FDJJv4ew8dx4FxvwQHw2Y1OY9PAOwj1cUBJM0R~1kPtwoGISmo21pdh0qZEPgJEmcHpfotrLjygkQid4xCPC4ZYSQxYslj0pwfD3~dCebAhajG4ppv9w3-g4DjDgQd1kBPn7n398ttUca70PzMueg3Pl6jyY8oXBEtyW2aKoweKfReHEdTS4D4Wbg~Ye79OR-wzY5ySSyKnsy6s9lrrW6XyogoEzybHzZ1lVp~fHOpig__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" style={{ borderRadius: 0 }} />}>
              <p>Kid</p>
            </Button>
          </Box>
        </div>
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="contained"
              onClick={() => {
                console.log('clicked');
              }}
            />
            <ProgressAndArrows variant="determinate" value={0} />
            <Button
              startIcon={<ArrowForwardIcon />}
              variant="contained"
              onClick={() => {
                console.log('clicked');
              }}
            />
          </Box>
        </div>
      </Card>
      )
    </div>
  );
}
