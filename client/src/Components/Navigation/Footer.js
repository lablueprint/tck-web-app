import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Logo from '../../Assets/Images/TCK PNG Logo.png';
import blueprintLogo from '../../Assets/Images/blueprint-logo.png';

const styles = {
  icon: {
    color: '#393EBA',
  },
};

function Footer() {
  return (
    <div className="footer-wrapper">
      <NavLink
        to="/"
        className="tck-logo-wrapper"
      >
        <img src={Logo} alt="The Conscious Kid Logo" className="tck-logo-img" />
      </NavLink>
      <div className="footer-section-wrapper">
        <p className="footer-title">
          Menu
        </p>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'footer-text-active' : 'footer-text')}
        >
          Home
        </NavLink>
        <NavLink
          to="/browser"
          className={({ isActive }) => (isActive ? 'footer-text-active' : 'footer-text')}
        >
          Book Search
        </NavLink>
        <NavLink
          to="/quiz"
          className={({ isActive }) => (isActive ? 'footer-text-active' : 'footer-text')}
        >
          Book Finder Quiz
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) => (isActive ? 'footer-text-active' : 'footer-text')}
        >
          Collections
        </NavLink>
        <NavLink
          to="/dictionary"
          className={({ isActive }) => (isActive ? 'footer-text-active' : 'footer-text')}
        >
          Terms to Know
        </NavLink>
      </div>
      <div className="footer-section-wrapper">
        <p className="footer-title">
          More from The Conscious Kid
        </p>
        <a href="https://www.theconsciouskid.org" className="footer-text">Resources</a>
        <a href="https://www.theconsciouskid.org/contact" className="footer-text">Contact</a>
        <a href="https://www.theconsciouskid.org/donate">
          <button
            type="button"
            className="donate-button"
          >
            Donate
          </button>
        </a>
      </div>
      <div className="footer-section-wrapper">
        <p className="footer-title">
          Connect With Us
        </p>
        <div className="social-icons-box">
          <a href="https://www.facebook.com/theconsciouskid">
            <FacebookIcon
              sx={styles.icon}
              fontSize="large"
              alt="facebook icon linking to the TCK facebook page"
            />
          </a>
          <a href="https://www.instagram.com/theconsciouskid/">
            <InstagramIcon
              sx={styles.icon}
              fontSize="large"
              alt="instagram icon linking to the TCK instagram page"
            />
          </a>
          <a href="https://twitter.com/consciouskidlib">
            <TwitterIcon
              sx={styles.icon}
              fontSize="large"
              alt="twitter icon linking to the TCK twitter page"
            />
          </a>
        </div>
        <div className="footer-text">
          <div className="bp-logo-row">
            <p>
              Developed By
            </p>
            <a href="https://lablueprint.org">
              <img className="blueprint-logo" src={blueprintLogo} alt="facebook icon linking to the TCK facebook page" />
            </a>
          </div>
          &#169; 2023 The Conscious Kid
        </div>
      </div>

    </div>
  );
}

export default Footer;
