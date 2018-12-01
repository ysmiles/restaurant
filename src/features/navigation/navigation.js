import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Navigation = ({ cart }) => (
  <nav>
    <ul className="Top-menu">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/cart">
          Cart (
          {cart.reduce((acc, item) => {
            return acc + item.quantity;
          }, 0)}
          )
        </NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/checkout">Checkout</NavLink>
      </li>
    </ul>
  </nav>
);

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(mapStateToProps)(Navigation);
