import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { registerLogin } from '../actions';
import RegisterForm from './registerform';
import fetchApi from '../../../modules/fetch-api';

class Register extends Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
    this.refInput = this.refInput.bind(this);
  }

  onSubmit(values) {
    console.log(values);
    let registerinfo = values;

    fetchApi('post', 'address', registerinfo)
      .then(json => {
        if (json.errors) {
          this.props.toggleLoginStatus(false);
          throw 'register failed';
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
      <div className="Register">
        <RegisterForm onSubmit={this.onSubmit} />
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
