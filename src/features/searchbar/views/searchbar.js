import React from 'react';
import { connect } from 'react-redux';
import SearchBar from 'material-ui-search-bar';

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
      <div className="Searchbar">
        <SearchBar
          onChange={() => console.log('onChange')}
          onRequestSearch={() => console.log('onRequestSearch')}
          style={{
            margin: '0 auto',
            maxWidth: 800
          }}
        />
        {/* <br />
        <br /> */}
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
