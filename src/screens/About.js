import React, {Component} from 'react';
import {global} from "../styles/GlobalStyles";
import {Container, Content, Icon, Text, View} from 'native-base'

export default class About extends Component {
    static navigationOptions = {
        drawerLabel: 'About',
        drawerIcon: ({tintColor}) => (
            <Icon
                type={"Entypo"}
                name={'text-document'}
                style={{color: tintColor, width: 38}}
            />
        ),
    };

    render() {
        return (
            <Content>
                <Container>
                    <View style={global.container}>
                        <Text>About App</Text>
                    </View>
                </Container>
            </Content>
        );
    }
};