import React from 'react';   
import {observer} from 'mobx-react';
import { Form } from 'antd';
import FeatureList from '../../components/FeatureList';

const FeatureListPage = Form.create()(observer((props) => { 
    let projectId = props.match.params.id;

    return (
        <div>
            <FeatureList projectId={projectId} form={props.form} />
        </div>
    )
}));

export default FeatureListPage;