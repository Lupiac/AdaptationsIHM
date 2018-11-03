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
      longitude: 0
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 },
    );
    let lightdata;
    mSensorManager.startLightSensor(1);
    let self = this;
    this.subscription = DeviceEventEmitter.addListener('LightSensor', function (data) {
      lightdata = data.light;
      console.log("--- " + lightdata);
      if (lightdata < 45 && self.state.nightMode == false) {
        self.setState({ nightMode: true });
      }
      else if (lightdata >= 45 && self.state.nightMode == true) {
        self.setState({ nightMode: false });
        Torch.switchState(false);
      }
      else {
      }
    });
  }

  componentWillUnmount(){
    mSensorManager.stopLightSensor();
    this.subscription.remove();
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

