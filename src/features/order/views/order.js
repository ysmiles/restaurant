import React from 'react';
import { connect } from 'react-redux';

import fetchApi from '../../../modules/fetch-api';

class Order extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.onSubmit = this.onSubmit.bind(this);
    // this.refInput = this.refInput.bind(this);
  }

  componentDidMount() {
    const { loadOrders } = this.props;

    loadOrders([
      {
        name: 'the order 1',
        email: 'abc@xyz.com',
        order_items: [
          {
            id: 1,
            name: 'X',
            description: 'This is good',
            keywords: ['abc', 'def', 'xyz'],
            image: '1-a.jpg',
            age: ['0', '+'],
            price: 10.24,
            qty: 3
          }
        ]
      }
    ]);
    // fetchApi("get", "address").then(json => {
    //   loadOrders(json);
    // });
  }

  renderOrder() {
    // temporary just first order
    const { name, email, order_items } = this.props.orders[0];

    console.log(this.props.orders[0]);

    return (
      <div>
        <h3>Order Info</h3>
        <div>Name: {name}</div>
        <div>Email: {email}</div>

        <h4>Items</h4>
        <ul>
          {order_items &&
            order_items.map(item => {
              const { price, qty } = item;
              return (
                <li>
                  {/* <img src={image} width={32} /> */}
                  {name}({qty} @ ${price} = $
                  {parseFloat(qty) * parseFloat(price)})
                </li>
              );
            })}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>{this.props.orders.length > 0 ? this.renderOrder() : 'Loading'}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orders
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadOrders: orders => {
      dispatch({ type: 'LOAD_ORDERS', payload: orders });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
