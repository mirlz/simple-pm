import React from 'react';
import HomePage from '../pages/Home/view';
import FeatureListPage from '../pages/FeaturesList/view';
import { Switch, Route } from 'react-router-dom';
import { Form } from 'antd';
import {observer} from 'mobx-react';

const Main = Form.create()(observer((props) => { 
    const HomePageWrapper = () => {
        return (
            <HomePage 
              form = {props.form}
            />
          );
    }
    const FeatureListWrapper = (selfProps) => {
        return (
            <FeatureListPage 
              form = {props.form}
              {...selfProps}
            />
          );
    }
    return (
        <Switch>
            <Route exact path='/' render={HomePageWrapper} />
            <Route path='/p/:id' render={FeatureListWrapper}/>
        </Switch>
    )
}));

export default Main;