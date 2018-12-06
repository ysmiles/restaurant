import React from 'react';
import { NavLink, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { view as User } from '../user';

const Navigation = props => {
  const { cart, login } = props;
  const { loginStatus, userinfo } = login;

  return (
    <div>
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
            {loginStatus ? (
              <NavLink to={'/' + userinfo.username}>
                {userinfo.username}
              </NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </li>
          <li>
            <NavLink to="/checkout">Checkout</NavLink>
          </li>
          <li>
            <NavLink to="/orders">Orders</NavLink>
          </li>
        </ul>
      </nav>

      {loginStatus ? (
        <div>
          <Route exact path={'/' + userinfo.username} component={User} />
          <Redirect from="/login" to={'/' + userinfo.username} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
    login: state.login
  };
}

export default withRouter(connect(mapStateToProps)(Navigation));
