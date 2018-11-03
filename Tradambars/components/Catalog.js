import React from 'react';
const { width, height } = Dimensions.get('window');
import { StyleSheet, View, Image, Button, Dimensions, TouchableHighlight, Slider } from 'react-native';
import { Container, Card, CardItem, List, ListItem, Thumbnail, Text, Left, Body, Right, Icon } from 'native-base';
import geolib from 'geolib'
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
      filtered_list: cards,
    }
  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }

  _filterProducts() {
    let list = [];
    for (let item of cards) {

      if (geolib.getDistance(
        { latitude: this.state.latitude, longitude: this.state.longitude },
        { latitude: item.coordinates.latitude, longitude: item.coordinates.longitude }
      ) <= this.state.radius * 1000) {
        list.push(item);
      }
    }
    this.setState({ filtered_list: list });
  }


  _renderItemsDay() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
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
          style={stylesNormal.containerScrollViewNormal}
          dataArray={this.state.filtered_list}
          renderRow={(item) =>
            <TouchableHighlight
              style={stylesNormal.containerNormal}
              activeOpacity={1}>
              <View>
                <View style={stylesNormal.viewNormal}>
                  <Thumbnail square source={item.prodImg} />
                  <View style={stylesNormal.infoViewNormal}>
                    <Text style={stylesNormal.prodNameNormal} numberOfLines={1}>{item.name}</Text>
                    <Text style={stylesNormal.cityAndPriceTextNormal} numberOfLines={1}>
                      <Text style={stylesNormal.cityNormal}>{item.city}</Text>
                      <Text style={stylesNormal.priceNormal}> {item.price}</Text>
                    </Text>
                  </View>
                  <Button style={stylesNormal.buyButton} title="Acheter" onPress={() => {
                    this.props.navigation.navigate('Map', { coordinates: item.coordinates })
                  }} />
                </View>
              </View>
            </TouchableHighlight>
          }>
        </List>
      </View>

    );
  }

  _renderItemsNight() {
    return (
      <View style={{ backgroundColor: '#212757', flex: 1 }}>
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
          style={stylesNight.containerScrollViewNight}
          dataArray={this.state.filtered_list}
          renderRow={(item) =>
            <TouchableHighlight
              style={stylesNight.containerNight}
              activeOpacity={1}>
              <View >
                <View style={stylesNight.viewNight}>
                  <Thumbnail square source={item.prodImg} />
                  <View style={stylesNight.infoViewNight}>
                    <Text style={stylesNight.prodNameNight} numberOfLines={1}>{item.name}</Text>
                    <Text style={stylesNight.cityAndPriceTextNight} numberOfLines={1}>
                      <Text style={stylesNight.cityNight}>{item.city}</Text>
                      <Text style={stylesNight.priceNight}> {item.price}</Text>
                    </Text>
                  </View>
                  <Button style={stylesNormal.buyButton} title="Acheter" onPress={() => {
                    this.props.navigation.navigate('Map', { coordinates: item.coordinates })
                  }} />
                </View>

              </View>
            </TouchableHighlight>
          }>
        </List>
      </View>

    );
  }

  render() {
    return (
      this.props.screenProps.nightMode ? this._renderItemsNight() : this._renderItemsDay()
    );

  }
}

const stylesNormal = StyleSheet.create({
  containerNormal: {
    marginBottom: 8,
  },
  containerScrollViewNormal: {
    padding: 8,
    paddingTop: 4,
  },
  viewNormal: {
    height: 64,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },

  infoViewNormal: {
    marginHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
  },

  prodNameNormal: {
    color: '#4e4e55',
    fontWeight: '500',
    fontSize: 15,
  },

  cityAndPriceTextNormal: {
    fontSize: 12,
    fontWeight: '600',
    paddingTop: 3
  },

  cityNormal: {
    color: '#a0a0a7',
  },

  priceNormal: {
    color: '#cbcbd1',
  },
  buyButton: {
    backgroundColor: '#07182a',
    justifyContent: "center",
    alignSelf: "stretch",
    textAlignVertical: "center"
  }
});

const stylesNight = StyleSheet.create({
  containerNight: {
    marginBottom: 8,
  },
  containerScrollViewNight: {
    padding: 8,
    paddingTop: 4,
    backgroundColor: '#212757',

  },
  viewNight: {
    height: 64,
    flexDirection: 'row',
    backgroundColor: '#2a56a4',
  },

  infoViewNight: {
    marginHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
  },

  prodNameNight: {
    color: '#c2e8f1',
    fontWeight: '500',
    fontSize: 15,
  },

  cityAndPriceTextNight: {
    fontSize: 12,
    fontWeight: '600',
    paddingTop: 3
  },

  cityNight: {
    color: '#a0a0a7',
  },

  priceNight: {
    color: '#cbcbd1',
  },
  buyButton: {
    backgroundColor: '#07182a',
    justifyContent: "center",
    alignSelf: "stretch",
    textAlignVertical: "center"
  }
});
