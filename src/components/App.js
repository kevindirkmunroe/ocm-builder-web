import React, {useState} from 'react';
import {View} from 'react-native';
import {Router, Switch, Link, Route} from '../router/router';
// import {ProvideAuth, useAuth} from '../components/Login/authContext';
import {ProvideAuth} from '../components/Login/authContext';

import Login, {PrivateRoute} from './Login/Login';

import Header from './Header/Header';
import HpList from './HpList/HpList';

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <View style={{flex: 1}}>
          <Header />

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/">
              <HpList />
            </PrivateRoute>
          </Switch>
        </View>
      </Router>
    </ProvideAuth>
  );
};

export default App;
