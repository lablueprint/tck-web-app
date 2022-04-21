/* eslint-disable */
import React, { useState } from 'react';
import {Button, Menu, MenuItem, ListItemText, ListItemIcon, Fade} from '@mui/material';
import { Check } from '@mui/icons-material';

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
                sx={{textTransform: 'none'}}
                id='basic-button'
                onClick={handleClick}
                endIcon={menuIcon}
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


options.map((option) => {(
    <MenuItem>
        {
            (icon) ? <ListItemIcon>{icon}</ListItemIcon> : <div/>
        }
        <ListItemText>{text}</ListItemText>
        {
            (value === val) ? <ListItemIcon><Check/></ListItemIcon> : <div/>
        }
    </MenuItem>
)})

sortOptions = [
    {
        text: "Sort by Book Title Alphabetically",
        icon: <SortByAlpha/>,
        value: "alpha"
    },
    {
        text: "Sort by Release Date",
        icon: <DateRange/>,
        value: "release"
    },
    {
        text: "Sort by Recently Added",
        icon: <StarBorder/>,
        value: "added"
    }
]

pageOptions = [
    
]

<Button 
    sx={{textTransform: 'none'}}
    id='basic-button'
    onClick={handleClick}
    endIcon={menuIcon}
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
    {
        options.map((option) => {(
            <MenuItem>
                {
                    (option.icon) ? <ListItemIcon>{option.icon}</ListItemIcon> : <div/>
                }
                <ListItemText>{option.text}}</ListItemText>
                {
                    (value === option.value) ? <ListItemIcon><Check/></ListItemIcon> : <div/>
                }
            </MenuItem>
        )})
    }

</Menu>


*/