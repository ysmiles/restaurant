// This is mainly for the static router

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { view as FoodListing } from './features/food-listing';
import { view as LoginModule } from './features/login';
import { view as Cart } from './features/cart';
import { view as Checkout } from './features/checkout';
import { view as Order } from './features/order';

const Router = () => (
  <Switch>
    <Route exact path="/" component={FoodListing} />
    <Route exact path="/cart" component={Cart} />
    <Route exact path="/checkout" component={Checkout} />
    <Route exact path="/login" component={LoginModule.login} />
    <Route exact path="/register" component={LoginModule.register} />
    {/* <Route path="/orders/:id" component={Order} /> */}
    <Route exact path="/orders" component={Order} />
  </Switch>
);

export default Router;
