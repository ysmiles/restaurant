import React from 'react';
import { connect } from 'react-redux';

import { view as Order } from '../../order';
import fetchApi from '../../../modules/fetch-api';

class User extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // const { login, updateUser } = this.props;
    // if (login.loginStatus) {
    // }
  }

  onSubmit(event) {
    // event.preventDefault();
    // do something
  }

  refInput() {}

  render() {
    const { user } = this.props;
    return (
      <div className="User">
        <h3>
          Hello, {user.first_name} {user.last_name}
        </h3>
        Here is your order:
        <Order />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: item => {
      dispatch({ type: 'USER/UPDATE', payload: item });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
