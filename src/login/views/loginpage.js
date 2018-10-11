import React from "react";
import Login from "./login";
import Register from "./register";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import "./style.css";

export default () => {
  return (
    <Router>
      <div className="loginpage">
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  );
};
