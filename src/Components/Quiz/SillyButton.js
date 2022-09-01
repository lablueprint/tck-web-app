import React from 'react';
import propTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Button,
} from '@mui/material';
import './QuizGroup.css';

export default function SillyButton({
  handleClick, value, valueSelected, caption, image, alt, setValueSelected,
}) {
  return (
    <Button
      classname="silly-button"
      sx={valueSelected === value ? {
        maxWidth: 218,
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid #d7d7d7',
        borderRadius: '21px',
        textTransform: 'none',
        color: '#444444',
        backgroundColor: '#393EBA',
        '@media (max-width: 680px)': {
          flexDirection: 'row',
          width: '95%',
          minWidth: 400,
          justifyContent: 'space-between',
          height: '8rem',
          marginBottom: '1rem',
        },
      }
        : {
          maxWidth: 218,
          flexDirection: 'column',
          border: '2px solid #d7d7d7',
          borderRadius: '21px',
          textTransform: 'none',
          color: '#444444',
          backgroundcolor: '#FFFFFF',
          '@media (max-width: 680px)': {
            flexDirection: 'row',
            width: '95%',
            minWidth: 400,
            justifyContent: 'space-between',
            height: '8rem',
            marginBottom: '1rem',
          },
        }}
      onClick={() => {
        handleClick(value);
        setValueSelected(value);
      }}
    >
      <div sx={{ height: '50%' }}>
        <img src={image} height="90" width="90" alt={alt} />
      </div>
      <FormControlLabel
        control={(
          <Radio
            checked={valueSelected === { value }}
            sx={{
              '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                    {
                      color: valueSelected === value ? '#393EBA' : 'white',
                    },
              '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                color: valueSelected === value ? '#393EBA' : 'white',
              },
            }}
            value={value}
            onChange={(e) => handleClick(e.target.value)}
          />
        )}
        sx={{
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0',
          '@media (max-width: 680px)': { flexDirection: 'row' },
        }}
        label={(
          <p style={valueSelected === value ? {
            fontFamily: 'DM Sans', color: '#FFFFFF', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
          } : {
            fontFamily: 'DM Sans', fontWeight: 'bold', fontSize: '17px', textAlign: 'center', margin: '0 auto 0 auto',
          }}
          >
            {caption}
          </p>
        )}
      />
    </Button>
  );
}
SillyButton.propTypes = {
  caption: propTypes.string.isRequired,
  value: propTypes.number.isRequired,
  valueSelected: propTypes.number.isRequired,
  handleClick: propTypes.func.isRequired,
  image: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  setValueSelected: propTypes.func.isRequired,
};
