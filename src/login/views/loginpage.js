import React from 'react';
import Login from './login';
import Register from './register';
import { Switch, Route } from 'react-router-dom';
// import "./style.css";

export default () => {
  return (
    <div className="login-page">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        {/* <Route path="/register" component={Register} /> */}
      </Switch>
    </div>
  );
};
