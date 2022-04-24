/* eslint-disable */
import React, { useState } from 'react';
import {Button, Menu, MenuItem, ListItemText, ListItemIcon, Fade} from '@mui/material';
import { Check } from '@mui/icons-material';

const BUTTON_SX = {
    textTransform: 'none', 
    borderRadius: '10px',
    margin: '2vh 0 1vh 1vw'
};


function ListMenu({ menuText, menuIcon, options, value, handleChange }) {
    // Pop-up
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const handleChoose = (event) => {
        console.log(event.currentTarget.value);
        handleChange(event.currentTarget.value);

    };

    const menuItems = options.map((option) => { return (
        <MenuItem key={option.id} value={option.value} onClick={handleChoose} >
            {
                (option.icon) ? <ListItemIcon>{option.icon}</ListItemIcon> : <div/>
            }
            <ListItemText>{option.text}</ListItemText>
            {
                (value === option.value) ? <ListItemIcon><Check/></ListItemIcon> : <div/>
            }
        </MenuItem>
        );
    });

    return (
        <div>
            <Button 
                sx={BUTTON_SX}
                id='basic-button'
                variant="outlined"
                onClick={handleClick}
                endIcon={menuIcon}
                size="small"
            >
                {menuText}
            </Button>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                MenuListProps={{
                    'onClick': handleClose,
                }}
            >
                { menuItems }

            </Menu>
        </div>
    );

};

export default ListMenu;

/*
<ListMenu 
    Label={Component} 
    options={array of options for IconItemIcon, IconItemText} 
    handleChange={setBooksPerPage, setSortBy}
    value={value}  // seeing which one to add check mark to
/>



*/