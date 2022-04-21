import React from 'react';
import {
  Button, Avatar, Box, Card,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default function QuizGroup() {
  return (
    <Card sx={{
      borderRadius: 5, boxShadow: 5, margin: 10,
    }}
    >
      <div>
        <h2>
          Are you a parent, educator, or kid?
        </h2>
        <Box>
          <Button sx={{ m: 7 }} component={Link} to="/quiz/questions/adult" size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src="https://s3-alpha-sig.figma.com/img/d9f4/7470/d691947a53a8eddaa6a09fd66be195b8?Expires=1651449600&Signature=SM1G1Hy2cLBBvVyP9wGtsJZB4oQeHAmUbP9XKSZtbepagoz7W1sPE6v~JTFqm2t4SI34zbxc~gQSFl3-RasyO9qeAvkj6FvDp9kc5s3LkOakQCxnCtRxSKOnX6Ty1TlKWInmQ7gLju7BbcsM-ckNnz5wchlWoNe0DgtZinmec1s8ZHDYsObZtYf2PItzd3XTxFItpxwrTeAm1pWMdckjgD4EH-NN19JC-rGUSFojQVbISYEKetnBr5xPAHFPM21MtQgx8tj-AXHpWSnKyag8rkVNAX-0fD-QvZREsIOi3Xe7gvND-FC8ELeAVzLovxrx7Mz8TX4m2P62SpOztA3DaA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" style={{ borderRadius: 0 }} />}>
            Parent
          </Button>
          <Button sx={{ m: 7 }} component={Link} to="/quiz/questions/adult" size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src="https://s3-alpha-sig.figma.com/img/ff4b/3d97/aeba26c0e7785d58d0912eb329b1bef3?Expires=1651449600&Signature=QqpMsdEPwetA8OoJ~IfQVdWd8JA-q4tgVw7BM3WXFRHp68wE6SAEWMbieVGi5Ke94iTCX0tqnwN3TO4HCsXsxhj1UFF3qQjh3pP-NUDAP3F~rRD8r2Xvt0~5q3zSferJ06ifMLI~7XEJT~I8cuunDrEQp5Sy3xMM8Boh8ns1nHMcfbXM67CoWbURCAzd9gMZO~wTVNW-8L1kRsJDkflePOTlM7sRVADJMSwzsjvP547dUsijnm61~OWkr8UTTe2E6rjGX~GStNw1dY690aPrv3P~P39dU0erNsfOkgz9YESHzIOR9O2oAvPeeF7tUm8HdVjlMmx9JTRyGFBmxeGE1w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" style={{ borderRadius: 0 }} />}>
            Educator
          </Button>
          <Button sx={{ m: 7 }} component={Link} to="/quiz/questions/kid" size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src="https://s3-alpha-sig.figma.com/img/d7b4/3233/1a24db2832ed72a9dd957ad6c77a2beb?Expires=1651449600&Signature=Ze36PS~pV62wr-lLl7dj72U4ZqAFJL-maJl7mir5qg-nFXMkdrscky-FPOR-FxRPo9aQGVcO2DrMFEBb9JLiS8eU022hAURjMrBLpPLh77FDJJv4ew8dx4FxvwQHw2Y1OY9PAOwj1cUBJM0R~1kPtwoGISmo21pdh0qZEPgJEmcHpfotrLjygkQid4xCPC4ZYSQxYslj0pwfD3~dCebAhajG4ppv9w3-g4DjDgQd1kBPn7n398ttUca70PzMueg3Pl6jyY8oXBEtyW2aKoweKfReHEdTS4D4Wbg~Ye79OR-wzY5ySSyKnsy6s9lrrW6XyogoEzybHzZ1lVp~fHOpig__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" style={{ borderRadius: 0 }} />}>
            Kid
          </Button>
        </Box>
      </div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <BorderLinearProgress variant="determinate" value={50} />
        </Box>
      </div>
    </Card>
  );
}
