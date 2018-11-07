import React from 'react';
import { StyleSheet, View, Button, DeviceEventEmitter } from 'react-native';
import { Thumbnail, Text } from 'native-base';
var mSensorManager = require('NativeModules').SensorManager;

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
            style: this.props.style,
            nightMode: this.props.nightMode
        }

    }

    componentDidMount() {
        let lightdata;
        mSensorManager.startLightSensor(1);
        let self = this;
        this.subscription = DeviceEventEmitter.addListener('LightSensor', function (data) {
            lightdata = data.light;
            if (lightdata < 45 && self.state.nightMode == false) {
                self.setState({ nightMode: true });
                self.setState({ style: stylesNight });
            }
            else if (lightdata >= 45 && self.state.nightMode == true) {
                self.setState({ nightMode: false });
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
