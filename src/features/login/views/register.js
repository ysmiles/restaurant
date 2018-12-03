import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { registerLogin } from '../actions';

class Register extends Component {
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
      <div className="Register">
        <form onSubmit={this.onSubmit}>
          <Input type="text" name="username" placeholder="username" />
          <Input type="password" name="password" placeholder="password" />
          <Input type="text" name="firstname" placeholder="First Name" />
          <Input type="text" name="lastname" placeholder="Last Name" />
          <Input type="text" name="email" placeholder="email" />
          <button>Submit</button>
          <Link to="/login" style={{ float: 'right', padding: '15px' }}>
            Go back to login
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

Register.propTypes = {
  //   onRegister: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: userinfo => {
      dispatch(registerLogin(userinfo));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Register);
