import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

// import { submitLogin } from "../actions";
import fetchApi from '../../../modules/fetch-api';
import LoginForm from './loginform';

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
    this.refInput = this.refInput.bind(this);
  }

  onSubmit(values) {
    let userinfo = values;
    const { changeLoginStatus, updateUser, history } = this.props;

    // fetchApi("post", "/api/loginTrue.json", userinfo)
    fetchApi('get', '/api/loginTrue.json')
      .then(json => {
        changeLoginStatus(json);
        if (json.status) {
          fetchApi(
            'get',
            // "/api/user?customerId=" + json.id
            '/api/user.json'
          ).then(userDetails => {
            updateUser(userDetails);
            history.push('/' + userDetails.first_name);
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  refInput() {}

  render() {
    return (
      <div className="Login">
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

// class Input extends Component {
//   render() {
//     return (
//       <div className="Input">
//         <input
//           type={this.props.type}
//           name={this.props.name}
//           placeholder={this.props.placeholder}
//           required
//           autocomplete="false"
//         />
//         <label for={this.props.name} />
//       </div>
//     );
//   }
// }

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
)(Login);
