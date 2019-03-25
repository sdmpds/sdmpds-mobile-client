import {action, observable, autorun} from "mobx";

class UserStore {
    @observable id;
    @observable name;

    @action setId = (id) => {
        this.id = id
    }

    @action setName = (name) => {
        this.name = name
    }
}

autorun(() => {
    //console.log(userStore.name)
}, { delay: 300 });

const userStore = new UserStore();
export default userStore;