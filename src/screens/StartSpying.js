import React, {Component} from 'react';
import {CameraRoll, Platform, StyleSheet, TouchableHighlight} from 'react-native';
import {Container, Fab, Icon, Text, View, CheckBox} from "native-base";
import ButtonWithData from "../components/ButtonWithData";
import {RNCamera} from "react-native-camera";
import cameraStore from "../MobxStore/CameraStore";
import {observer} from "mobx-react";
import {global} from 'src/Styles/GlobalStyles'
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import geolocationStore from "../MobxStore/GeolocationStore";


@observer export default class StartSpying extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setInterval: false,
            intervalTime: 1000,
            visible: false,
        }
    }
    camera = true;
    intervalID = 0;

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

    onIntervalChange(value) {
        if (value === 0) {
            cameraStore.setInterval(false);
            cameraStore.setIntervalTime(value)
        }
        else {
            cameraStore.setInterval(true);
            cameraStore.setIntervalTime(value)
        }
    }

    takePicture = async () => {
        if (this.camera) {
            const options = {quality: 0.5, base64: true};
            const data = await this.camera.takePictureAsync(options);
            await CameraRoll.saveToCameraRoll(data.uri);
            cameraStore.setStatistics(data.uri)
        }
    };

    tmp = () => {
        console.log("Pstrykam fotki z interwałem", cameraStore.cameraAtributes.intervalTime)
    };


    componentWillUpdate() {
        let {interval, intervalTime} = cameraStore.cameraAtributes;
        if (interval) {
            if (this.intervalID) {
                clearInterval(this.intervalID);
                if (Platform.OS === 'ios') {
                    this.intervalID = setInterval(this.tmp, intervalTime)
                }
                else {
                    this.intervalID = setInterval(this.takePicture.bind(this), intervalTime)
                }
            }
            else {
                if (Platform.OS === 'ios') {
                    this.intervalID = setInterval(this.tmp, intervalTime)
                }
                else {
                    this.intervalID = setInterval(this.takePicture.bind(this), intervalTime)
                }
            }
        }
        else {
            clearInterval(this.intervalID)
        }
    }

    render() {
        let {intervalTime} = cameraStore.cameraAtributes;

        return (
            <Container style={{backgroundColor: 'black'}}>
                <View style={{flex: 0.5}}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={cameraStore.cameraAtributes.flash.mode}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                    />

                </View>
                <TouchableHighlight
                    onPress={this.takePicture.bind(this)}
                    style={styles.capture}

                >
                    <Icon
                        style={{color: 'white'}}
                        name={'circle'}
                        type={'Entypo'}
                    />
                </TouchableHighlight>


                <View style={{flex: 0.5}}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        initialRegion={geolocationStore.geolocation.actualPosition}
                    >
                        {
                            geolocationStore.geolocation.fetched === true ?
                                <Marker
                                    coordinate={geolocationStore.geolocation.actualPosition}
                                />
                                :
                                null
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
                            <ButtonWithData
                                onValueChange={this.onIntervalChange}
                                selected={intervalTime}
                                description={"Set Interval Time:"}
                                items={[
                                    {
                                        label: "Off",
                                        value: 0
                                    },
                                    {
                                        label: "1000ms",
                                        value: 1000
                                    },
                                    {
                                        label: "3000ms",
                                        value: 3000
                                    },
                                    {
                                        label: "5000ms",
                                        value: 5000
                                    },
                                    {
                                        label: "10 000ms",
                                        value: 10000
                                    }
                                ]}
                            />

                            {
                                //TODO: Flash button does not work correctly.
                            }
                            <ButtonWithData
                                description={"Flash mode:"}
                                items={
                                    [
                                        {
                                            label: "Off",
                                            value: RNCamera.Constants.FlashMode.off
                                        },
                                        {
                                            label: "On",
                                            value: RNCamera.Constants.FlashMode.on
                                        }
                                    ]}
                                onValueChange={() => cameraStore.setFlesh()}
                                selected={cameraStore.cameraAtributes.flash.boolean}
                            />

                        </View>
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