import React from 'react';
import './Footer.css';
import Logo from '../../Assets/Images/TCK PNG Logo.png';
import facebookLogo from '../../Assets/Images/facebook-footer-logo.svg';
import instagramLogo from '../../Assets/Images/instagram-footer-logo.svg';
import twitterLogo from '../../Assets/Images/twitter-footer-logo.svg';

function Footer() {
  return (
    <div style={{
      display: 'flex', height: '362px', background: '#FCFCFC', boxShadow: '0 -7px 10px rgba(0, 0, 0, 0.15)', alignItems: 'start', justifyContent: 'start', margin: '5rem 0 0 0', padding: '0 2%', columnGap: '2rem',
    }}
    >
      <div style={{ flexBasis: '22%', marginTop: '5em' }}>
        <img src={Logo} alt="The Conscious Kid Logo" style={{ maxWidth: '50%', maxHeight: '50%' }} />
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column', flexBasis: '22%', textAlign: 'left',
      }}
      >
        <p style={{
          fontFamily: 'Work Sans', fontWeight: 'normal', fontSize: '1.5em', marginTop: '3em', marginBottom: '0',
        }}
        >
          Menu
        </p>
        <p style={{
          fontSize: '1rem', fontFamily: 'DM Sans', marginLeft: '0.2em', marginBottom: '0',
        }}
        >
          Home
        </p>
        <p style={{
          fontSize: '1rem', fontFamily: 'DM Sans', marginLeft: '0.2em', marginBottom: '0',
        }}
        >
          Collections
        </p>
        <p style={{
          fontSize: '1rem', fontFamily: 'DM Sans', marginLeft: '0.2em', marginBottom: '0',
        }}
        >
          Book Recommendation Quiz
        </p>
        <p style={{
          fontSize: '1rem', fontFamily: 'DM Sans', marginLeft: '0.2em', marginBottom: '0',
        }}
        >
          Racial Literacy Dictionary
        </p>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column', textAlign: 'left', flexGrow: '1',
      }}
      >
        <p style={{
          fontFamily: 'Work Sans', fontSize: '1.5em', margin: '2.5em 0 0 0',
        }}
        >
          More from The Conscious Kid
        </p>
        <p style={{ marginBottom: '2em', marginLeft: '0.2em' }}>Resources</p>
        <button
          type="button"
          style={{
            background: '#3477DE', borderRadius: '0.8125rem', color: 'white', fontFamily: 'Work Sans', fontWeight: 'bold', width: '124px', height: '63px', border: 'None',
          }}
        >
          Donate
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '22%' }}>
        <p style={{
          fontFamily: 'Work Sans', fontWeight: 'normal', fontSize: '1.5em', textAlign: 'left', marginTop: '3em',
        }}
        >
          Follow Us
        </p>
        <div style={{
          display: 'flex', flexDirection: 'row', columnGap: '2em', alignItems: 'center',
        }}
        >
          <img src={facebookLogo} alt="facebook icon linking to the TCK facebook page" />
          <img src={instagramLogo} alt="instagram icon linking to the TCK instagram page" />
          <img src={twitterLogo} alt="twitter icon linking to the TCK twitter page" />
        </div>
      </div>

    </div>
  );
}

export default Footer;
