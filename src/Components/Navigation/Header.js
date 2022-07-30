import React, { useState, useEffect } from 'react';
import './Header.css';
import {
  NavLink,
} from 'react-router-dom';
import {
  IconButton, MenuItem, Drawer, Box, CssBaseline,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { v4 as uuidv4 } from 'uuid';
import Logo from '../../Assets/Images/TCK SVG Logo.svg';

const options = [
  { name: 'Home', nav: '/' },
  { name: 'Book Search', nav: '/browser' },
  { name: 'Book Finder Quiz', nav: '/quiz' },
  { name: 'Collections', nav: '/collection/init' },
  { name: 'Terms to Know', nav: '/dictionary' },
];

function useWindowSize() {
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

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [active, setActive] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = () => {
    setAnchorEl(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setAnchorEl(!open);
  };

  const drawer = (
    <Box
      role="presentation"
      onClick={handleDrawerToggle}
      sx={{
        width: { xs: '100%', sm: 250 },
      }}
    >
      {options.map((option) => (
        <NavLink
          to={option.nav}
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
    </Box>
  );

  const size = useWindowSize();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <nav className="header">
        <div className="header-container">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link-active logo-img-container' : 'nav-link logo-img-container')}
          >
            <img src={Logo} className="logo" alt="The Conscious Kid logo" />
          </NavLink>
          { size.width > 910 ? (
            <ul className="nav-menu">
              {options.map((option) => (
                <li>
                  <NavLink
                    to={option.nav}
                    className={({ isActive }) => (isActive ? 'nav-link-active' : 'nav-link')}
                    key={uuidv4()}
                  >
                    {option.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <IconButton
              id="long-button"
              onClick={handleClick}
            >
              <MenuRoundedIcon
                className="menu-icon"
                fontSize="large"
              />
            </IconButton>
          )}
        </div>
      </nav>
      <div>
        <Drawer
          id="long-menu"
          anchor="right"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          variant="persistent"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </div>
    </Box>
  );
}

export default Header;
