import React, {Component} from 'react';
import {Content, Container, Icon, Text, View} from 'native-base'
import MapView from "react-native-maps/lib/components/MapView";

export default class Maps extends Component {
    static navigationOptions = {
        drawerLabel: 'Localization',
        drawerIcon: ({tintColor}) => (
            <Icon
                type={"Entypo"}
                name={'home'}
                style={{color: tintColor, width: 38}}
            />
        ),
    };

    render() {
        return (
            <Content>
                <Container>

                        <MapView
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        />

                </Container>
            </Content>
        );
    }
};