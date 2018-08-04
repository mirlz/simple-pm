import { observable, action } from "mobx";
import ProjectStore from './ProjectStore';

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