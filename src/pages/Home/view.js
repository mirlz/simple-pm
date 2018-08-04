import React from 'react';   
import ProjectList from '../../components/ProjectList';

import {observer} from 'mobx-react';

const HomePage = observer((props) => { 
    return (
        <div className="HomePage">
          <ProjectList form={props.form} />
        </div>
    );
});

export default HomePage;