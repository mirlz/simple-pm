import { observable, action } from "mobx";
import CommonStore from './CommonStore';
import FeatureStore from './FeatureStore';
import TodoStore from './TodoStore';

const initialProjectCount = 3; 
const initialFeatureCount = 2; 
const initialTodoCount = 2; 

const ob = observable({
    dataList: observable.map({
    }),
    modalOb: {
        visible: false,
        title: 'TodoList',
        featureId: ''
    }
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
            let fCount = 0; 
            data['features'].set('feature'+key, 
                FeatureStore.ob
            );
            data['features'].forEach((feature, i) => {
                let todoCount = 0;
                feature['id'] = 'feature' + fCount;
                feature['name'] = 'Feature ' + fCount;
                feature['lastUpdated'] = CommonStore.getCurrentDateTime();
                for(var a = 0; a < initialTodoCount; a++) {
                    feature['todoList'].set('todo'+a, 
                        TodoStore.ob
                    );
                }
                feature['todoList'].forEach((todo, i) => {
                    todo['name'] = 'Todo ' + todoCount;
                    todoCount++;
                })
                fCount++;
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
            data['lastUpdated'] = CommonStore.getCurrentDateTime();
            data.features.forEach((feature, i) => {
                if(i === featureIndex) {
                    feature['name'] = value;
                    feature['lastUpdated'] = CommonStore.getCurrentDateTime();
                }
            })
        }
    });
});

const setTodoCompleted = action((projectIndex, featureIndex, todoId) => {
    ob.dataList.forEach((data, rowKey, map) => {
        if(rowKey === projectIndex) {
            data['lastUpdated'] = CommonStore.getCurrentDateTime();
            data.features.forEach((feature, i) => {
                if(i === featureIndex) {
                    feature['lastUpdated'] = CommonStore.getCurrentDateTime();
                    feature['todoList'].forEach((todo, t) => {
                        if(t === todoId) {
                            console.log(todo)
                            //todo['completed'] = true
                        }
                    })
                }
            })
        }
    })
});

var ProjectStore = {
    initialProjectCount,
    addProject,
    removeProject,
    addFeature,
    removeFeature,
    setProjectName,
    setFeatureNameInProject,
    setTodoCompleted,
    ob
};

export default ProjectStore;