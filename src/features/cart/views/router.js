import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Cartpage from './cartpage';

const Router = () => (
  <div>
    <Switch>
      <Route exact path="/cart" component={Cartpage} />
    </Switch>
  </div>
);

export default Router;
