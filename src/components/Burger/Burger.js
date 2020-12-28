import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients);
    transformedIngredients = transformedIngredients.map(ingredientName => {
            return [...Array(props.ingredients[ingredientName])].map( (_, index) => {
                return <BurgerIngredient key={ingredientName + index} type={ingredientName}/>
            })
        }).reduce( (arr, element) => {
            return arr.concat(element);
        }, []);
    
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p> Please add some ingredients! </p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;