import React from 'react';
import { NavLink } from 'react-router-dom';

import Router from './Router';
// this Router is a router example, login has its own route part
import { view as Login } from './login/';

const Navigation = props => (
  <nav>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/cart">Cart</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  </nav>
);

function App() {
  return (
    <div className="page-container">
      <h1>Restaurant platform</h1>
      <Navigation />
      <Router />
      <Login />
    </div>
  );
}

export default App;
