import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer, DrawerItems} from 'react-navigation'
import React from 'react';
import {Image} from 'react-native'
import {View, Button, Text, Container} from 'native-base'
import agent from 'src/images/agent.png'

import Home from 'src/screens/Home'
import About from "../screens/About";
import StartSpying from "../screens/StartSpying";


const CustomDrawer = (props) => (
    <Container>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={agent}
            resizeMode={'cover'}
            />
        </View>
        <View>
            <DrawerItems {...props}/>
        </View>
    </Container>
)


export const AppNavigator = createDrawerNavigator({
        Home: {
            screen: Home,
        },
        Spy: {
            screen: StartSpying
        },
        About: {
            screen: About
        },
    },
    {
        contentComponent: CustomDrawer
    });

export const AppContainer = createAppContainer(AppNavigator)