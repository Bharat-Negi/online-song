import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';

//import DashboardContainer from './../containers/DashboardContainer';
import DashboardPage from './../pages/DashboardPage';
import LoginContainer from './../containers/LoginContainer';
import CDRContainer from './../containers/CDRContainer';
import CRMPage from './../pages/CRMPage'
import MyProfilePage from './../pages/MyProfilePage'
import ChangePasswordPage from './../pages/ChangePasswordPage'
import SettingsPage from './../pages/SettingsPage'

class App extends Component {
  render() {
    return (
        <Switch>
            <Route exact path='/' component={LoginContainer}/>
            <Route exact path='/dashboard' component={DashboardPage}/>
            <Route exact path='/crm' component={CRMPage}/>
            <Route exact path='/profile' component={MyProfilePage}/>
            <Route exact path='/change-password' component={ChangePasswordPage} />
            <Route exact path='/cdr' component={CDRContainer} />
            <Route exact path='/settings' component={SettingsPage} />
        </Switch>
    );
  }
}

export default App;
