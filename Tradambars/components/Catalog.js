import React from 'react';
const { width, height } = Dimensions.get('window');
import { StyleSheet, View, Image, Button, Dimensions, TouchableHighlight, Slider } from 'react-native';
import { Container, Card, CardItem, List, ListItem, Thumbnail, Text, Left, Body, Right, Icon } from 'native-base';
import geolib from 'geolib'
import Item from './Item';
const cards = [
  {
    name: 'Carambar Atomic',
    sellerImg: require('../res/atomic.jpg'),
    prodImg: require('../res/atomic.jpg'),
    city: "Draguignan",
    coordinates: { latitude: 43.537727, longitude: 6.464993 },
    price: "8€/g"

  },
  {
    name: 'Carambar Mystery',
    sellerImg: require('../res/mystery.jpg'),
    prodImg: require('../res/mystery.jpg'),
    city: "Cannes",
    coordinates: { latitude: 43.551337, longitude: 7.012585 },
    price: "6.5€/g"

  },
  {
    name: 'Carambar Barbapapa',
    sellerImg: require('../res/barbapapa.jpg'),
    prodImg: require('../res/barbapapa.jpg'),
    city: "Antibes",
    coordinates: { latitude: 43.581363, longitude: 7.127822 },
    price: "12€/g"

  },
  {
    name: 'Carambar Magicolor',
    sellerImg: require('../res/magicolor.jpg'),
    prodImg: require('../res/magicolor.jpg'),
    city: "Biot",
    coordinates: { latitude: 43.615826, longitude: 7.072725 },
    price: "10€/g"

  },
  {
    name: 'Carambar Atomic',
    sellerImg: require('../res/atomic.jpg'),
    prodImg: require('../res/atomic.jpg'),
    city: "Nice",
    coordinates: { latitude: 43.695936, longitude: 7.271436 },
    price: "8€/g"

  },
  {
    name: 'Carambar Mystery',
    sellerImg: require('../res/mystery.jpg'),
    prodImg: require('../res/mystery.jpg'),
    city: "Cannes",
    coordinates: { latitude: 43.551337, longitude: 7.012585 },
    price: "6.5€/g"

  },
  {
    name: 'Carambar Barbapapa',
    sellerImg: require('../res/barbapapa.jpg'),
    prodImg: require('../res/barbapapa.jpg'),
    city: "Antibes",
    coordinates: { latitude: 43.581363, longitude: 7.127822 },
    price: "12€/g"

  },
  {
    name: 'Carambar Magicolor',
    sellerImg: require('../res/magicolor.jpg'),
    prodImg: require('../res/magicolor.jpg'),
    city: "Biot",
    coordinates: { latitude: 43.615826, longitude: 7.072725 },
    price: "10€/g"

  },
  {
    name: 'Carambar Atomic',
    sellerImg: require('../res/atomic.jpg'),
    prodImg: require('../res/atomic.jpg'),
    city: "Nice",
    coordinates: { latitude: 43.695936, longitude: 7.271436 },
    price: "8€/g"

  },
  {
    name: 'Carambar Mystery',
    sellerImg: require('../res/mystery.jpg'),
    prodImg: require('../res/mystery.jpg'),
    city: "Cannes",
    coordinates: { latitude: 43.551337, longitude: 7.012585 },
    price: "6.5€/g"

  },
  {
    name: 'Carambar Barbapapa',
    sellerImg: require('../res/barbapapa.jpg'),
    prodImg: require('../res/barbapapa.jpg'),
    city: "Antibes",
    coordinates: { latitude: 43.581363, longitude: 7.127822 },
    price: "12€/g"

  },
  {
    name: 'Carambar Magicolor',
    sellerImg: require('../res/magicolor.jpg'),
    prodImg: require('../res/magicolor.jpg'),
    city: "Biot",
    coordinates: { latitude: 43.615826, longitude: 7.072725 },
    price: "10€/g"

  },
  {
    name: 'Carambar Atomic',
    sellerImg: require('../res/atomic.jpg'),
    prodImg: require('../res/atomic.jpg'),
    city: "Nice",
    coordinates: { latitude: 43.695936, longitude: 7.271436 },
    price: "8€/g"

  },
  {
    name: 'Carambar Mystery',
    sellerImg: require('../res/mystery.jpg'),
    prodImg: require('../res/mystery.jpg'),
    city: "Cannes",
    coordinates: { latitude: 43.551337, longitude: 7.012585 },
    price: "6.5€/g"

  },
  {
    name: 'Carambar Barbapapa',
    sellerImg: require('../res/barbapapa.jpg'),
    prodImg: require('../res/barbapapa.jpg'),
    city: "Antibes",
    coordinates: { latitude: 43.581363, longitude: 7.127822 },
    price: "12€/g"

  },
  {
    name: 'Carambar Magicolor',
    sellerImg: require('../res/magicolor.jpg'),
    prodImg: require('../res/magicolor.jpg'),
    city: "Biot",
    coordinates: { latitude: 43.615826, longitude: 7.072725 },
    price: "10€/g"

  },
  {
    name: 'Carambar Atomic',
    sellerImg: require('../res/atomic.jpg'),
    prodImg: require('../res/atomic.jpg'),
    city: "Nice",
    coordinates: { latitude: 43.695936, longitude: 7.271436 },
    price: "8€/g"

  },
  {
    name: 'Carambar Mystery',
    sellerImg: require('../res/mystery.jpg'),
    prodImg: require('../res/mystery.jpg'),
    city: "Cannes",
    coordinates: { latitude: 43.551337, longitude: 7.012585 },
    price: "6.5€/g"

  },
  {
    name: 'Carambar Barbapapa',
    sellerImg: require('../res/barbapapa.jpg'),
    prodImg: require('../res/barbapapa.jpg'),
    city: "Antibes",
    coordinates: { latitude: 43.581363, longitude: 7.127822 },
    price: "12€/g"

  },
  {
    name: 'Carambar Magicolor',
    sellerImg: require('../res/magicolor.jpg'),
    prodImg: require('../res/magicolor.jpg'),
    city: "Biot",
    coordinates: { latitude: 43.615826, longitude: 7.072725 },
    price: "10€/g"

  },

];

let clicked = false;

export default class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: 150,
      latitude: this.props.screenProps.latitude,
      longitude: this.props.screenProps.longitude,
      filtered_list: [],
      style: this.props.screenProps.style,
    }
  }

  componentDidMount() {
    this._refreshPosition();
    this._filterProducts();
    console.log("initlist " + this.state.filtered_list);
  }
  componentWillUnmount() {
  }

  _refreshPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.log(error)
      ,
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }


  _filterProducts() {
    let list = [];
    for (let item of cards) {
      let dist = geolib.getDistance(
        { latitude: this.state.latitude, longitude: this.state.longitude },
        { latitude: item.coordinates.latitude, longitude: item.coordinates.longitude }
      )
      if (dist <= this.state.radius * 1000) {
        list.push({ item: item, distance: dist });
      }
    }
    list.sort((a, b) => a.distance - b.distance);

    this.setState({ filtered_list: list });
    console.log("filteredlist " + this.state.filtered_list);

  }


  _renderItemsDay() {
    return (
      <View style={{ backgroundColor: '#ecf0f1', flex: 1 }}>
        <Text style={{ fontSize: 20, textAlign: 'center', margin: 10, }}>
          Chercher dans un rayon de {this.state.radius} km
        </Text>
        <Slider
          style={{ width: 300 }}
          step={1}
          minimumValue={0}
          maximumValue={150}
          value={this.state.radius}
          onValueChange={val => {
            this.setState({ radius: val })
            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log(position);
                this.setState({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
                console.log(this.state.latitude);
                console.log(this.state.longitude);
              },
              (error) => this.setState({ error: error.message }),
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
          }}
          onSlidingComplete={val => {
            this._filterProducts();
          }}
        />
        <List
          style={this.props.screenProps.style.containerScrollView}
          dataArray={this.state.filtered_list}
          renderRow={(prod) =>
            <TouchableHighlight
              style={this.props.screenProps.style.container}
              activeOpacity={1}>
              <Item nightMode={this.props.screenProps.nightMode} prod={prod} navigation={this.props.navigation} style={this.props.screenProps.style} />
            </TouchableHighlight>
          }>
        </List>
      </View>

    );
  }

  _renderItemsNight() {
    return (
      <View style={{ backgroundColor: '#301b70', flex: 1 }}>
        <Text style={{ fontSize: 20, textAlign: 'center', margin: 10, color: 'white' }}>
          Chercher dans un rayon de {this.state.radius} km
    </Text>
        <Slider
          style={{ width: 300, justifyContent: "center", alignSelf: "stretch" }}
          step={1}
          minimumValue={0}
          maximumValue={150}
          value={this.state.radius}
          onValueChange={val => {
            this.setState({ radius: val })
          }}
          onSlidingComplete={val => {
            this._refreshPosition()
            this._filterProducts()
          }}
        />
        <List
          style={this.props.screenProps.style.containerScrollView}
          dataArray={this.state.filtered_list}
          renderRow={(prod) =>
            <TouchableHighlight
              style={this.props.screenProps.style.container}
              activeOpacity={1}>
              <Item nightMode={this.props.screenProps.nightMode} prod={prod} navigation={this.props.navigation} style={this.props.screenProps.style} />
            </TouchableHighlight>
          }>
        </List>
      </View>

    );
  }

  render() {
    console.log("latitude " + this.state.latitude);
    return (
      this.props.screenProps.nightMode ? this._renderItemsNight() : this._renderItemsDay()
    );

  }
}
