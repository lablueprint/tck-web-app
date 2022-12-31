import React, { useState, useEffect } from 'react';
import './Header.css';
import {
  NavLink,
} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuIcon from '@mui/icons-material/Menu';
import { v4 as uuidv4 } from 'uuid';
import Logo from '../../Assets/Images/TCK SVG Logo.png';

const options = [
  { name: 'Home', nav: '/' },
  { name: 'Book Search', nav: '/browser' },
  { name: 'Book Finder Quiz', nav: '/quiz' },
  { name: 'Collections', nav: '/collection/init' },
  { name: 'Terms to Know', nav: '/dictionary' },
];

const ITEM_HEIGHT = 48;

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [active, setActive] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="long-button"
        onClick={handleClick}
      >
        <MenuIcon sx={{ height: '40px', width: '40px' }} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '30ch',
          },
        }}
      >
        {options.map((option) => (
          <NavLink
            to={option.nav}
            className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
            isActive={(match) => {
              if (match) {
                setActive(true);
              }
            }}
            key={uuidv4()}
          >
            <MenuItem key={option.name} selected={active} onClick={handleClose}>
              {option.name}
            </MenuItem>
          </NavLink>
        ))}
      </Menu>
    </div>
  );
}

function Header() {
  const size = useWindowSize();
  const tabValue = localStorage.getItem('tabValue');
  const [value, setValue] = useState(tabValue !== undefined
    && Number.isInteger(Number(tabValue)) ? Number(tabValue) : 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem('tabValue', String(newValue));
  };
  return (
    <nav className="header">
      <div className="header-container">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-link-active logo-img-container' : 'nav-link logo-img-container')}
        >
          <img src={Logo} className="logo" alt="The Conscious Kid logo" />
        </NavLink>
        {
          size.width > 1000 ? (
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              color="primary"
              // selected
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#393EBA',
                  height: '3.5px',
                },
              }}
            >
              <NavLink
                to="/"
                className="nav-link"
                style={{
                  display: 'flex', alignItems: 'center', flex: '0 1 5%', padding: '0', width: '100%', justifyContent: 'center',
                }}
              >
                <Tab
                  label="Home"
                  value={0}
                  onChange={handleChange}
                  sx={{
                    textTransform: 'none',
                    fontFamily: 'Work Sans',
                    fontWeight: value === 0 ? 'bold' : 'normal',
                    fontSize: '15px',
                    color: value === 0 ? '#393EBA' : '#3f3f3f',
                    opacity: 1,
                  }}
                />

              </NavLink>
              <NavLink
                to="/browser"
                className="nav-link"
                style={{
                  display: 'flex', alignItems: 'center', flex: '1 0 15%', padding: '0', width: '100%', justifyContent: 'center',
                }}
              >
                <Tab
                  label="Book Search"
                  value={1}
                  onChange={handleChange}
                  sx={{
                    textTransform: 'none',
                    fontFamily: 'Work Sans',
                    fontWeight: value === 1 ? 'bold' : 'normal',
                    fontSize: '15px',
                    color: value === 1 ? '#393EBA' : '#3f3f3f',
                    opacity: 1,
                  }}
                />

              </NavLink>
              <NavLink
                to="/quiz"
                className="nav-link"
                style={{
                  display: 'flex', alignItems: 'center', flex: '1 0 20%', padding: '0', width: '100%', justifyContent: 'center',
                }}
              >
                <Tab
                  label="Book Finder Quiz"
                  value={2}
                  onChange={handleChange}
                  sx={{
                    textTransform: 'none',
                    fontFamily: 'Work Sans',
                    fontWeight: value === 2 ? 'bold' : 'normal',
                    fontSize: '15px',
                    color: value === 2 ? '#393EBA' : '#3f3f3f',
                    opacity: 1,
                  }}
                />

              </NavLink>
              <NavLink
                to="/collection/init"
                className="nav-link"
                style={{
                  display: 'flex', alignItems: 'center', flex: '0 1 5%', padding: '0', width: '100%', justifyContent: 'center',
                }}
              >
                <Tab
                  label="Collections"
                  value={3}
                  onChange={handleChange}
                  sx={{
                    textTransform: 'none',
                    fontFamily: 'Work Sans',
                    fontWeight: value === 3 ? 'bold' : 'normal',
                    fontSize: '15px',
                    color: value === 3 ? '#393EBA' : '#3f3f3f',
                    opacity: 1,
                  }}
                />

              </NavLink>
              <NavLink
                to="/dictionary"
                className="nav-link"
                style={{
                  display: 'flex', alignItems: 'center', flex: '1 0 15%', padding: '0', width: '100%', justifyContent: 'center',
                }}
              >
                <Tab
                  label="Terms to Know"
                  value={4}
                  onChange={handleChange}
                  sx={{
                    textTransform: 'none',
                    fontFamily: 'Work Sans',
                    fontWeight: value === 4 ? 'bold' : 'normal',
                    fontSize: '15px',
                    color: value === 4 ? '#393EBA' : '#3f3f3f',
                    opacity: 1,
                  }}
                />

              </NavLink>
            </Tabs>

          // <ul className="nav-menu">
          //   <li>
          //     <NavLink
          //       to="/"
          //       className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
          //     >
          //       Home
          //     </NavLink>
          //   </li>
          //   <li>
          //     <NavLink
          //       to="/browser"
          //       className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
          //     >
          //       Book Search
          //     </NavLink>
          //   </li>
          //   <li>
          //     <NavLink
          //       to="/quiz"
          //       className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
          //     >
          //       Book Finder Quiz
          //     </NavLink>
          //   </li>
          //   <li>
          //     <NavLink
          //       to="/collection/init"
          //       className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
          //     >
          //       Collections
          //     </NavLink>
          //   </li>
          //   <li>
          //     <NavLink
          //       to="/dictionary"
          //       className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
          //     >
          //       Terms to Know
          //     </NavLink>
          //   </li>
          // </ul>
          )
            : (
              <LongMenu />
            )
        }

      </div>
    </nav>
  );
}

export default Header;
