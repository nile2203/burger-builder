import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axiosInstance from "../../axios";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5, 
    meat: 1.2,
    bacon: 1
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        axiosInstance.get('/ingredients.json')
        .then(response => {
            console.log(response);
            this.setState({ ingredients: response.data});
        })
        .catch(error => {
            console.log(error);
        })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients).reduce( (a, b) => a + b, 0);
        if (sum >= 1) {
            this.setState( { purchaseable: true} );
        } else {
            this.setState( { purchaseable: false } );
        }
    }

    addIngredientHandler = (type) => {
        console.log('Inside add handler');
        const updatedCount = this.state.ingredients[type] + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCount;
        const updatePrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState( {totalPrice: updatePrice, ingredients: updateIngredients} );
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const updatedCount = this.state.ingredients[type] - 1;
            const updateIngredients = {
                ...this.state.ingredients
            };
            updateIngredients[type] = updatedCount;
            const updatePrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState( {totalPrice: updatePrice, ingredients: updateIngredients} );
            this.updatePurchaseState(updateIngredients);
        }
        else {
            return;
        }
    }

    purchasingHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true })
        const data = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice
        }
        axios.post('/orders.json', data)
        .then(response => {
            console.log(response);
            this.setState({ loading: true, purchasing: false });
        })
        .catch(error => {
            console.log(error)
            this.setState({ loading: true, purchasing: false });
        }); 
    }

    getOrderSummary = () => {
        let orderSummary = <Spinner />
        if (this.state.ingredients) {
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCancelHandler={this.purchaseCancelHandler}
                purchaseContinueHandler={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}/>
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return orderSummary;
    }

    getBurger = () => {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let burger = <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disableInfo={disableInfo}
                    totalPrice={this.state.totalPrice}
                    isPurchaseble={this.state.purchaseable}
                    purchasing={this.purchasingHandler} />
                </Aux>
            );
        }
        return burger;
    }
 
    render() {
        console.log(this.state);
        return (
            <Aux>
                <Modal show={this.state.purchasing} purchaseCancel={this.purchaseCancelHandler}> 
                    {this.getOrderSummary()}
                </Modal>
                {this.getBurger()}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);