import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" present={true}> Burger Builder </NavigationItem >
            <NavigationItem link="/"> Checkout </NavigationItem >
        </ul>
    );
};

export default navigationItems;