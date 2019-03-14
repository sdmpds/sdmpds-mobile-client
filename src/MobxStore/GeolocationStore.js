import {action, observable} from "mobx";
import {Dimensions, PermissionsAndroid} from "react-native";

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
    }

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

    //TODO: Its could be important, but works well without that ;/
    // requestForLocalization = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //             {
    //                 'title': 'MMS',
    //                 'message': 'MMS access to your location '
    //             }
    //         );
    //
    //         console.log("im here")
    //
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             //TODO: Debug alert - remove before relase!
    //             console.log("You can use the location")
    //             alert("You can use the location");
    //             //this.getGeolocation().catch(err => console.log(err))
    //         } else {
    //             //TODO: Debug alert - remove before relase!
    //             console.log("location permission denied")
    //             alert("Location permission denied");
    //         }
    //     } catch (err) {
    //         console.warn(err)
    //     }
    // };

}

let geolocationStore = new GeolocationStore();
export default geolocationStore;