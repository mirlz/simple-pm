import { observable, action } from "mobx";
import CommonStore from './CommonStore';
import ProjectStore from './ProjectStore';

const ob = ({
    name: '',
    completed: false,
    todoList: [],
    lastUpdated: '',
});

const setFeature = action((projectIndex, featureIndex, value) => {
    ProjectStore.setFeatureNameInProject(projectIndex, featureIndex, value);
});

const addFeature = action((projectId, key) => {
    ProjectStore.addFeature(projectId, key);
});

var FeatureStore = {
    ob,
    setFeature,
    addFeature
};

export default FeatureStore;