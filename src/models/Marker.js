import userStore from 'src/stores/UserStore'

export default class Marker {
    coordinates;
    id;
    name;
    date;

    constructor(coordinates) {
        this.coordinates = coordinates;
        this.id = userStore.id;
        this.name = userStore.name;
        this.date = new Date();
    }
}