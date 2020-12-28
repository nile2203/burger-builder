import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' }
];

const getAllBuildControls = (props) => {
    return controls.map( control => {
        return <BuildControl 
        key={control.label} 
        label={control.label} 
        more={() => props.addIngredient(control.type)}
        less={() => props.removeIngredient(control.type)}
        isDisabled={props.disableInfo[control.type]} />
    });
};

const buildControls = (props) => { 
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong> {props.totalPrice.toFixed(2)} </strong></p>
            {getAllBuildControls(props)}
            <button 
            className={classes.OrderButton} 
            disabled={!props.isPurchaseble}
            onClick={props.purchasing}> ORDER NOW </button>
        </div>
    );
};

export default buildControls;