import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from '../SideDrawer/SideDrawer.css';

const sideDrawer = (props) => {
    return (
        <div className={classes.SideDrawer}>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default sideDrawer;