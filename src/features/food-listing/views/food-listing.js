import React from 'react';
import { connect } from 'react-redux';

import FoodListItem from './food-list-item';
// import { cartItemsWithQuantities } from '../cart';

function FoodListing(props) {
  return (
    <div className="food-listing">
      {props.foods.map(food => (
        <FoodListItem
          food={food}
          addToCart={props.addToCart}
          removeFromCart={props.removeFromCart}
          cartItem={props.cart.filter(cartItem => cartItem.id === food.id)[0]}
        />
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: item => {
      dispatch({ type: 'ADD', payload: item });
    },
    removeFromCart: item => {
      dispatch({ type: 'REMOVE', payload: item });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodListing);
