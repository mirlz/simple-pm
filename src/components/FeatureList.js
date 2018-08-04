import React from 'react';   
import {observer} from 'mobx-react';
import ProjectStore from '../stores/ProjectStore';
import FeatureStore from '../stores/FeatureStore';
import { Col, Input, Form, Row, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;

const FeatureList = observer((props) => { 
    console.log('tes')
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
        FeatureStore.setFeature(projectId, rowKey, value);
    };
    const FeatureItems = () => {
        let cards = [];
        let dataCount = 0;

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
                                            console.log(data[content])
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
                                                        {getFieldDecorator(projectId+`-feature`+`[${rowKey}]`, {
                                                            initialValue: data[content]
                                                        })(
                                                            <Input 
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
                                            let todoCount = data[content].length;
                                            Object.keys(data[content]).map((todoList,v) => {
                                                if(data[content][todoList]['completed']) {
                                                    completedTodos++;
                                                }
                                            });
                                            return (
                                                <div className="todos content" key={projectId+content+rowKey}>
                                                    <Row>
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
                    dataCount++;
                })
            }
        }

        return cards;
    }
    return (
        <div className="featureList">
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
        </div>
    )
});

export default FeatureList;