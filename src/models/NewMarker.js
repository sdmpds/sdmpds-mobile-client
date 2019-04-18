import Marker from '/Users/irion94/MMS/src/models/Marker'

export default class NewMarker extends Marker {
    photo;

    constructor(coordinates, photo) {
        super(coordinates);
        this.photo = photo;
    }
}