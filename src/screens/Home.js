import React, {Component} from 'react';
import {global} from "../styles/GlobalStyles";
import {ImageBackground, StatusBar, NetInfo} from 'react-native'
import {Container, Icon, Input, View, Item, Button, Form, Label} from 'native-base'
import geolocationStore from "../stores/GeolocationStore";
import DeviceInfo from "react-native-device-info";
import userStore from "../stores/UserStore";
import wallpaper from 'src/images/wallpaper.jpg'
import faker from 'faker'
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
        this.props.navigation.navigate("Spy")
    };

    componentWillMount() {
        const id = DeviceInfo.getUniqueID();
        userStore.setId(id)
    }


    render() {
        const disabled = this.state.disabled;
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
                        <Item style={{padding: 5}} success={disabled} error={!disabled}>
                            <Label style={{color: "white"}}>Your codename:</Label>
                            <Input
                                style={{color: "white"}}
                                placeholder={"Type here..."}
                                onChangeText={(name) => {
                                    this.setState({name})
                                }}
                                disabled={disabled}
                                value={this.state.name}
                            />
                            <Button
                                onPress={() => this.setState({name: faker.name.firstName()+faker.random.number(99)})}
                                transparent
                                disabled={disabled}
                            >
                                <Text>Generate</Text>
                            </Button>
                        </Item>
                        <Button
                            transparent
                            full
                            onPress={() => this._onPress()}
                            disabled={disabled}
                        >
                            <Text>OK</Text>
                        </Button>
                    </View>
                </ImageBackground>
            </Container>
        );
    }
};

