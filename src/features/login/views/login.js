import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import { submitLogin } from '../actions';
import fetchApi from '../../../modules/fetch-api';

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
    this.refInput = this.refInput.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    let userinfo = {};
    formData.forEach((value, key) => {
      userinfo[key] = value;
    });

    console.log(JSON.stringify(userinfo));

    fetchApi('post', 'address', userinfo)
      .then(json => {
        if (json.errors) {
          this.props.toggleLoginStatus(false);
          throw 'log in failed';
        }
        this.props.toggleLoginStatus(true);
      })
      .catch(error => {
        console.log(error);
      });
  }

  refInput() {}

  render() {
    return (
      <div className="Login">
        <Logo />
        <form onSubmit={this.onSubmit}>
          <Input type="text" name="username" placeholder="username" />
          <Input type="password" name="password" placeholder="password" />
          <button type="submit">Sign In</button>
          <Link to="/register" style={{ float: 'right', padding: '15px' }}>
            Register
          </Link>
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
    <div className="Logo">
      <span>This is the logo</span>
    </div>
  );
};

Login.propTypes = {
  // onLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: userinfo => {
      dispatch(submitLogin(userinfo));
    },
    toggleLoginStatus: statusWant => {
      dispatch({ type: 'LOGIN_STATUS', payload: statusWant });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
