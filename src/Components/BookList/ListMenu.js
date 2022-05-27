import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Menu, MenuItem, ListItemText, ListItemIcon, Fade,
} from '@mui/material';
import { Check } from '@mui/icons-material';

const styles = {
  button: {
    textTransform: 'none',
    borderRadius: '10px',
    margin: '2vh 0 1vh 0',
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

function ListMenu({
  menuText, menuIcon, options, value, handleChange,
}) {
  // Pop-up
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChoose = (event) => {
    handleChange(event.currentTarget.value);
  };

  const menuItems = options.map((option) => (
    <MenuItem
      key={option.id}
      value={option.value}
      onClick={handleChoose}
      sx={styles.menuItem}
    >
      {
                (option.icon) ? <ListItemIcon>{option.icon}</ListItemIcon> : <div />
            }
      <ListItemText>{option.text}</ListItemText>
      {
                (value === option.value) ? <ListItemIcon><Check /></ListItemIcon> : <div />
            }
    </MenuItem>
  ));

  return (
    <div>
      <Button
        sx={styles.button}
        id="basic-button"
        variant="outlined"
        onClick={handleClick}
        endIcon={menuIcon}
        size="small"
      >
        {menuText}
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
        { menuItems }

      </Menu>
    </div>
  );
}

export default ListMenu;

ListMenu.defaultProps = {
  menuIcon: null,
};

ListMenu.propTypes = {
  menuText: PropTypes.string.isRequired,
  menuIcon: PropTypes.element,
  options: PropTypes.PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    icon: PropTypes.element,
    value: PropTypes.number,
  })).isRequired,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

/*
<ListMenu
    Label={Component}
    options={array of options for IconItemIcon, IconItemText}
    handleChange={setBooksPerPage, setSortBy}
    value={value}  // seeing which one to add check mark to
/>

*/
