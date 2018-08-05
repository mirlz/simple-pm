import React from 'react';   
import { observer } from "mobx-react";
import ProjectStore from '../stores/ProjectStore';
import { Link } from 'react-router-dom';

import { Col, Input, Form, Button, Icon } from 'antd';

const FormItem = Form.Item;
let uuid = ProjectStore.initialProjectCount;

for(var i = 0; i < ProjectStore.initialProjectCount; i++) {
    ProjectStore.addProject(i);
}

const ProjectList = observer((props) => {
    const form = props.form;
    const { getFieldDecorator } = form;

    const addProject = () => {
        ProjectStore.addProject(uuid);
        uuid++;
    };
    const removeProject = (k) => {
        ProjectStore.removeProject(k)
    }
    const handleProjectNameChange = (rowKey, value) => {
        ProjectStore.setProjectName(rowKey, value);
    };
    const projectItems = () => {
        let cards = [];
        if(ProjectStore.ob.dataList.size > 0) {
            ProjectStore.ob.dataList.forEach((data, rowKey, map) => {
                cards.push(
                    <Col className="ant-col" span={6} key={rowKey}>
                        <div 
                            className="card" 
                        >
                        {
                            Object.keys(data).map((content,innerIndex) => {
                                if(content === 'name') {
                                    return (
                                        <div className="header" key={content+'-'+rowKey}>
                                            <div className='delete'>
                                                <Icon 
                                                    type="close-circle" 
                                                    onClick={() => {
                                                        removeProject(rowKey)
                                                    }}
                                                />
                                            </div>
                                            <FormItem>
                                                {getFieldDecorator(`project[${rowKey}]`, {
                                                    initialValue: data[content]
                                                })(
                                                    <Input
                                                        placeholder="Project name"
                                                        onChange={(e)=> {
                                                            handleProjectNameChange(rowKey, e.target.value)
                                                        }}
                                                    />
                                                )}
                                            </FormItem>
                                        </div>
                                    )
                                }
                                else if(content === 'features') {
                                    return (
                                        <Link to={`/p/${rowKey}`} key={content+'-'+rowKey}>
                                            <div className="features content">
                                                <div className="fig">{data[content].size}</div> features
                                            </div>
                                        </Link>
                                    )
                                }
                                else if(content === 'lastUpdated') {
                                    return (
                                        <div className="lastUpdated" key={content+'-'+rowKey}>
                                            Last Updated: {data[content]}
                                        </div>
                                    )
                                }
                                return true
                            })
                        }
                        </div>
                    </Col>
                )
            })
        }
        return cards;
    };

    return (
        <div className="projectList">
            <Form>
                {projectItems()}
                <Col className="ant-col" span={6}>
                    <Button 
                        className="newCard" type="dashed"
                        onClick={addProject}
                    >
                        Add New
                    </Button>
                </Col>
            </Form>
        </div>
    );
});

export default ProjectList;