import React from 'react';
import { connect } from 'react-redux';

import { view as Cart } from '../../cart';
import CheckoutForm from './form';
import fetchApi from '../../../modules/fetch-api';

class Checkout extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.onSubmit = this.onSubmit.bind(this);
    // this.refInput = this.refInput.bind(this);
  }

  submitOrder(values, cart) {
    const { user, resetCart, history, loginInfo } = this.props;
    const { address } = values;

    if (!loginInfo.loginStatus) {
      history.push('/login');
      return;
    }

    // back-end submission API
    fetchApi('post', '/api/order', {
      customer_id: user.customer_id,
      total_price: cart.reduce(
        (acc, item) => acc + item.unit_price * item.quantity,
        0
      ),
      address: address || user.address,
      items: cart.map(item => ({
        item_id: item.item_id,
        quantity: item.quantity,
        subtotal: item.quantity * item.unit_price
      }))
      //  [{ item_id: 111, quantity: 1, subtotal: 0 }]
    }).then(json => {
      console.log(json);
      resetCart();
      history.push('/' + user.first_name);
      // if (json.errors) {
      //   alert("wrong");
      //   return;
      // }
      // document.location.href = `/orders/${json.id}`;
    });
  }

  render() {
    const { cart } = this.props;

    return (
      <div className="Checkout">
        <Cart />

        <CheckoutForm onSubmit={values => this.submitOrder(values, cart)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    loginInfo: state.login,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetCart: () => {
      dispatch({ type: 'CART/CLEAR' });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
