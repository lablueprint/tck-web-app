/* eslint-disable eqeqeq */
import React, { useReducer } from 'react';
import propTypes from 'prop-types';
import './QuizGroup.css';
import {
  Button, Avatar, Box, Card,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink } from 'react-router-dom';
import Quiz2Adult from './Quiz2Adult';
import Quiz3 from './Quiz3';
import Quiz4Kid from './Quiz4Kid';
import Quiz5 from './Quiz5Kid';
import Quiz8Adult from './Quiz8Adult';
import Quiz2Kid from './Quiz2Kid';
import Quiz6 from './Quiz6';
import Quiz7Kid from './Quiz7Kid';
import Quiz6Kid from './Quiz6Kid';
import ProgressAndArrows from './ProgressAndArrows';
import Child from '../../Assets/Images/Child.svg';
import Parent from '../../Assets/Images/Parent.svg';
import Educator from '../../Assets/Images/Educator.svg';

function reducer(state, action) {
  switch (action.type) {
    case 'parent':
      return {
        ...state,
        isParent: true,
        count: state.count + 1,
        goneBack: true,
      };
    case 'child':
      return {
        ...state,
        isChild: true,
        count: state.count + 1,
        goneBack: true,
      };
    case 'child back':
      return {
        ...state,
        isChild: true,
        count: state.count - 1,
      };
    case 'parent back':
      return {
        ...state,
        isChild: true,
        count: state.count - 1,
      };
    default:
      throw new Error();
  }
}

const issDisabled = (anArr) => (anArr.length === 0);

export default function Quiz1({ bookFilters, setBookFilters, setIsChild }) {
  const initialState = {
    isParent: false,
    isChild: false,
    count: 1,
    goneBack: false,
  };

  const sillyLevel = React.useState(0);
  const increment = (value) => {
    sillyLevel[0] = value;
    sillyLevel[1](value);
  };
  const sillyNotSet = () => (!(sillyLevel[0]));
  const illusion = React.useState(0);
  const changeIllusion = (value) => {
    illusion[0] = value;
    illusion[1](value);
  };
  const isIllusionDisabled = () => (!(illusion[0]));
  // const [isDisabled02A, setIsDisabled02A] = useState(true);
  // const [isDisabled02K, setisDisabled02K] = useState(true);

  // const callback02A = (isDisabledFromChild) => {
  //   setIsDisabled02A(isDisabledFromChild);
  // };
  // const callback02K = (isDisabledFromChild) => {
  //   setisDisabled02K(isDisabledFromChild);
  // };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isParent, isChild, count, goneBack,
  } = state;
  if (isParent && count === 2) {
    setIsChild(isChild);
    return (
      <Card sx={{
        borderRadius: 5,
        margin: 4,
        boxShadow: 5,
        marginRight: 15,
        marginLeft: 15,
        paddingBottom: 5,
        paddingTop: 15,
      }}
      >
        <Quiz2Adult
          // parentCallback02A={callback02A}
          bookFilters={bookFilters}
          setBookFilters={setBookFilters}
        />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'parent back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            {' '}
            <ArrowBackIcon />
            {' '}

          </Button>
          <ProgressAndArrows
            progress={17}
            sx={{ flex: '0 1 60%' }}
          />
          <Button
            disabled={false}
            variant="contained"
            onClick={() => dispatch({ type: 'parent' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowForwardIcon />

          </Button>

        </div>
      </Card>

    );
  }
  if (isParent && count === 3) {
    setIsChild(isChild);
    return (
      <div style={{ background: '#FAFAFA', margin: '0', height: '100%' }}>
        <Quiz3 bookFilters={bookFilters} slideCaption="Which races/ethnicities do you want to see represented?" setBookFilters={setBookFilters} />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'parent back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowBackIcon />

          </Button>
          <ProgressAndArrows variant="determinate" progress={29} sx={{ flex: '0 1 60%' }} />
          <Button
            disabled={issDisabled(bookFilters['race/ethnicity'])}
            variant="contained"
            onClick={() => dispatch({ type: 'parent' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowForwardIcon />

          </Button>

        </div>
      </div>

    );
  }
  if (isParent && count === 4) {
    setIsChild(isChild);
    const parentButtonCaptions = ['Autobiography', 'Non-fiction', 'Historical fiction', 'Memoir', 'Mystery'];
    return (
      <div>
        <Quiz6 bookFilters={bookFilters} setBookFilters={setBookFilters} title="Please select any of the following genres that you are interested in." buttonCaptions={parentButtonCaptions} />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'parent back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowBackIcon />

          </Button>
          <ProgressAndArrows variant="determinate" progress={80} sx={{ flex: '0 1 60%' }} />
          <Button
            disabled={issDisabled(bookFilters.genre)}
            variant="contained"
            onClick={() => dispatch({ type: 'parent' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowForwardIcon />

          </Button>
        </div>
      </div>

    );
  }
  if (isParent && count === 5) {
    setIsChild(isChild);
    const parentButtonCaptions = ['Adventure', 'Scary/Horror', 'Science fiction', 'Fantasy', 'Romance', 'Afrofuturism'];
    return (
      <div>
        <Quiz6 bookFilters={bookFilters} setBookFilters={setBookFilters} title="Please select any of the following genres that you are interested in." buttonCaptions={parentButtonCaptions} />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'parent back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowBackIcon />

          </Button>
          <ProgressAndArrows variant="determinate" progress={80} sx={{ flex: '0 1 60%' }} />
          <Button
            disabled={issDisabled(bookFilters.genre)}
            variant="contained"
            onClick={() => dispatch({ type: 'parent' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowForwardIcon />

          </Button>
        </div>
      </div>

    );
  }
  if (isParent && count === 6) {
    setIsChild(isChild);
    return (
      <div>
        <Quiz8Adult bookFilters={bookFilters} setBookFilters={setBookFilters} />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'parent back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowBackIcon />

          </Button>
          <ProgressAndArrows variant="determinate" value={85} sx={{ flex: '0 1 60%' }} />
          <NavLink to="/quiz/results" style={{ textDecoration: 'none' }}>
            <Button
              disabled={issDisabled(bookFilters.book_type)}
              variant="contained"
              onClick={() => dispatch({ type: 'parent' })}
              sx={{
                background: '#F99E16',
                boxShadow: 'none',
                borderRadius: '100px',
                '&.MuiButtonBase-root:hover': {
                  bgcolor: '#F99E16',
                },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Your Results
            </Button>
          </NavLink>
        </div>
      </div>

    );
  }
  if (isChild && count === 2) {
    setIsChild(isChild);
    return (
      <Card sx={{
        borderRadius: 5,
        margin: 4,
        boxShadow: 5,
        marginRight: 15,
        marginLeft: 15,
        paddingBottom: 5,
        paddingTop: 15,
      }}
      >
        <Quiz2Kid
          // parentCallback02K={callback02K}
          bookFilters={bookFilters}
          setBookFilters={setBookFilters}
        />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'child back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowBackIcon />

          </Button>
          <ProgressAndArrows
            progress={17}
            sx={{ flex: '0 1 60%' }}
          />
          <Button
            // disabled={isDisabled02K}
            variant="contained"
            onClick={() => dispatch({ type: 'child' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowForwardIcon />

          </Button>
        </div>
      </Card>

    );
  }
  if (isChild && count === 3) {
    setIsChild(isChild);
    return (
      <div style={{ background: '#FAFAFA', margin: '0', height: '100%' }}>
        <Quiz3 bookFilters={bookFilters} setBookFilters={setBookFilters} slideCaption="Which of these races are you interested in reading about?" />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'child back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowBackIcon />

          </Button>
          <ProgressAndArrows variant="determinate" progress={29} sx={{ flex: '0 1 60%' }} />
          <Button
            disabled={issDisabled(bookFilters['race/ethnicity'])}
            variant="contained"
            onClick={() => dispatch({ type: 'child' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowForwardIcon />

          </Button>
        </div>
      </div>
    );
  }
  if (isChild && count === 4) {
    setIsChild(isChild);
    return (
      <div>
        <Quiz4Kid
          setSilly={increment}
        />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'child back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowBackIcon />

          </Button>
          <ProgressAndArrows variant="determinate" progress={41} sx={{ flex: '0 1 60%' }} />
          <Button
            disabled={sillyNotSet()}
            variant="contained"
            onClick={() => dispatch({ type: 'child' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowForwardIcon />

          </Button>
        </div>
      </div>

    );
  }
  if (isChild && count === 5 && sillyLevel[0] == 3) {
    const childButtonCaptions = ['The lives of interesting and influential people',
      'Fascinating facts about different topics such as nature, animals, or space',
      'Important events of the past that shaped the world we live in today',
      'A detailed retelling of a crucial period of time in an individual’s life',
      'The case of a mysterious, unnatural phenomenon', 'Stories with poetry'];
    setIsChild(isChild);
    return (
      <div>
        <Quiz6Kid bookFilters={bookFilters} setBookFilters={setBookFilters} title="Which of the following would you be interested in reading about? " buttonCaptions={childButtonCaptions} />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'child back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowBackIcon />

          </Button>
          <ProgressAndArrows variant="determinate" value={85} />
          <Button
            disabled={issDisabled(bookFilters.genre)}
            variant="contained"
            onClick={() => dispatch({ type: 'child' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowForwardIcon />

          </Button>
        </div>
      </div>

    );
  }
  if (isChild && count === 6 && sillyLevel[0] == 3) {
    setIsChild(isChild);
    return (
      <div>
        <Quiz7Kid bookFilters={bookFilters} setBookFilters={setBookFilters} />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'child back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowBackIcon />

          </Button>
          <ProgressAndArrows variant="determinate" value={85} />
          <NavLink to="/quiz/results" style={{ textDecoration: 'none' }}>
            <Button
              disabled={issDisabled(bookFilters.genre)}
              variant="contained"
              onClick={() => dispatch({ type: 'child' })}
              sx={{
                background: '#F99E16',
                boxShadow: 'none',
                borderRadius: '100px',
                '&.MuiButtonBase-root:hover': {
                  bgcolor: '#F99E16',
                },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Your Results
            </Button>
          </NavLink>
        </div>
      </div>

    );
  }
  if ((isChild && count === 5 && sillyLevel[0] == 5)
  || (isChild && count === 5 && sillyLevel[0] == 3)
  || (isChild && count === 6 && illusion[0] == 2)) {
    const childButtonCaptions = ['The lives of interesting and influential people',
      'Fascinating facts about different topics such as nature, animals, or space',
      'Important events of the past that shaped the world we live in today',
      'A detailed retelling of a crucial period of time in an individual’s life',
      'The case of a mysterious, unnatural phenomenon', 'Stories with poetry'];
    setIsChild(isChild);
    return (
      <div>
        <Quiz6Kid bookFilters={bookFilters} setBookFilters={setBookFilters} title="Which of the following would you be interested in reading about? " buttonCaptions={childButtonCaptions} />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'child back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowBackIcon />

          </Button>
          <ProgressAndArrows variant="determinate" value={85} sx={{ flex: '0 1 60%' }} />
          <NavLink to="/quiz/results" style={{ textDecoration: 'none' }}>
            <Button
              disabled={issDisabled(bookFilters.genre)}
              variant="contained"
              onClick={() => dispatch({ type: 'child' })}
              sx={{
                background: '#F99E16',
                boxShadow: 'none',
                borderRadius: '100px',
                '&.MuiButtonBase-root:hover': {
                  bgcolor: '#F99E16',
                },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Your Results
            </Button>
          </NavLink>
        </div>
      </div>

    );
  }
  if ((isChild && count === 5 && sillyLevel[0] == 1)
    || (isChild && count === 6 && sillyLevel[0] == 3)
    || (isChild && count === 6 && illusion[0] == 1)) {
    setIsChild(isChild);
    return (
      <div>
        <Quiz7Kid bookFilters={bookFilters} setBookFilters={setBookFilters} />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'child back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowBackIcon />

          </Button>
          <ProgressAndArrows variant="determinate" value={85} sx={{ flex: '0 1 60%' }} />
          {((isChild && count === 6 && illusion[0] == 1)
        || (isChild && count === 5 && sillyLevel[0] == 1))
            ? (
              <NavLink to="/quiz/results" style={{ textDecoration: 'none' }}>
                <Button
                  disabled={issDisabled(bookFilters.genre)}
                  variant="contained"
                  onClick={() => dispatch({ type: 'parent' })}
                  sx={{
                    background: '#F99E16',
                    boxShadow: 'none',
                    borderRadius: '100px',
                    '&.MuiButtonBase-root:hover': {
                      bgcolor: '#F99E16',
                    },
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  Your Results
                </Button>
              </NavLink>
            )
            : (
              <Button
                disabled={issDisabled(bookFilters.genre)}
                variant="contained"
                onClick={() => dispatch({ type: 'parent' })}
                sx={{
                  background: '#f79927',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  boxShadow: 'none',
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: '#F99E16',
                  },
                }}
              >
                <ArrowForwardIcon />

              </Button>
            )}
        </div>
      </div>

    );
  }
  // eslint-disable-next-line eqeqeq
  if ((isChild && count === 5 && sillyLevel[0] == 2)
  || (isChild && count === 5 && sillyLevel[0] == 4)) {
    setIsChild(isChild);
    return (
      <div style={{ background: '#FAFAFA' }}>
        <Quiz5 setIllusions={changeIllusion} />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'child back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowBackIcon />

          </Button>
          <ProgressAndArrows variant="determinate" progress={65} sx={{ flex: '0 1 60%' }} />
          <Button
            disabled={isIllusionDisabled()}
            variant="contained"
            onClick={() => dispatch({ type: 'child' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowForwardIcon />

          </Button>
        </div>
      </div>

    );
  }
  if (isChild && count === 7) {
    setIsChild(isChild);
    return (
      <div>
        <Quiz7Kid bookFilters={bookFilters} setBookFilters={setBookFilters} />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'child back' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowBackIcon />

          </Button>
          <ProgressAndArrows variant="determinate" value={85} sx={{ flex: '0 1 60%' }} />
          <Button
            disabled={issDisabled(bookFilters.genre)}
            variant="contained"
            onClick={() => dispatch({ type: 'parent' })}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowForwardIcon />

          </Button>
        </div>
      </div>

    );
  }
  setIsChild(isChild);
  if (count === 1 && goneBack) {
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
              <Button className="button" onClick={() => dispatch({ type: 'parent' })} sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Parent} style={{ borderRadius: 0 }} />}>
                <p
                  className="button-text"
                  style={{
                    fontFamily: 'DM Sans', fontWeight: 'bold', color: '#000000', textTransform: 'capitalize',
                  }}
                >
                  Parent
                </p>
              </Button>
              <Button className="button" onClick={() => dispatch({ type: 'parent' })} sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Educator} style={{ borderRadius: 0 }} />}>
                <p
                  className="button-text"
                  style={{
                    fontFamily: 'DM Sans', fontWeight: 'bold', color: '#000000', textTransform: 'capitalize',
                  }}
                >
                  Educator
                </p>
              </Button>
              <Button className="button" onClick={() => dispatch({ type: 'child' })} sx={{ m: 7 }} size="large" variant="outlined" startIcon={<Avatar sx={{ width: 100, height: 100 }} src={Child} style={{ borderRadius: 0 }} />}>
                <p
                  className="button-text"
                  style={{
                    fontFamily: 'DM Sans', fontWeight: 'bold', color: '#000000', textTransform: 'capitalize',
                  }}
                >
                  Kid
                </p>
              </Button>
            </Box>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
              <NavLink to="/quiz">
                <Button
                  variant="contained"
                  onClick={() => dispatch({ type: 'child back' })}
                  sx={{
                    background: '#f79927',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    boxShadow: 'none',
                    '&.MuiButtonBase-root:hover': {
                      bgcolor: '#F99E16',
                    },
                  }}
                >
                  <ArrowBackIcon />
                </Button>
              </NavLink>
              <ProgressAndArrows variant="determinate" progress={0} sx={{ flex: '0 1 60%' }} />
              <Button
                variant="contained"
                onClick={() => ((isParent) ? dispatch({ type: 'parent' }) : dispatch({ type: 'child' }))}
                sx={{
                  background: '#f79927',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  boxShadow: 'none',
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: '#F99E16',
                  },
                }}
              >
                <ArrowForwardIcon />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ background: '#FAFAFA', height: '100%' }}>
      <div>
        <h2 style={{
          fontFamily: 'DM Sans', letterSpacing: '-0.02em', margin: '0', paddingTop: '3em',
        }}
        >
          Are you a parent, educator, or kid?
        </h2>
        <Box sx={{ paddingBottom: '4em' }}>
          <Button
            className="button"
            sx={{
              border: '2px solid #d7d7d7',
              borderRadius: '21px',
              m: 7,
              '& .MuiButton-startIcon': {
                marginRight: '0',
              },
              background: '#ffffff',
            }}
            onClick={() => dispatch({ type: 'parent' })}
            size="large"
            variant="outlined"
            startIcon={(
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={Parent}
                style={{ borderRadius: 0 }}
              />
            )}
          >
            <p
              className="button-text"
              style={{
                fontFamily: 'DM Sans', fontWeight: 'bold', color: '#000000', textTransform: 'capitalize',
              }}
            >
              Parent
            </p>
          </Button>
          <Button
            className="button"
            sx={{
              border: '2px solid #d7d7d7',
              borderRadius: '21px',
              m: 7,
              '& .MuiButton-startIcon': {
                marginRight: '0',
              },
              background: '#ffffff',
            }}
            onClick={() => dispatch({ type: 'parent' })}
            size="large"
            variant="outlined"
            startIcon={(
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={Educator}
                style={{ borderRadius: 0 }}
              />
            )}
          >
            <p
              className="button-text"
              style={{
                fontFamily: 'DM Sans', fontWeight: 'bold', color: '#000000', textTransform: 'capitalize',
              }}
            >
              Educator

            </p>
          </Button>
          <Button
            className="button"
            sx={{
              border: '2px solid #d7d7d7',
              borderRadius: '21px',
              m: 7,
              background: '#ffffff',
              '& .MuiButton-startIcon': {
                marginRight: '0',
              },
            }}
            onClick={() => dispatch({ type: 'child' })}
            size="large"
            variant="outlined"
            startIcon={(
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={Child}
                style={{ borderRadius: 0 }}
              />
            )}
          >
            <p
              className="button-text"
              style={{
                fontFamily: 'DM Sans', fontWeight: 'bold', color: '#000000', textTransform: 'capitalize',
              }}
            >
              Kid
            </p>
          </Button>
        </Box>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3em 0 3em 0' }}>
          <NavLink to="/quiz">
            <Button
              variant="contained"
              onClick={() => dispatch({ type: 'child back' })}
              sx={{
                background: '#f79927',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                boxShadow: 'none',
                '&.MuiButtonBase-root:hover': {
                  bgcolor: '#F99E16',
                },
              }}
            >
              <ArrowBackIcon />
            </Button>
          </NavLink>
          <ProgressAndArrows variant="determinate" progress={0} sx={{ flex: '0 1 60%' }} />
          <Button
            disabled
            variant="contained"
            onClick={() => ((isParent) ? dispatch({ type: 'parent' }) : dispatch({ type: 'child' }))}
            sx={{
              background: '#f79927',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: 'none',
              '&.MuiButtonBase-root:hover': {
                bgcolor: '#F99E16',
              },
            }}
          >
            <ArrowForwardIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

Quiz1.propTypes = {
  setBookFilters: propTypes.func.isRequired,
  setIsChild: propTypes.func.isRequired,
  bookFilters: propTypes.shape({
    bookId: propTypes.string.isRequired,
    'race/ethnicity': propTypes.arrayOf(propTypes.string).isRequired,
    minAge: propTypes.number.isRequired,
    maxAge: propTypes.number.isRequired,
    minGrade: propTypes.number.isRequired,
    maxGrade: propTypes.number.isRequired,
    genre: propTypes.arrayOf(propTypes.string).isRequired,
    book_type: propTypes.arrayOf(propTypes.string).isRequired,
  }).isRequired,
};
