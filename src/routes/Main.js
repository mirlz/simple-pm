import React from 'react';
import HomePage from '../pages/Home/view';
import FeatureListPage from '../pages/FeaturesList/view';
import { Switch, Route } from 'react-router-dom';

const Main = () => { 
    return (
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/p/:id' component={FeatureListPage}/>
        </Switch>
    )
};

export default Main;