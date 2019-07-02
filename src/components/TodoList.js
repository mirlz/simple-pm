import React from 'react';   
import {observer} from 'mobx-react';
import ProjectStore from '../stores/ProjectStore';
import { Modal, Checkbox, Col, Button, Input, Icon } from 'antd';

const TodoList = observer((props) => { 
    const form = props.form;
    const { getFieldDecorator, getFieldValue } = form;

    let projectId = props.projectId;
    let project = ProjectStore.ob.dataList.get(projectId);
    let currentFeatureSelected = project['features'].get(ProjectStore.ob.modalOb.featureId);
    let uuid = 0;
    if(currentFeatureSelected) {
        uuid = currentFeatureSelected['todoLastCount'];
    }

    const handleOk = (e) => {
        ProjectStore.ob.modalOb.visible = false;
    }
    const handleCancel = (e) => {
        ProjectStore.ob.modalOb.visible = false;
    }
    const handleClickCheckBox =(rowKey, todoId) => {
        ProjectStore.setTodoCompleted(projectId, rowKey, todoId);
    }
    const addTodo = () => {
        ProjectStore.addTodo(projectId, ProjectStore.ob.modalOb.featureId, uuid);
    }
    const removeTodo = (todoKey) => {
        ProjectStore.removeTodo(projectId, ProjectStore.ob.modalOb.featureId, todoKey);
    }
    const handleTodoNameChange = (rowKey, todoId, value) => {
        ProjectStore.setTodoName(projectId, rowKey, todoId, value);
    }

    const TodoItems = () => {
        let todos = [];
        if(project) {
            if(project['features']) {
                project['features'].forEach((data, rowKey, map) => {
                    if(rowKey === ProjectStore.ob.modalOb.featureId) {     
                        Object.keys(data).map((content,value) => {
                            if(content === 'todoList') {
                                return (
                                    data[content].forEach((todo, todoKey) => {
                                        todos.push( 
                                            <div className="todoItem" key={projectId+content+todoKey}> 
                                            {
                                                Object.keys(todo).map((todoField, key) => {
                                                    if(todoField === 'name') {
                                                        return (
                                                            <div key={projectId+todoKey+todoField}>
                                                                {getFieldDecorator(projectId+'-'+ProjectStore.ob.modalOb.featureId+'-todoItem-'+`[${todoKey}]`, {
                                                                })(
                                                                    <Checkbox 
                                                                        checked={ todo['completed'] }
                                                                        onClick={() => {
                                                                            handleClickCheckBox(rowKey, todoKey)
                                                                        }}
                                                                    />
                                                                )}
                                                                {getFieldDecorator(projectId+'-'+ProjectStore.ob.modalOb.featureId+'-todoItemName-'+`[${todoKey}]`, {
                                                                    initialValue: todo[todoField]
                                                                })(
                                                                    <Input 
                                                                        className="todoNameField"
                                                                        onChange={(e)=> {
                                                                            handleTodoNameChange(rowKey, todoKey, e.target.value)
                                                                        }}
                                                                    />
                                                                )}
                                                                <div className="clear"></div>
                                                                <div className='delete'>
                                                                    <Icon 
                                                                        type="close-circle" 
                                                                        onClick={() => {
                                                                            removeTodo(todoKey)
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                            </div>
                                        )
                                    })
                                )
                            }
                        })
                    }
                })
            }
        }

        return todos;
    }
    return (
<       Modal
            className="todoModal"
            title={ProjectStore.ob.modalOb.title}
            visible={ProjectStore.ob.modalOb.visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            {TodoItems()}
            <Col className="ant-col" span={6}>
                <Button 
                    className="newCard addNewTodo" type="dashed"
                    onClick={addTodo}
                >
                    Add New
                </Button>
                <div className="clear"></div>
            </Col>
            <div className="clear"></div>
        </Modal>          
    )
});

export default TodoList;