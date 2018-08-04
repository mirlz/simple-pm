import { observable, action } from "mobx";
import CommonStore from './CommonStore';

const ob = ({
    name: '',
    completed: false,
    lastUpdated: ''
});

var TodoStore = {
    ob
};

export default TodoStore;