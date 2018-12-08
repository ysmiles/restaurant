import React from 'react';
import { connect } from 'react-redux';

import FoodListItem from './food-list-item';
import { view as Search } from '../../searchbar';
import { view as MapModule } from '../../map';

import fetchApi from '../../../modules/fetch-api';

import './style.css';
// Note: Food listing is homepage

class FoodListing extends React.Component {
  componentDidMount() {
    const { loadFoods } = this.props;
    // need real address
    // already added proxy to api server (in package.json)
    fetchApi('get', '/foods.json').then(json => {
      loadFoods(json);
    });
  }

  render() {
    const { addToCart, removeFromCart, foods, cart } = this.props;

    return (
      <div className="Homepage">
        <Search />
        <div className="Food-listing">
          {foods.map(food => (
            <FoodListItem
              food={food}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartItem={cart.filter(cartItem => cartItem.id === food.id)[0]}
            />
          ))}
        </div>
        <MapModule />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    foods: state.foods
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadFoods: foods => {
      dispatch({ type: 'LOAD_FOODS', payload: foods });
    },
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
