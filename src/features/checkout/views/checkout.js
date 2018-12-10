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
    const { userinfo } = this.props;
    const { address } = values.order;

    // back-end submission API
    fetchApi('post', '/api/order', {
      customer_id: userinfo.customer_id,
      total_price: cart.reduce(
        (acc, item) => acc + item.unit_price * item.quantity,
        0
      ),
      address: address || userinfo.address,
      items: cart.map(item => ({
        item_id: item.item_id,
        quantity: item.quantity,
        subtotal: item.quantity * item.unit_price
      }))
      //  [{ item_id: 111, quantity: 1, subtotal: 0 }]
    }).then(json => {
      if (json.errors) {
        alert('wrong');
        return;
      }
      document.location.href = `/orders/${json.id}`;
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
    userinfo: state.login.userinfo
  };
}

export default connect(mapStateToProps)(Checkout);
