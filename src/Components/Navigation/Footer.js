import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../Assets/Images/TCK PNG Logo.png';
import facebookLogo from '../../Assets/Images/facebook-footer-logo.svg';
import instagramLogo from '../../Assets/Images/instagram-footer-logo.svg';
import twitterLogo from '../../Assets/Images/twitter-footer-logo.svg';

function Footer() {
  return (
    <div className="footer-wrapper">
      <NavLink
        to="/"
        className="tck-logo-wrapper"
      >
        <img src={Logo} alt="The Conscious Kid Logo" className="tck-logo-img" />
      </NavLink>
      <div className="menu-wrapper">
        <p className="menu-title">
          Menu
        </p>
        <NavLink
          to="/"
          className="menu-options"
        >
          Home
        </NavLink>
        <NavLink
          to="/collection/init"
          className="menu-options"
        >
          Collections
        </NavLink>
        <NavLink
          to="/quiz"
          className="menu-options"
        >
          Book Recommendation Quiz
        </NavLink>
        <NavLink
          to="/dictionary"
          className="menu-options"
        >
          Racial Literacy Dictionary
        </NavLink>
      </div>
      <div className="resources-wrapper">
        <p className="resources-title">
          More from The Conscious Kid
        </p>
        <p className="resources-text">Resources</p>
        <button
          type="button"
          className="donate-button"
        >
          Donate
        </button>
      </div>
      <div className="follow-us-wrapper">
        <p className="follow-us-text">
          Follow Us
        </p>
        <div className="social-icons-box">
          <img src={facebookLogo} alt="facebook icon linking to the TCK facebook page" />
          <img src={instagramLogo} alt="instagram icon linking to the TCK instagram page" />
          <img src={twitterLogo} alt="twitter icon linking to the TCK twitter page" />
        </div>
      </div>

    </div>
  );
}

export default Footer;
