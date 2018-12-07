import React from 'react';
import { connect } from 'react-redux';

import { view as Order } from '../../order';

class User extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
    this.refInput = this.refInput.bind(this);
  }

  onSubmit(event) {
    // event.preventDefault();
    // do something
  }

  refInput() {}

  render() {
    return (
      <div className="User">
        <h3>This is the title</h3>
        This is the content
        <Order />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { entry: state.entry };
}

function mapDispatchToProps(dispatch) {
  return {
    propsFunction: item => {
      dispatch({ type: 'ACTION_TYPE', payload: item });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
