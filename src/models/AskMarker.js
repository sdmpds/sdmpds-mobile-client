import Marker from "./Marker";
import userStore from "../stores/UserStore";

export default class AskMarker extends Marker{
    question;

    constructor(coordinates,question) {
        super(coordinates);
        this.question = question;
    }
}