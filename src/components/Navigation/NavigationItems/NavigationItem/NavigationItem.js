import React from 'react';
import classes from './NavigationItem.css';

const navigationItem = (props) => {
    console.log(props, classes.active);
    return (
        <li className={classes.NavigationItem}> 
            <a 
                href={props.link}
                className={props.present ? "active" : null}> {props.children} 
            </a> 
        </li>
    );
};

export default navigationItem;