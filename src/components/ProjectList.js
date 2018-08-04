import React from 'react';   
import { observer, renderReporter } from "mobx-react";
import ProjectStore from '../stores/ProjectStore';
import { Link } from 'react-router-dom';

import { Card, Col, Input, Form, Button, Icon } from 'antd';

const FormItem = Form.Item;
let uuid = ProjectStore.initialProjectCount;

for(var i = 0; i < ProjectStore.initialProjectCount; i++) {
    ProjectStore.addProject(i);
}

const ProjectList = observer((props) => {
    const form = props.form;
    const { getFieldDecorator, getFieldValue } = form;

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
        let dataCount = 0;
        if(ProjectStore.ob.dataList.size > 0) {
            ProjectStore.ob.dataList.forEach((data, rowKey, map) => {
                cards.push(
                    <Col className="ant-col" span={6}>
                        <div 
                            className="card" 
                            key={rowKey}
                        >
                        {
                            Object.keys(data).map((content,innerIndex) => {
                                if(content === 'name') {
                                    return (
                                        <div className="header">
                                            <div className='delete'>
                                                <Icon 
                                                    type="close-circle" 
                                                    onClick={() => {
                                                        removeProject(rowKey)
                                                    }}
                                                />
                                            </div>
                                            <FormItem>
                                                {getFieldDecorator(`project`+`[${rowKey}]`, {
                                                    initialValue: (data[content] && data[content] !== '') ? data[content] : 'Project name ' + dataCount
                                                })(
                                                    <Input
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
                                        <Link to={`/p/${rowKey}`}>
                                            <div className="features content">
                                                <div className="fig">{data[content].size}</div> features
                                            </div>
                                        </Link>
                                    )
                                }
                                else if(content === 'lastUpdated') {
                                    return (
                                        <div className="lastUpdated">
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
        return cards;
    };

    return (
        <div className="projectList">
            {projectItems()}
            <Col className="ant-col" span={6}>
                <Button 
                    className="newCard" type="dashed"
                    onClick={addProject}
                >
                    Add New
                </Button>
            </Col>
        </div>
    );
});

export default ProjectList;