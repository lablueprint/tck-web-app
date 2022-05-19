import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  Link as LinkUI, Button, Menu, MenuItem, Fade,
} from '@mui/material';

const styles = {
  linkUI: {
    textDecoration: 'none',
    color: '#3477DE',
    fontWeight: '700',
    lineHeight: '1.8em',
    fontSize: '1.05em',
    display: 'block',
  },
  button: {
    textTransform: 'none',
    borderRadius: '10px',
    margin: '1vh 0 1vh 0',
    fontFamily: 'Work Sans',
    fontWeight: '600',
  },
  menuList: {
    '.MuiMenu-paper': {
      borderRadius: '15px',
    },
  },
  menuItem: {
    minWidth: '15vw',
    fontFamily: 'Work Sans',
    fontWeight: '600',
  },
};

function EducatorLink({ url, index }) {
  // Pop-up
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const educatorMenuItem = (
    <MenuItem
      value={url}
      sx={styles.menuItem}
    >
      <LinkUI
        sx={styles.linkUI}
        href={url}
        key={url}
        rel="noreferrer"
        target="_blank"
      >
        {url}
      </LinkUI>
    </MenuItem>
  );
  return (
    <div>
      <Button
        sx={styles.button}
        id="basic-button"
        variant="outlined"
        onClick={handleClick}
        size="small"
      >
        {`Educator Guide #${index}`}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        MenuListProps={{
          onClick: handleClose,
        }}
        sx={styles.menuList}
      >
        { educatorMenuItem }

      </Menu>
    </div>
  );
}

EducatorLink.propTypes = {
  url: PropTypes.string,
  index: PropTypes.number,
};

EducatorLink.defaultProps = {
  url: '',
  index: 0,
};

export default EducatorLink;
