import React, { /* useReducer */ } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

// function reducer(state, action) {
//   // let newState;
//   switch (action.type) {
//     case 'parent':
//       // return { ...state, isRunning: true };
//       return (
//         <Button />
//       );
//       // break;
//     case 'child':
//       return { ...state, isRunning: false };
//       // break;
//     case 'educator':
//       return { isRunning: false, time: 0 };
//       // break;
//     default:
//       throw new Error();
//   }
// }
export default function QuizDisplay({ headerTitle }) {
  // eslint-disable-next-line
  //const [state, dispatch] = useReducer(reducer, initialState);
  // const action = {
  //   type: 'ActionType',
  // };
  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        <h1>
          Are you a parent, educator or kid?
          {headerTitle}
        </h1>
        <Button variant="outlined"/* onClick={() => dispatch({ type: 'parent' })} */>Parent</Button>
        <Button variant="outlined"/* onClick={() => dispatch({ type: 'educator' })} */>Educator</Button>
        <Button variant="outlined"/* onClick={() => dispatch({ type: 'kid' })} */>Kid</Button>
      </Box>
      <Button variant="text">Back</Button>
      <Button variant="text">Next</Button>
    </Container>
  );
}
QuizDisplay.propTypes = {
  headerTitle: PropTypes.string.isRequired,
};
