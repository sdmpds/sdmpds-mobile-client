import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, Fab, Icon, Text, View} from "native-base";
import cameraStore from "../stores/CameraStore";
import {observer} from "mobx-react";
import {global} from 'src/styles/GlobalStyles'
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import geolocationStore from "../stores/GeolocationStore";
import pinStore from '../stores/PinStore'
import NewMarker from 'src/models/NewMarker'
import AskMarker from 'src/models/AskMarker'
import * as R from 'ramda'
import Camera from "../components/Camera";
import moment from "moment"
import Loading from "../components/Loading";
import userStore from "../stores/UserStore";
import ConnectionBar from 'src/components/ConnectionBar'

@observer export default class StartSpying extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setInterval: false,
            intervalTime: 1000,
            visible: false,
            userPosition: {},
            loading: true,
            statusBar: false
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

    _userLocationChange(object) {
        this.setState({
            userPosition: {
                ...this.state.userPosition,
                latitude: object.latitude,
                longitude: object.longitude
            }
        })
    }

    _handleCenter = () => {
        const {latitude, longitude, latitudeDelta, longitudeDelta} = this.state.userPosition;
        this.map.animateToRegion({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        })
    }

    _picReturned = async (data) => {
        const marker = new NewMarker(this.state.userPosition, data.base64);
        pinStore.pendingMarkers.push(marker);
        await pinStore.postMyMarker(marker);
        cameraStore.setStatistics(data.uri);
    };

    _askPin = (coordinates) => {
        const askmarker = new AskMarker({...coordinates, latitudeDelta: 0, longitudeDelta: 0}, 'Ask');
        pinStore.askMarkers.push(askmarker);
        Alert.alert(
            "Confirm!", "Do you want to ask for help?",
            [
                {
                    text: 'Yeeaah', onPress: async () => {
                        await pinStore.postAskMarker(askmarker)
                    }
                },
                {
                    text: 'Nope',
                    style: 'cancel',
                    onPress: () => pinStore.askMarkers.pop()
                },
            ],
        )
    };



    componentDidMount() {
        setTimeout(() => this.setState({loading: false}), 400);
        this.timer = setInterval(() => pinStore.getMarkers(), 5000)
    }


    componentWillMount() {
        this.setState({userPosition: geolocationStore.geolocation.fetchedPosiotion})
    }

    render() {
        if (!this.state.loading) {
            return (
                <Container style={{backgroundColor: 'black'}}>
                    <View style={{flex: 0.5}}>
                        <Camera
                            picReturned={this._picReturned}
                        />

                    </View>
                    <ConnectionBar/>
                    <View style={{flex: 0.5}}>
                        <MapView
                            ref={map => {
                                this.map = map
                            }}
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            initialRegion={this.state.userPosition}
                            onUserLocationChange={(event) => this._userLocationChange({
                                latitude: event.nativeEvent.coordinate.latitude,
                                longitude: event.nativeEvent.coordinate.longitude
                            })}
                            userLocationAnnotationTitle={"You"}
                            showsUserLocation={true}
                            followsUserLocation={true}
                            loadingEnabled={true}
                            onLongPress={(event) => this._askPin(event.nativeEvent.coordinate)}
                        >
                            {
                                R.map((marker, index) =>
                                        <Marker
                                            key={index}
                                            title={marker.name}
                                            description={"Recognized:" + '\n' + marker.date}
                                            coordinate={marker.coordinates}
                                            pinColor={R.identical(marker.deviceId, userStore.id) ? "green" : "red"}
                                        >
                                            <Callout onPress={() =>
                                                Alert.alert(
                                                    "Informations",
                                                    "Date:" + moment(marker.date).fromNow() + '\n'
                                                    + "Name: " + marker.name + '\n'
                                                    + "Person recognized:" + marker.recognized)
                                            }
                                            >
                                                <Text>Name: {marker.name}</Text>
                                                <Text>Date: {moment(marker.date).fromNow()}</Text>
                                                <Text>Recognized: {marker.recognized}</Text>
                                            </Callout>
                                        </Marker>

                                    , pinStore.receivedMarkers
                                )
                            }
                            {
                                R.map((marker, index) =>
                                        <Marker
                                            key={index}
                                            title={marker.name}
                                            description={"Date:" + marker.date}
                                            coordinate={marker.coordinates}
                                            pinColor={'orange'}
                                        >
                                            <Callout onPress={() =>
                                                Alert.alert(
                                                    "Informations",
                                                    "Date:" + moment(marker.date).fromNow() + '\n'
                                                    + "Name: " + marker.name + '\n')}
                                            >
                                                <Text>Name: {marker.name}</Text>
                                                <Text>Date: {moment(marker.date).fromNow()}</Text>
                                                <Text>Status: PENDING</Text>
                                            </Callout>
                                        </Marker>

                                    , pinStore.pendingMarkers
                                )
                            }

                            {
                                R.map((askMarker, index) =>
                                        <Marker key={index}
                                                coordinate={askMarker.coordinates}
                                                title={"Can you Help?"}
                                                description={moment(askMarker.date).fromNow() + '\n' + 'Name: ' + askMarker.name}>
                                            <Icon type="AntDesign" name={"question"}/>
                                        </Marker>
                                    , pinStore.askMarkers
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
                        style={[global.button, {bottom: 65}]}
                        position="bottomRight"
                        onPress={() => this._handleCenter()}
                    >
                        <Icon
                            name="md-locate"
                            type="Ionicons"
                            style={{
                                color: "white",
                            }}
                        />
                    </Fab>
                    <Fab
                        active={this.state.active}
                        direction={'up'}
                        style={global.button}
                        position="bottomRight"
                        onPress={() => this.setState({visible: true})}
                    >
                        <Icon name="plus" type={'AntDesign'}/>
                    </Fab>
                </Container>
            );
        }
        else {
            return <Loading/>
        }
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