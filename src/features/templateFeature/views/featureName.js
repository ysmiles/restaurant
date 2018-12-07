import React from 'react';
import { connect } from 'react-redux';

class FeatureName extends React.Component {
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
      <div>
        <h3>This is the title</h3>
        This is the content
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
)(FeatureName);
