import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './login';
import Register from './register';

export default () => {
  return (
    <div className="login-page">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
};
