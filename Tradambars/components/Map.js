import React from 'react'; // will emit events that you can listen to
import {
  AppRegistry,
  Text,
  Button,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import geolib from 'geolib'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyBeq-n5fq_5T7rer0Xouc5HwABbhgnCRgI';
//let lightdata = 0;
const customStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];
const origin = { latitude: 43.58041799, longitude: 7.12510199 };
const destination = {
  latitude: 0,
  longitude: 0
};
let mode = "driving"
let clicked = false;


class Map extends React.Component {
  constructor(props) {
    super(props);
    destination = {
      latitude: this.props.navigation.state.params.coordinates.latitude,
      longitude: this.props.navigation.state.params.coordinates.longitude
    };

    this.state = {
      initialPosition: {
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      style: this.darkTheme(),
    };

  }
  watchID: ?number = null;


  componentDidMount() {
    // console.log(this.state)


    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA
      }

      this.setState({ initialPosition: initialRegion })
      this.setState({ markerPosition: initialRegion })

    },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000 })

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      if (geolib.getDistance(
        { latitude: lat, longitude: long },
        { latitude: destination.latitude, longitude: destination.longitude }
      ) <= 250) {
        lastRegion.latitudeDelta = 0.001
        lastRegion.longitudeDelta = 0.0001 * ASPECT_RATIO
      } else {
        lastRegion.latitudeDelta = LATITUDE_DELTA
        lastRegion.longitudeDelta = LONGITUDE_DELTA
      }

      this.setState({ initialPosition: lastRegion })
      this.setState({ markerPosition: lastRegion })

    })


  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);


  }


  darkTheme() {
    console.log("nightMode " + this.props.screenProps.nightMode);
    if (this.props.screenProps.nightMode) {
      return customStyle
    }
    else {
      return []
    }
  }

  _renderCancel() {
    if (this.props.screenProps.nightMode) {
      return (
        <Button title="Torche" style={{
          position: 'absolute',
          bottom: 0,
        }} onPress={() => {
          if (clicked)
            this.props.screenProps.torch.switchState(true);
          else
            this.props.screenProps.torch.switchState(false);
          clicked = !clicked;

        }} />
      );
    } else {
      return null;
    }
  }


  render() {
    console.log("ClearTheme " + !this.props.screenProps.nightMode);
    console.log("customstyle: " + this.darkTheme());
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={this.darkTheme()}
            region={this.state.initialPosition}
            showsUserLocation zoomEnabled={true}>
            <MapView.Marker coordinate={destination}>
              <View style={styles.radius}>
                <View style={styles.marker} />
              </View>
            </MapView.Marker>
            <MapViewDirections
              origin={{ latitude: this.state.initialPosition.latitude, longitude: this.state.initialPosition.longitude }}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              mode="driving"
            />
          </MapView>
        </View>
        {this._renderCancel()}
      </View>

    );


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  /*  container: { 
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     justifyContent: 'flex-end',
     alignItems: 'center',
   },*/
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    bottom: 0
  },
});

export default Map;