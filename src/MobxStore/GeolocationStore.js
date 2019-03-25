import {action, observable, autorun} from "mobx";
import {Dimensions, PermissionsAndroid} from "react-native";
import pinStore from "./PinStore";

const {width, height} = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class GeolocationStore {

    @observable geolocation = {
        fetched: false,
        actualPosition: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
        }
    };


    @action setGeolocation = (data) => {
        this.geolocation.actualPosition = data;
    };
    @action
     async getGeolocation(){
        await navigator.geolocation.getCurrentPosition((position) => {
                let lat = parseFloat(position.coords.latitude)
                let long = parseFloat(position.coords.longitude)

                let actualRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                };

                // console.log("loc:", initialRegion)
                this.setGeolocation(actualRegion)
                this.geolocation.fetched = true;
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: false, timeout: 20000});
    }

}

autorun(() => {
    //console.log(geolocationStore.geolocation.actualPosition)
}, { delay: 300 });

let geolocationStore = new GeolocationStore();
export default geolocationStore;