import { observable, action } from "mobx";
import CommonStore from './CommonStore';

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
        featureLastCount: 0
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
            data['featureLastCount']++;
            data['features'].set('feature'+key, {
                id: key,
                name: 'Feature '+key,
                completed: false,
                todoList: observable.map({
                }),
                lastUpdated: CommonStore.getCurrentDateTime(),
                todoLastCount: 0
            });

            for(var a = 0; a < initialTodoCount; a++) {
                addTodo(projectId, 'feature'+key, a)
            }   
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

const addTodo = action((projectId, featureId, todoKey) => {
    let project = ob.dataList.get(projectId);
    let feature = project['features'].get(featureId);
    feature['todoLastCount']++;
    feature['todoList'].set('todo'+todoKey, {
        name: 'Todo ' + todoKey,
        completed: false,
        lastUpdated: CommonStore.getCurrentDateTime(),
    });
    project['lastUpdated'] = CommonStore.getCurrentDateTime();
    feature['lastUpdate'] = CommonStore.getCurrentDateTime();
});

const removeTodo = action((projectId, featureId, todoKey) => {
    let project = ob.dataList.get(projectId);
    let feature = project['features'].get(featureId);
    feature['todoList'].delete(todoKey);

    project['lastUpdated'] = CommonStore.getCurrentDateTime();
    feature['lastUpdate'] = CommonStore.getCurrentDateTime();
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
    let project = ob.dataList.get(projectIndex);
    let feature = project['features'].get(featureIndex);
    project['lastUpdated'] = CommonStore.getCurrentDateTime();
    feature['name'] = value;
    feature['lastUpdated'] = CommonStore.getCurrentDateTime();
});

const setTodoCompleted = action((projectIndex, featureIndex, todoId) => {
    let project = ob.dataList.get(projectIndex);
    let feature = project['features'].get(featureIndex);
    let todo = feature['todoList'].get(todoId);
    todo.completed = !todo.completed;

    project['lastUpdated'] = CommonStore.getCurrentDateTime();
    feature['lastUpdate'] = CommonStore.getCurrentDateTime();
});

const setTodoName = action((projectIndex, featureIndex, todoId, value) => {
    let project = ob.dataList.get(projectIndex);
    let feature = project['features'].get(featureIndex);
    let todo = feature['todoList'].get(todoId);
    todo.name = value;

    project['lastUpdated'] = CommonStore.getCurrentDateTime();
    feature['lastUpdate'] = CommonStore.getCurrentDateTime();
});

var ProjectStore = {
    initialProjectCount,
    addProject,
    removeProject,
    addFeature,
    removeFeature,
    addTodo,
    removeTodo,
    setProjectName,
    setFeatureNameInProject,
    setTodoCompleted,
    setTodoName,
    ob
};

export default ProjectStore;