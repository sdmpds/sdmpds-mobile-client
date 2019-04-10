import {action, observable, autorun} from "mobx";
import axios from "axios";
import {Alert} from 'react-native'
import userStore from "./UserStore";

const http = "http://192.168.43.221:5555";
//const http = "https://mmsnodeserver.herokuapp.com"
//const http = "http://localhost:5555";
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
};

class PinStore {
    @observable askMarkers = [];
    @observable pendingMarkers = [];
    @observable receivedMarkers = [];

    @action setRecivedMarker = (markers) => {
        this.receivedMarkers = markers;
    }

    @action postMyMarker = async (marker) => {
        await axios.post(`${http}/markers`, marker, config)
            .then(res => {
                if (res.status !== 200) return () => {
                    Alert.alert("Sorry", "Network error");
                    this.pendingMarkers.pop(marker)
                }
            })
            .catch(err => {
                Alert.alert("Sorry",err.toString());
                this.pendingMarkers.pop(marker)
            })
    };

    @action postAskMarker = async (marker) => {
        await axios.post(`${http}/questions`, marker, config)
            .then(res => {
                if (res.status !== 200) return () => Alert.alert("Sorry, Connection error");
            })
            .catch(err => {
                Alert.alert("Sorry", err.toString());
                this.askMarkers.pop(marker)
            })
    }

    @action getMarkers = async () => {
        await axios.get(`${http}/markers`)
            .then(res => {
                if(res.status === 200 && userStore.connection !== 200) {
                    userStore.setConnection(res.status);
                }
                this.receivedMarkers = res.data.completed;
                this.askMarkers = res.data.question;
                this.pendingMarkers = res.data.pending
            })
            .catch(err => {
                if(userStore.connection !== 404) {
                    userStore.setConnection(404);
                }
            })
    };
}

const pinStore = new PinStore();
export default pinStore;

autorun(async () => {
    await pinStore.getMarkers();
    console.log('autorun!')
});
