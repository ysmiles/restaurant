import React from 'react';
import { connect } from 'react-redux';

import { view as Order } from '../../order';
import fetchApi from '../../../modules/fetch-api';

class Userdetails extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { user } = this.props;
    return <div className="Userdetails">{JSON.stringify(user)}</div>;
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
    updateUserdetails: item => {
      dispatch({ type: 'USER/UPDATE', payload: item });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Userdetails);
