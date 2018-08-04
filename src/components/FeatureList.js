import React from 'react';   
import {observer} from 'mobx-react';
import ProjectStore from '../stores/ProjectStore';
import FeatureStore from '../stores/FeatureStore';
import { Col, Input, Form, Row, Icon, Button, Modal, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;

const FeatureList = observer((props) => { 
    const form = props.form;
    const { getFieldDecorator, getFieldValue } = form;

    let projectId = props.projectId;
    let project = ProjectStore.ob.dataList.get(projectId);
    let uuid = project['features'].size;

    const addFeature = () => {
        FeatureStore.addFeature(projectId, uuid);
        uuid++;
    };
    const removeFeature = (k) => {
        ProjectStore.removeFeature(projectId, k);
    }
    const handleFeatureNameChange = (rowKey, value) => {
        ProjectStore.setFeatureNameInProject(projectId, rowKey, value);
    };
    const handleModalOpen = (title, fId) => {
        ProjectStore.ob.modalOb.title = title + ' - Todo List';
        ProjectStore.ob.modalOb.visible = true;
        ProjectStore.ob.modalOb.featureId = fId;
    }
    const handleOk = (e) => {
        ProjectStore.ob.modalOb.visible = false;
    }
    const handleCancel = (e) => {
        ProjectStore.ob.modalOb.visible = false;
    }
    const handleClickCheckBox =(projectId, featureId, todoId) => {
        ProjectStore.setTodoCompleted(projectId, featureId, todoId);
    }

    const FeatureItems = () => {
        let cards = [];

        if(project) {
            if(project['features']) {
                project['features'].forEach((data, rowKey, map) => {
                    let completedTodos = 0;
                    cards.push(
                        <Col className="ant-col" span={6} key={rowKey}>
                            <div 
                                className="card" 
                                key={rowKey}
                            >
                                {
                                    Object.keys(data).map((content,value) => {
                                        if(content === 'name') {
                                            return (
                                                <div className="header" key={projectId+content+rowKey}>
                                                    <div className='delete'>
                                                        <Icon 
                                                            type="close-circle" 
                                                            onClick={() => {
                                                                removeFeature(rowKey)
                                                            }}
                                                        />
                                                    </div>
                                                    <FormItem>
                                                        {getFieldDecorator(projectId+content+`[${rowKey}]`, {
                                                            initialValue: data[content]
                                                        })(
                                                            <Input 
                                                                placeholder="Feature name"
                                                                onChange={(e)=> {
                                                                    handleFeatureNameChange(rowKey, e.target.value)
                                                                }}
                                                            />
                                                        )}
                                                    </FormItem>
                                                </div>
                                            )
                                        }
                                        if(content === 'todoList') {
                                            let todoCount = data[content].size;
                                            Object.keys(data[content]).map((todoList,v) => {
                                                if(data[content][todoList]['completed']) {
                                                    completedTodos++;
                                                }
                                            });
                                            return (
                                                <div 
                                                    className="todos content" 
                                                    key={projectId+content+rowKey}
                                                    onClick={() => {
                                                        handleModalOpen(data['name'], rowKey);
                                                    }}
                                                >
                                                    <Row >
                                                        <Col span={12} className="todo">
                                                            <div className="fig">{todoCount - completedTodos}</div> Todos
                                                        </Col>
                                                        <Col span={12} className="completed todo">
                                                        <div className="fig">{completedTodos}</div> Completed
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )
                                        }
                                        else if(content === 'lastUpdated') {
                                            return (
                                                <div className="lastUpdated" key={projectId+content+rowKey}>
                                                    Last Updated: {data[content]}
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </Col>
                    )
                })
            }
        }

        return cards;
    }

    const TodoItems = () => {
        let todos = [];

        project['features'].forEach((data, rowKey, map) => {
            if(rowKey === ProjectStore.ob.modalOb.featureId) {
                return (
                    Object.keys(data).map((content,value) => {
                        if(content === 'todoList') {
                            return (
                                data[content].forEach((todo, todoKey) => {
                                    todos.push( 
                                        <div className="todoItem" key={projectId+content+todoKey}> 
                                        {
                                            Object.keys(todo).map((todoField, key) => {
                                                console.log(todo['completed'])
                                                if(todoField === 'name') {
                                                    return (
                                                        <div key={projectId+todoKey+todoField}>
                                                            <Checkbox 
                                                                checked={ todo['completed'] }
                                                                onClick={handleClickCheckBox(projectId, rowKey, todoKey)}
                                                            >
                                                                { todo[todoField] }
                                                            </Checkbox>
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
                )
            }
        })

        return todos;
    }
    return (
        <div className="featureList">
            <Link to='/'>
                <Button type="primary">
                    <Icon type="left" />Back
                </Button>
            </Link>
            <div className="featureListContainer">
            <   Modal
                    title={ProjectStore.ob.modalOb.title}
                    visible={ProjectStore.ob.modalOb.visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <TodoItems/>
                </Modal>
                <Form>
                    {
                        (project['name']) ? <div className="title">{project['name']}</div> : ''
                    }
                    <FeatureItems />
                    <Col className="ant-col" span={6}>
                        <Button 
                            className="newCard" type="dashed"
                            onClick={addFeature}
                        >
                            Add New
                        </Button>
                    </Col>
                    <div className="clear"></div>
                </Form>
            </div>
        </div>
    )
});

export default FeatureList;