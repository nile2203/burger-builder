import React from 'react';
import burgerLogo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img 
                scr={burgerLogo} 
                alt="Burger Singh" />
        </div>
    );
};

export default logo;