
## A simple project management system 

I'm trying to do a web app whereby on load, it will show the list of projects in card form. Upon clicking each project, it will go to the next page (project page), the list of tasks (in card form) will show in this page. Click again on each task, and a popup will show the list of todos for this task. 

This project is using the create-react-app boilerplate. 

### Frameworks / libraries used

- React
- MobX
- Antd Design
- React-router
- Sass

### Observables / Stores

- CommonStore.js
- FeatureStore.js
- ProjectStore.js
- TodoStore.js

As time and date are used across all the pages, I created a separate store to store commonly used components. 

Both FeatureStore and TodoStore contain the data structure. Most logics are done on the ProjectStore.js file. 

There should be an array of objects, each object is a project, and in it, it will store the Festure items in it, with Todos in the FeatureStores.

### Manipulating Projects data

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

ob.dataList would be used to hold all the data in it. ob.dataList.set() is used to store the key of the object.

In the features key, another observable is created so as to store the array of feature objects in it. As the default number of features is 2, so for each project that is created, there will be 2 features assigned to it. 

    const removeProject = action((key) => {
    	  ob.dataList.delete(key);
    });

Removing an object from the array is done easily by passing in the object key to delete. 

### Manipulating Features data

 

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

The key is passed into the addFeature function so that we can identify which project object we will be injecting the feature into. 

So as we loop through the projects list and get the project with the key, then a new feature can be pushed in the observable.map (array) of that project itself. 

### Todo 

Using the same method as in manipulating features data: 

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

### Setting data that user input

    const setProjectName = action((index, value) => {
        ob.dataList.forEach((data, rowKey, map) => {
            if(rowKey === index) {
                data['name'] = value;
                data['lastUpdated'] = CommonStore.getCurrentDateTime();
            }
        });
    });

Similarly, the project key is passed in here as index. On the view file - ProjectList.js, the handle event would call this function to set the project name as accordingly to the observable. 
