import React from 'react';
import './Footer.css';
import Logo from '../../Assets/Images/TCK PNG Logo.png';

function Footer() {
  return (
    <div style={{
      display: 'flex', height: '362px', background: '#FCFCFC', boxShadow: '0 -7px 10px rgba(0, 0, 0, 0.15)', placeItems: 'center', margin: '5rem 0 0 0', padding: '0 10%', columnGap: '4rem',
    }}
    >
      <div style={{ flexBasis: '20%' }}>
        <img src={Logo} alt="The Conscious Kid Logo" style={{ maxWidth: '50%', maxHeight: '50%' }} />
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column', flexBasis: '20%', textAlign: 'left', lineHeight: '0.5rem',
      }}
      >
        <p style={{
          fontFamily: 'Work Sans', fontWeight: 'normal', fontSize: '1.5rem',
        }}
        >
          Menu
        </p>
        <p style={{ fontSize: '1rem', fontFamily: 'DM Sans' }}>Home</p>
        <p style={{ fontSize: '1rem', fontFamily: 'DM Sans' }}>Collections</p>
        <p style={{ fontSize: '1rem', fontFamily: 'DM Sans' }}>Book Recommendation Quiz</p>
        <p style={{ fontSize: '1rem', fontFamily: 'DM Sans' }}>Racial Literacy Dictionary</p>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column', flexBasis: '20%', textAlign: 'left', lineHeight: '0.5rem', flexGrow: '1',
      }}
      >
        <p style={{ fontFamily: 'Work Sans', fontSize: '1.25rem' }}>More from The Conscious Kid</p>
        <p>Resources</p>
        <button type="button">Donate</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '20%' }}>
        <p>Follow Us</p>
      </div>

    </div>
  );
}

export default Footer;
