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
    let searchContent = '';
    return (
      <div className="Searchbar" style={{ padding: 30 }}>
        <SearchBar
          onChange={value => {
            // console.log("onChange: " + value);
            searchContent = value;
          }}
          onRequestSearch={() =>
            console.log('onRequestSearch: ' + searchContent)
          }
          style={{
            margin: '0 auto',
            maxWidth: 800
          }}
        />
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
