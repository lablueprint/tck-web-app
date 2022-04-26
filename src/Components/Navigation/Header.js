import React from 'react';
import './Header.css';
import {
  NavLink,
} from 'react-router-dom';
import logo from '../../Assets/Images/TCK PNG Logo.png';

function Header() {
  return (
    <nav className="header">
      <div className="header-container">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
        >
          <img src={logo} className="logo" alt="The Conscious Kid logo" />
        </NavLink>
        <ul className="nav-menu">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/quiz"
              className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
            >
              Book Recommendation Quiz
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dictionary"
              className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
            >
              Dictionary
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
