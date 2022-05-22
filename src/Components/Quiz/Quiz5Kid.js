import React from 'react';
import propTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {
  Box,
} from '@mui/material';
import illusion from '../../Assets/Images/illusion.png';
import './QuizGroup.css';

export default function Quiz5({ setIllusions }) {
  const handleClick = (val) => {
    setIllusions(val);
  };
  return (
    <div>
      <Box sx={{ padding: 15, background: '#FAFAFA' }}>
        <h1>
          What do you see in the picture below?
        </h1>
        <div><img src={illusion} alt="Illusion Missing" /></div>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{
              display: 'flex', flexDirection: 'row', columnGap: '4em', marginTop: '3em',
            }}
          >
            <FormControlLabel
              control={<Radio value={1} onChange={(e) => handleClick(e.target.value)} />}
              className="woman-question"
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
              }}
              label={(
                <p style={{
                  fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                }}
                >
                  A younger person
                </p>
                )}
            />
            <FormControlLabel
              control={<Radio value={2} onChange={(e) => handleClick(e.target.value)} />}
              className="woman-question"
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0',
              }}
              label={(
                <p style={{
                  fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
                }}
                >
                  An older person
                </p>
                )}
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </div>
  );
}
Quiz5.defaultProps = {
  setIllusions: null,
};
Quiz5.propTypes = {
  setIllusions: propTypes.func,
};
