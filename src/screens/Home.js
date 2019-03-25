import React, {Component} from 'react';
import {global} from "../Styles/GlobalStyles";
import {ImageBackground, StatusBar} from 'react-native'
import {Container, Icon, Input, View, Item, Button, Form, Label} from 'native-base'
import geolocationStore from "../MobxStore/GeolocationStore";
import DeviceInfo from "react-native-device-info";
import userStore from "../MobxStore/UserStore";
import wallpaper from 'src/images/wallpaper.jpg'
import Text from 'src/components/Text'

export default class Home extends Component {
    state = {
        name: "",
        disabled: false
    }

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({tintColor}) => (
            <Icon
                type={"Entypo"}
                name={'home'}
                style={{color: tintColor, width: 38}}
            />
        ),
    };

    _onPress() {
        this.setState({disabled: true}, () => userStore.setName(this.state.name))
    };

    componentWillMount() {
        const id = DeviceInfo.getUniqueID();
        userStore.setId(id)
    }


    render() {
        console.log(this.state)
        geolocationStore.getGeolocation();
        return (
            <Container>
                <StatusBar hidden/>
                <ImageBackground
                    source={wallpaper}
                    style={{width: '100%', height: '100%'}}
                    resizeMode='cover'
                >
                    <View style={[global.container, {flex: 0.5}]}>
                        <Text>Hello Agent</Text>
                        <Text> in </Text>
                        <Text>Simple, Distributed Mobile MonitoringSystem</Text>
                        <Text>Enter name and swipe right to start!{'\n'}</Text>
                        <Text>Your device unique id:</Text>
                        <Text style={{fontWeight: 'bold'}}>{userStore.id}</Text>
                    </View>

                    <View style={{justifyContent: 'flex-end', flex:0.8, marginBottom: '15%'}}>
                        <Item style={{padding: 5}}>
                            <Label style={{color: "white"}}>Your name:</Label>
                            <Input
                                style={{color: "white"}}
                                placeholder={"Type here..."}
                                onChangeText={(name) => {
                                    this.setState({name})
                                }}
                                disabled={this.state.disabled}
                            />
                        </Item>
                        <Button
                            full
                            style={global.button}
                            onPress={() => this._onPress()}
                            disabled={this.state.disabled}
                        >
                            <Text>OK</Text>
                        </Button>
                    </View>
                </ImageBackground>
            </Container>
        );
    }
};

