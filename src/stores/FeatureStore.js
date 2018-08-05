import { observable } from "mobx";

const ob = ({
    id: '',
    name: '',
    completed: false,
    todoList: observable.map({
    }),
    lastUpdated: '',
});
var FeatureStore = {
    ob
};

export default FeatureStore;