import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../Assets/Images/TCK PNG Logo.png';
import FacebookLogo from '../../Assets/Images/facebook-footer-logo.svg';
import InstagramLogo from '../../Assets/Images/instagram-footer-logo.svg';
import TwitterLogo from '../../Assets/Images/twitter-footer-logo.svg';

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
          className={({ isActive }) => (isActive ? 'menu-options-active follow-us-text-size' : 'menu-options follow-us-text-size')}
        >
          Home
        </NavLink>
        <NavLink
          to="/browser"
          className={({ isActive }) => (isActive ? 'menu-options-active follow-us-text-size' : 'menu-options follow-us-text-size')}
        >
          Book Search
        </NavLink>
        <NavLink
          to="/quiz"
          className={({ isActive }) => (isActive ? 'menu-options-active follow-us-text-size' : 'menu-options follow-us-text-size')}
        >
          Book Finder Quiz
        </NavLink>
        <NavLink
          to="/collection/init"
          className={({ isActive }) => (isActive ? 'menu-options-active follow-us-text-size' : 'menu-options follow-us-text-size')}
        >
          Collections
        </NavLink>
        <NavLink
          to="/dictionary"
          className={({ isActive }) => (isActive ? 'menu-options-active follow-us-text-size' : 'menu-options follow-us-text-size')}
        >
          Terms to Know
        </NavLink>
      </div>
      <div className="resources-wrapper">
        <p className="resources-title follow-us-text-size">
          More from The Conscious Kid
        </p>
        <a href="https://www.theconsciouskid.org" className="resources-text"><p>Resources</p></a>
        <a href="https://www.theconsciouskid.org/donate">
          <button
            type="button"
            className="donate-button"
          >
            Donate
          </button>

        </a>
      </div>
      <div className="follow-us-wrapper">
        <p className="follow-us-text follow-us-text-size">
          Follow Us
        </p>
        <div className="social-icons-box">
          <a href="https://www.facebook.com/theconsciouskid"><img src={FacebookLogo} alt="facebook icon linking to the TCK facebook page" /></a>
          <a href="https://www.instagram.com/theconsciouskid/"><img src={InstagramLogo} alt="instagram icon linking to the TCK instagram page" /></a>
          <a href="https://twitter.com/consciouskidlib"><img src={TwitterLogo} alt="twitter icon linking to the TCK twitter page" /></a>
        </div>
      </div>

    </div>
  );
}

export default Footer;
