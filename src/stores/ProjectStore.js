import { observable, action } from "mobx";
import CommonStore from './CommonStore';
import FeatureStore from './FeatureStore';
import TodoStore from './TodoStore';

const initialProjectCount = 3; 
const initialFeatureCount = 2; 
const initialTodoCount = 2; 

const ob = observable({
    dataList: observable.map({
    })
});

const addProject = action((key) => {
    ob.dataList.set('project'+key, {
        id: key, 
        name: 'Project name ' + key,
        features:  observable.map({
        }),
        lastUpdated: CommonStore.getCurrentDateTime(),
    });

    for(var i = 0; i < initialFeatureCount; i++) {
        addFeature('project'+key, i);
    }
});

const removeProject = action((key) => {
    ob.dataList.delete(key);
});

const addFeature = action((projectId, key) => {
    ob.dataList.forEach((data, rowKey, map) => {
        if(rowKey === projectId) {
            data.features.set('feature'+key, FeatureStore.ob);
            data.features.forEach((feature, i) => {
                feature['lastUpdated'] = CommonStore.getCurrentDateTime();
            });
        }
    });
});

const removeFeature = action((projectId, key) => {
    ob.dataList.forEach((data, rowKey, map) => {
        if(rowKey === projectId) {
            data.features.delete(key)
        }
    });
});

const setProjectName = action((index, value) => {
    ob.dataList.forEach((data, rowKey, map) => {
        if(rowKey === index) {
            data['name'] = value;
            data['lastUpdated'] = CommonStore.getCurrentDateTime();
        }
    });
});

const setFeatureNameInProject = action((projectIndex, featureIndex, value) => {
    ob.dataList.forEach((data, rowKey, map) => {
        if(rowKey === projectIndex) {
            data.features.forEach((feature, i) => {
                console.log(i)
                if(i === featureIndex) {
                    feature['name'] = value;
                    feature['lastUpdated'] = CommonStore.getCurrentDateTime();
                }
            })
        }
    });
});

var ProjectStore = {
    initialProjectCount,
    addProject,
    removeProject,
    addFeature,
    removeFeature,
    setProjectName,
    setFeatureNameInProject,
    ob
};

export default ProjectStore;