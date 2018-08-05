import React from 'react';   
import {observer} from 'mobx-react';
import ProjectStore from '../stores/ProjectStore';
import FeatureStore from '../stores/FeatureStore';
import { Col, Input, Form, Row, Icon, Button, Modal, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import TodoList from './TodoList';

const FormItem = Form.Item;

const FeatureList = observer((props) => { 
    const form = props.form;
    const { getFieldDecorator, getFieldValue } = form;

    let projectId = props.projectId;
    let project = ProjectStore.ob.dataList.get(projectId);
    let uuid = project['features'].size;

    const addFeature = () => {
        ProjectStore.addFeature(projectId, uuid);
        uuid++;
    };
    const removeFeature = (k) => {
        ProjectStore.removeFeature(projectId, k);
    }
    const handleFeatureNameChange = (rowKey, value, fieldKey) => {
        form.setFields({
            [fieldKey]: { 
              value: value,
              errors: ""
            }  
        });
        ProjectStore.setFeatureNameInProject(projectId, rowKey, value);
        console.log(form.getFieldsValue())
    };
    const handleModalOpen = (title) => {
        ProjectStore.ob.modalOb.title = title + ' - Todo List';
        ProjectStore.ob.modalOb.visible = true;
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
                            >
                                {
                                    Object.keys(data).map((content,value) => {
                                        if(content === 'name') {
                                            return (
                                                <div className="header" key={projectId+'-feature'+rowKey}>
                                                    <div className='delete'>
                                                        <Icon 
                                                            type="close-circle" 
                                                            onClick={() => {
                                                                removeFeature(rowKey)
                                                            }}
                                                        />
                                                    </div>
                                                    <FormItem>
                                                        {getFieldDecorator(projectId+'-feature-'+`[${rowKey}]`, {
                                                            initialValue: data[content],
                                                            rules: [{
                                                              whitespace: true, 
                                                            }]
                                                        })(
                                                            <Input 
                                                                placeholder="Feature name"
                                                                onChange={(e)=> {
                                                                    handleFeatureNameChange(rowKey, e.target.value, projectId+'-feature-'+`[${rowKey}]`)
                                                                }}
                                                            />
                                                        )}
                                                    </FormItem>
                                                </div>
                                            )
                                        }
                                        if(content === 'todoList') {
                                            let todoCount = data[content].size;
                                            data[content].forEach((todo, todoKey) => {
                                                if(todo['completed']) {
                                                    completedTodos++;
                                                }
                                            });
                                            return (
                                                <div 
                                                    className="todos content" 
                                                    key={projectId+content+rowKey}
                                                    onClick={() => {
                                                        handleModalOpen(data['name'], rowKey);
                                                        ProjectStore.ob.modalOb.featureId = rowKey;
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

    return (
        <div className="featureList">
            <Form>
                <TodoList projectId={projectId} form={form}/>
                <Link to='/'>
                    <Button type="primary">
                        <Icon type="left" />Back
                    </Button>
                </Link>
                <div className="featureListContainer">
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
                    
                </div>
            </Form>
        </div>
    )
});

export default FeatureList;