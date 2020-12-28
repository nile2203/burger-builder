import React from 'react';
import classes from './Button.css';

const button = (props) => {
    return (
        <button 
            className={ [classes.Button, classes[props.buttonType]].join(' ') }
            onClick={props.onClick}> { props.children }
        </button>
    );
};

export default button;