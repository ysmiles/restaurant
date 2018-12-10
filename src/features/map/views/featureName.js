import React from 'react';
import { connect } from 'react-redux';

import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class FeatureName extends React.Component {
  // constructor(props, context) {
  //   super(props, context);

  //   this.onSubmit = this.onSubmit.bind(this);
  //   this.refInput = this.refInput.bind(this);
  // }

  // onSubmit(event) {
  //   // event.preventDefault();
  //   // do something
  // }

  // refInput() {}

  // render() {
  //   return (
  //     <div>
  //       <h3>This is the title</h3>
  //       This is the content
  //     </div>
  //   );
  // }
  static defaultProps = {
    center: {
      lat: 37.34,
      lng: -121.89
    },
    zoom: 12
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '50%' }}>
        <GoogleMapReact
          // Put key at correct place
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={37.34}
            lng={-121.89}
            text={'My customized text'}
          />
        </GoogleMapReact>
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
