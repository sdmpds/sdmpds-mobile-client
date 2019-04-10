import {action, autorun, observable} from "mobx";
import {Dimensions} from "react-native";

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.09;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class GeolocationStore {

    @observable geolocation = {
        fetched: false,
        fetchedPosiotion: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
        }
    };


    @action setGeolocation = (data) => {
        this.geolocation.fetchedPosiotion = data;
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
    console.log(geolocationStore.geolocation.actualPosition)
}, { delay: 300 });

let geolocationStore = new GeolocationStore();
export default geolocationStore;