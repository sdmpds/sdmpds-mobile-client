import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer, DrawerItems} from 'react-navigation'
import React from 'react';
import {Alert, Image} from 'react-native'
import {Container, View} from 'native-base'
import agent from 'src/images/agent.png'
import Home from 'src/screens/Home'
import About from "../screens/About";
import StartSpying from "../screens/StartSpying";
import userStore from "../stores/UserStore";

const nameNotSet = (props) => {
    Alert.alert("Agent!", "Type your codename!")
    props.navigation.closeDrawer()
}

const CustomDrawer = (props) => (
    <Container style={{backgroundColor: "rgba(216, 216, 216, 0.3)"}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={agent}
                   resizeMode={'cover'}
            />
        </View>
        <View>
            <DrawerItems
                {...props}
                onItemPress={(route) => {
                    route.route.key === "Spy" && userStore.name === undefined ?
                        nameNotSet(props)
                        :
                        props.navigation.navigate(route.route.key)
                }}
            />
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