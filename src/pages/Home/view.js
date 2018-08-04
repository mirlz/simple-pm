import React from 'react';   
import ProjectList from '../../components/ProjectList';
import { Form } from 'antd';
import {observer} from 'mobx-react';

const HomePage = Form.create()(observer((props) => { 
    return (
        <div className="HomePage">
          <ProjectList form={props.form} />
        </div>
    );
}));

export default HomePage;