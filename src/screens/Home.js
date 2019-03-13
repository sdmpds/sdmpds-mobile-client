import React, {Component} from 'react';
import {global} from "../Styles/GlobalStyles";
import {StyleSheet} from 'react-native';
import {Icon, Content, Container, View, Text, Button} from 'native-base'
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import geolocationStore from "../MobxStore/GeolocationStore";

export default class Home extends Component {
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

    render() {
        // geolocationStore.requestForLocalization().then( result => geolocationStore.setGeolocation(result)).catch( err => err)
        geolocationStore.getGeolocation();

        console.log(geolocationStore.geolocation)
        return (
            <Content>
                <Container>
                    <View style={global.container}>
                        <Text>Hello Agent 47</Text>
                        <Text> in </Text>
                        <Text>Simple, Distributed Mobile MonitoringSystem</Text>
                        <Text>Swipe right to start!</Text>
                    </View>
                </Container>
            </Content>
        );
    }
};