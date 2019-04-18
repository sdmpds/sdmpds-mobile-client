import * as React from 'react'
import {Text, View} from 'native-base';
import userStore from "../stores/UserStore";
import {observer} from "mobx-react";
import {Animated, Easing} from 'react-native'

@observer export default class ConnectionBar extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            visible: true,
            fadeIn : new Animated.Value(0),
            fadeOut: new Animated.Value(100)
        };
    }

    _showGreenStatus() {
        this._fadeIn()
            return (
                <Animated.View
                    style={[
                        {backgroundColor: "green", alignItems: 'center'},
                        {transform: [{translateY: this.state.fadeIn}]}
                    ]}
                >
                    <Text style={{color: 'white'}}>Connected!</Text>
                </Animated.View>
            )
    }

    _fadeIn(){
        Animated.spring(this.state.fadeIn, {
            toValue: 100,
            delay: 4000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }

    _fadeOut(){
        Animated.spring(this.state.fadeOut, {
            toValue: 0,
            delay: 4000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }


    render() {
        if (userStore.connection !== 200) {
            this._fadeOut()
            return (
                <Animated.View
                    style={[{
                        backgroundColor: "red", alignItems: 'center'
                    },
                        {transform: [{translateY: this.state.fadeOut}]}
                    ]}
                    >
                    <Text style={{color: 'white'}}>No connection</Text>
                </Animated.View>
            )
        }
        else {
            return this._showGreenStatus()
        }
    }
};