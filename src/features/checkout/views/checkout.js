import React from 'react';
import { connect } from 'react-redux';

import { view as Cart } from '../../cart';
import CheckoutForm from './form';
import fetchApi from '../../../modules/fetch-api';

function submitOrder(values, cart) {
  const { email, name } = values.order;

  // back-end submission API
  fetchApi('post', '/api/destination', {
    order: {
      name,
      email,
      order_items_attributes: cart.map(item => ({
        food_id: item.food_id,
        qty: item.quantity
      }))
    }
  }).then(json => {
    if (json.errors) {
      alert('wrong');
      return;
    }
    document.location.href = `/orders/${json.id}`;
  });
}

function Checkout(props) {
  const { cart } = props;

  return (
    <div className="Checkout">
      <Cart />

      <CheckoutForm onSubmit={values => submitOrder(values, cart)} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(mapStateToProps)(Checkout);
