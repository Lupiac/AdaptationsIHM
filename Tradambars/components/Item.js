import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Thumbnail, Text } from 'native-base';
export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prodImg: this.props.prod.item.prodImg,
            name: this.props.prod.item.name,
            city: this.props.prod.item.city,
            price: this.props.prod.item.price,
            distance: this.props.prod.distance,
            coordinates: this.props.prod.item.coordinates,
            style: this.props.style
        }

    }

    render() {
        return (
            <View >
                <View style={this.state.style.view}>
                    <Thumbnail square source={this.state.prodImg} />
                    <View style={this.state.style.infoView}>
                        <Text style={this.state.style.prodName} numberOfLines={1}>{this.state.name}</Text>
                        <Text style={this.state.style.cityAndPriceText} numberOfLines={1}>
                            <Text style={this.state.style.city}>{this.state.city}</Text>
                            <Text style={this.state.style.price}> {this.state.price}</Text>
                        </Text>
                        <Text style={this.state.style.price}> {this.state.distance} m</Text>
                    </View>
                    <Button style={this.state.style.buyButton} title="Acheter" onPress={() => {
                        this.props.navigation.navigate('Map', { coordinates: this.state.coordinates })
                    }} />
                </View>

            </View>
        );
    }
}
