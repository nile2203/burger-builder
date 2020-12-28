import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Button from '../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate(){
        console.log('[OrderSummary.js] componentWillUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map( (ingredientName) => {
            return (
                <li key={ingredientName}>
                    <span style={{textTransform: 'capitalize'}}> {ingredientName}: </span>
                    {this.props.ingredients[ingredientName]}
                </li>
            );
        })
        return (
            <Aux>
                <h3> Your Order</h3>
                <p> Delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p> <strong> Total Price: {this.props.totalPrice.toFixed(2)} </strong></p>
                <p> Continue to checkout </p>
                <Button 
                    buttonType="Danger" 
                    onClick={this.props.purchaseCancelHandler}> 
                    CANCEL 
                </Button>
                <Button 
                    buttonType="Success" 
                    onClick={this.props.purchaseContinueHandler}> 
                    CONTINUE 
                </Button>
            </Aux>
        );
    }
};

export default OrderSummary;