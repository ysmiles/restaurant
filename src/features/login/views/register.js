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
    console.log(JSON.stringify(values));
    let registerinfo = values;
    const { changeLoginStatus, updateUser } = this.props;

    fetchApi('post', '/api/user', registerinfo)
      .then(json => {
        console.log(JSON.stringify(json));
        if (json.customer_id > 0) {
          changeLoginStatus({ status: true, id: json.customer_id });
          updateUser(json);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  refInput() {}

  render() {
    const { history, login, user } = this.props;

    return (
      <div className="Register">
        {user.customer_id ? history.push('/' + user.first_name) : ''}
        <RegisterForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

Register.propTypes = {
  //   onRegister: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  login: state.login
});

const mapDispatchToProps = dispatch => {
  return {
    changeLoginStatus: newStatus => {
      dispatch({ type: 'LOGIN_STATUS', payload: newStatus });
    },
    updateUser: userDetails => {
      dispatch({ type: 'USER/UPDATE', payload: userDetails });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
