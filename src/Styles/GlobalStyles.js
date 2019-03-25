import {StyleSheet} from 'react-native'

export const buttonColor = '#2B2B2B';

export const global = StyleSheet.create({
    container: {
        //flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button:{
        backgroundColor: buttonColor,
    },

    preview: {
        flex: 0.5,
    },
    capture: {
        backgroundColor: buttonColor,
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});