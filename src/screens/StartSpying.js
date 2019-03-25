import React, {Component} from 'react';
import {CameraRoll, Platform, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Container, Fab, Icon, Text, View, CheckBox} from "native-base";
import ButtonWithData from "../components/ButtonWithData";
import {RNCamera} from "react-native-camera";
import cameraStore from "../MobxStore/CameraStore";
import {observer} from "mobx-react";
import {global} from 'src/Styles/GlobalStyles'
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import geolocationStore from "../MobxStore/GeolocationStore";
import pinStore, {AskPin, Pin} from '../MobxStore/PinStore'
import * as R from 'ramda'
import userStore from "../MobxStore/UserStore";
import Camera from "../components/Camera";

@observer export default class StartSpying extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setInterval: false,
            intervalTime: 1000,
            visible: false,
            region: {}
        }
    }

    static navigationOptions = {
        drawerLabel: 'Start Spying!',
        drawerIcon: ({tintColor}) => (
            <Icon
                type={"Entypo"}
                name={'camera'}
                style={{color: tintColor, width: 38}}
            />
        ),
    };

    picReturned = (data) => {
        cameraStore.setStatistics(data.uri);
        const pin = new Pin(this.state.region, userStore.name, userStore.id, "green", data.uri);
        pinStore.pins.push(pin);
        console.log(pinStore.pins)
    };

    componentWillMount() {
        this.setState({region: geolocationStore.geolocation.actualPosition})
    }


    _userLocationChange(object) {
        console.log({...this.state.region, latitude: object.latitude, longitude: object.longitude})
        this.setState({region: {...this.state.region, latitude: object.latitude, longitude: object.longitude}})
    }

    _askPin = (coordinates) => {
        Alert.alert(
            "Confirm!", "Do you want to ask for help?",
            [
                {
                    text: 'Yeeaah', onPress: () => {
                        const pin = new AskPin({
                            ...coordinates, latitudeDelta: 0,
                            longitudeDelta: 0
                        });
                        pinStore.askPins.push(pin);
                    }
                },
                {
                    text: 'Nope',
                    style: 'cancel',
                },
            ],
        )
    };


    render() {
        return (
            <Container style={{backgroundColor: 'black'}}>
                <View style={{flex: 0.5}}>
                    <Camera
                        picReturned={this.picReturned}
                    />

                </View>
                <View style={{flex: 0.5}}>
                    <MapView
                        provider={"google"}
                        style={styles.map}
                        initialRegion={this.state.region}
                        onUserLocationChange={(event) => this._userLocationChange({
                            latitude: event.nativeEvent.coordinate.latitude,
                            longitude: event.nativeEvent.coordinate.longitude
                        })}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        loadingEnabled={true}
                        onLongPress={(event) => this._askPin(event.nativeEvent.coordinate)}
                    >
                        {
                            pinStore.fetched === true ?
                                R.map((pin, index) =>
                                        <Marker
                                            key={index}
                                            onPress={() =>
                                                Alert.alert(
                                                    "Informations",
                                                    "Date:" + pin.time.toLocaleDateString("en-US", {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        second: "2-digit"
                                                    }) + '\n'
                                                    + "Name: " + pin.name + '\n'
                                                    + "Person recognized:" + pin.recognized)}
                                            title={pin.name}
                                            description={pin.recognized.toString()}
                                            coordinate={pin.coordinates}
                                            pinColor={pin.color}
                                        />

                                    , pinStore.pins
                                )
                                :
                                null
                        }
                        {
                            R.map((askPin, index) =>
                                    <Marker key={index} coordinate={askPin.coordinates} title={"Can you Help?"} onPress={()=>{}}>
                                        <Icon type="AntDesign" name={"question"}/>
                                    </Marker>
                                , pinStore.askPins
                            )
                        }
                    </MapView>
                </View>

                <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({visible: false});
                    }}
                >

                    <DialogContent style={{flex: 0.7, minWidth: '90%'}}>
                        <View style={global.container}>
                            <Text> Informations: </Text>
                            <Text>Photos taken: {cameraStore.counter}</Text>
                            <Text>URI: {cameraStore.statistics.uri}</Text>
                        </View>
                    </DialogContent>
                </Dialog>
                <Fab
                    active={this.state.active}
                    direction={'up'}
                    style={global.button}
                    position="bottomRight"
                    onPress={() => this.setState({visible: true})}
                >
                    <Icon name="plus" type={'AntDesign'} color={'white'}/>
                </Fab>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    preview: {
        flex: 0.5,
    },
    capture: {
        backgroundColor: '#2B2B2B',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});