import {action, observable} from "mobx";
import {RNCamera} from "react-native-camera";

class CameraStore {
    @observable cameraAtributes = {
        intervalTime: 0,
        interval: false,
        flash: {
            mode: RNCamera.Constants.FlashMode.off,
            boolean: false
        }
    };

    @observable counter = 0;

    @observable statistics = {
        uri: null
    };


    @action setIntervalTime = (input) => {
        this.cameraAtributes.intervalTime = input
    };

    @action setInterval = (input) => {
        this.cameraAtributes.interval = input
    };

    @action setStatistics = (input) => {
        this.statistics.uri = input;
        this.counter++;
    };

    @action.bound counterIncrement() {
        this.counter =+ 1;
    }

    @action setFlesh = () => {
        if(this.cameraAtributes.flash.boolean){
            this.cameraAtributes.flash.boolean = false;
            this.cameraAtributes.flash.mode = RNCamera.Constants.FlashMode.off
        }
        else{
            this.cameraAtributes.flash.boolean = true;
            this.cameraAtributes.flash.mode = RNCamera.Constants.FlashMode.on
        }
    }


}

let cameraStore = new CameraStore();
export default cameraStore;