import {action, observable, autorun} from "mobx";

class UserStore {
    @observable id;
    @observable name;
    @observable connection;

    @action setId = (id) => {
        this.id = id
    }

    @action setName = (name) => {
        this.name = name
    }

    @action setConnection = (status) => {
        this.connection = status
    }
}

autorun(() => {
    //console.log(userStore.name)
}, { delay: 300 });

const userStore = new UserStore();
export default userStore;