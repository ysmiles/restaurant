import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { submitLogin } from "../actions";

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
    this.refInput = this.refInput.bind(this);
  }

  onSubmit(ev) {
    ev.preventDefault();
    // do something
  }

  refInput() {}

  render() {
    return (
      <div>
        <Logo />
        <form onSubmit={this.onSubmit}>
          <Input type="text" name="username" placeholder="username" />
          <Input type="password" name="password" placeholder="password" />
          <button>Sign In</button>
        </form>
      </div>
    );
  }
}

class Input extends Component {
  render() {
    return (
      <div className="Input">
        <input
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          required
          autocomplete="false"
        />
        <label for={this.props.name} />
      </div>
    );
  }
}

const Logo = () => {
  return (
    <div className="logo">
      <span>This is the logo</span>
    </div>
  );
};

Login.propTypes = {
  // onLogin: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: userinfo => {
      dispatch(submitLogin(userinfo));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
