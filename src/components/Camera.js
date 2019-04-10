import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Button, Icon} from 'native-base'
import { withNavigationFocus } from "react-navigation";
import FloatButton from "./FloatButton";
import Loading from "./Loading";

class Camera extends Component {
    state = {
        flash: RNCamera.Constants.FlashMode.off,
        icon: "flash-off"
    };

    _flashMode(){
        let s = this.state.flash;
        if(s === RNCamera.Constants.FlashMode.off){
            this.setState({flash: RNCamera.Constants.FlashMode.on})
            this.setState({icon: "flash-on"})
        }
        else{
            this.setState({flash: RNCamera.Constants.FlashMode.off})
            this.setState({icon: "flash-off"})
        }
    }

    renderCamera() {
        const isFocused = this.props.navigation.isFocused();

        if (!isFocused) {
            return null;
        } else if (isFocused) {
            return (
                <View style={styles.container}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={this.state.flash}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        captureAudio={false}
                        mirrorImage={true}
                        fixOrientation={true}
                    />
                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                            <Icon type="AntDesign" name="camerao" style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this._flashMode()} style={styles.flash}>
                            <Icon type="MaterialIcons" name={this.state.icon} style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
    render() {
        return (
            this.renderCamera()
        );
    }
    takePicture = async () => {
        if (this.camera) {
            const options = {quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true};
            await this.camera.takePictureAsync(options)
                .then(data => this.props.picReturned(data));
        }
    };
}

export default withNavigationFocus(Camera)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    back: {
        position:'absolute',
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        right:0
    },
    capture: {
        flex: 0,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    flash: {
        position:'absolute',
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        right:0
    },
    icon: {
        fontSize: 45,
        color: 'white'
    }
});