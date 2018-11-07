import React from 'react'; // will emit events that you can listen to
import Torch from 'react-native-torch';
import {
  StyleSheet,
  Navigator,
  AppRegistry,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';
import AppNavigator from './components/AppNavigator';
var mSensorManager = require('NativeModules').SensorManager;



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nightMode: false,
      latitude: 0,
      longitude: 0,
      style: stylesNormal
    }

  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000 },
    );
    let lightdata;
    mSensorManager.startLightSensor(1);
    let self = this;
    this.subscription = DeviceEventEmitter.addListener('LightSensor', function (data) {
      lightdata = data.light;
      console.log("--- " + lightdata);
      if (lightdata < 45 && self.state.nightMode == false) {
        self.setState({ nightMode: true });
        self.setState({ style: stylesNight });
      }
      else if (lightdata >= 45 && self.state.nightMode == true) {
        self.setState({ nightMode: false });
        Torch.switchState(false);
        self.setState({ style: stylesNormal });

      }
      else {
      }

    });
  }

  componentWillUnmount() {
    mSensorManager.stopLightSensor();
    this.subscription.remove();
  }

  renderStyle() {
    return this.state.nightMode ? stylesNight : stylesNormal;
  }


  render() {
    console.log(this.state.nightMode);


    return (
      <AppNavigator
        screenProps={{
          nightMode: this.state.nightMode,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          torch: Torch,
          style: this.renderStyle()
        }} />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const stylesNight = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  containerScrollView: {
    padding: 8,
    paddingTop: 4,
    backgroundColor: '#212757',

  },
  view: {
    height: 64,
    flexDirection: 'row',
    backgroundColor: '#80D8FF',
  },

  infoView: {
    marginHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
  },

  prodName: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },

  cityAndPriceText: {
    fontSize: 12,
    fontWeight: '600',
    paddingTop: 3
  },

  city: {
    color: '#a0a0a7',
  },

  price: {
    color: 'white',
  },
  buyButton: {
    backgroundColor: '#6a52b3',
    justifyContent: "center",
    alignSelf: "center",
    textAlignVertical: "center"
  }
});

const stylesNormal = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  containerScrollView: {
    padding: 8,
    paddingTop: 4,
  },
  view: {
    height: 64,
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
  },

  infoView: {
    marginHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
  },

  prodName: {
    color: '#4e4e55',
    fontWeight: '500',
    fontSize: 15,
  },

  cityAndPriceText: {
    fontSize: 12,
    fontWeight: '600',
    paddingTop: 3
  },

  city: {
    color: '#a0a0a7',
  },

  price: {
    color: '#cbcbd1',
  },
  buyButton: {
    backgroundColor: '#07182a',
    justifyContent: "center",
    alignSelf: "stretch",
    textAlignVertical: "center"
  }
});
