import React from 'react';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, } from 'native-base';
import {
  StyleSheet,
  View,
  Image,
  Navigator,
  FlatList
} from 'react-native';

const cards = [
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

  }
];


export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    console.log("props: " + this.props);
    this.state = {
      list: cards,
    }
    console.log("list: " + this.state.list);

  }

  _renderItems(item) {
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={item.sellerImg} />
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.city}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={item.prodImg} style={{ height: 100, width: null, flex: 1 }} />
        </CardItem>
        <CardItem>
          <Left>
            <Icon type="FontAwesome" name="dollar" style={{ color: '#ED4A6A' }} />
          </Left>
          <Body>
            <Text>{item.price}</Text>
          </Body>
          <Right>
            <Button title="Acheter" onPress={() => {
              this.props.navigation.navigate('Map', { coordinates: item.coordinates })
            }} />
          </Right>
        </CardItem>
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList>
          data={this.state.list}
          renderItem={({ item }) => this._renderItems(item)}
        </FlatList>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignSelf:'baseline',
  },
});

