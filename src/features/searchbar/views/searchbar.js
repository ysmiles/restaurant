import React from 'react';
import { connect } from 'react-redux';
import SearchBar from 'material-ui-search-bar';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import fetchApi from '../../../modules/fetch-api';

const search = text => fetchApi('get', '/api/foods?search=' + text);

// delayed search onchange
const debouncedSearch = AwesomeDebouncePromise(search, 500);

class FeatureName extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(searchContent) {
    search(searchContent).then(json => {
      this.props.loadFoods(json);
    });
  }

  onChange = async searchContent => {
    const result = await debouncedSearch(searchContent);
    this.props.loadFoods(result);
  };

  render() {
    let searchContent = '';
    return (
      <div className="Searchbar" style={{ padding: 30 }}>
        <SearchBar
          onChange={value => {
            // console.log("onChange: " + value);
            searchContent = value;
            this.onChange(searchContent);
          }}
          onRequestSearch={() => {
            console.log('onRequestSearch: ' + searchContent);
            this.onSubmit(searchContent);
          }}
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
    loadFoods: foods => {
      dispatch({ type: 'LOAD_FOODS', payload: foods });
    },
    propsFunction: item => {
      dispatch({ type: 'ACTION_TYPE', payload: item });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeatureName);
