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

const addTodo = action((projectId, featureId, todoKey) => {
    let project = ob.dataList.get(projectId);
    let feature = project['features'].get(featureId);
    feature['todoList'].set('todo'+todoKey, 
        TodoStore.ob
    );
    let todo = feature['todoList'].get('todo'+todoKey);
    todo.name = 'Todo ' + todoKey;

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