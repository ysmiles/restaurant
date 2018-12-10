import React from 'react';
import { connect } from 'react-redux';

import GoogleMapReact from 'google-map-react';
import fetchApi from '../../../modules/fetch-api';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const theRoutes = [
  {
    travelMode: 'DRIVING',
    optimizeWaypoints: true,
    waypoints: [
      {
        location: 'SJSU',
        stopover: true
      },
      {
        location: 'santa clara university',
        stopover: true
      }
    ],
    origin: 'SJSU',
    destination: '890 coleman ave, san jose'
  },
  {
    travelMode: 'DRIVING',
    optimizeWaypoints: true,
    waypoints: [
      {
        location: 'SJSU',
        stopover: true
      },
      {
        location: 'Great Mall',
        stopover: true
      }
    ],
    origin: 'SJSU',
    destination: '1785 via flores, san jose'
  }
];

class FeatureName extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.onSubmit = this.onSubmit.bind(this);
    // this.refInput = this.refInput.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    fetchApi('get', '/api/routes').then(json => {
      this.routesToShow = json;
    });
  }
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
    zoom: 6,
    center: { lat: 37.3351874, lng: -121.88107 }
  };

  drawRoutes(routes, map, maps) {
    let directions = routes;
    let directionsService = new maps.DirectionsService();
    for (var j = 0; directions[j] != null; j++) {
      let directionsDisplay = new maps.DirectionsRenderer();
      directionsDisplay.setMap(map);
      directionsService.route(directions[j], function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          // window.alert("Directions request failed due to " + status);
        }
      });
    }
  }

  render() {
    const { mapStatus, updateMap } = this.props;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          // Put key at correct place
          bootstrapURLKeys={{ key: 'AIzaSyBHZ4j1ep4hI9TPqDMG1c9uJ_eNjoHwphQ' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => {
            this.drawRoutes(this.routesToShow, map, maps);
          }}
        >
          <AnyReactComponent
            lat={37.34}
            lng={-121.89}
            text={'My customized text'}
          />
        </GoogleMapReact>
        {/* {mapStatus.mapLoaded && (
          <Polyline map={mapStatus.map} maps={mapStatus.maps} />
        )} */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { mapStatus: state.mapStatus, user: state.user };
}

function mapDispatchToProps(dispatch) {
  return {
    updateMap: item => {
      dispatch({ type: 'MAP/UPDATE', payload: item });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeatureName);
