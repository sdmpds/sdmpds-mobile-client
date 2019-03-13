import {action, observable} from "mobx";


class ServerStore {
    @observable data = {}
    @observable state = "PENDING" //PENDING/ DONE / ERROR

    @action fetchData
}

export const serverStore = new ServerStore();