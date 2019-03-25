import {action, observable, autorun} from "mobx";
import {fetchPins} from "../api";
import faker from 'faker'


class PinStore {
    @observable askPins = []

    @observable pins = [
        new Pin({latitude: 50.070625,longitude:19.923645,latitudeDelta:0,longitudeDelta:0}),
        new Pin({latitude:50.074253, longitude:19.916528,latitudeDelta:0,longitudeDelta:0}),
        new Pin({latitude:50.071792, longitude:19.909852,latitudeDelta:0,longitudeDelta:0})];
    //@observable state = "PENDING" //PENDING/ DONE / ERROR
    @observable fetched = true;

    @action fetch = () => {
        fetchPins.then( (result) => this.pins = result)
    }


}

autorun(() => {
    console.log(pinStore.pins)
}, { delay: 300 });

const pinStore = new PinStore();
export default pinStore;

export class AskPin{
    coordinates;

    constructor(coordinates){
        this.coordinates = coordinates;
    }
}


export class Pin{
    coordinates = {
        latitude:0,
        longitude:0,
        latitudeDelta:0,
        longitudeDelta:0
    };
    id;
    name;
    recognized;
    time;
    color;
    photo;

    constructor(coordinates, name, id, color, photo){
        this.coordinates=coordinates;

        if(name){
            this.name = name;
        }
        else{
            this.name = faker.name.firstName()
        }
        if(color){
            this.color = color;
        }
        else{
            this.color="red"
        }
        this.recognized = faker.random.number(15);
        this.time = faker.date.past();
        this.id = id;
        this.photo = photo;
    }
}