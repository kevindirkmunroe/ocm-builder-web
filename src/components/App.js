import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Router, Switch, Route, Navigate, Redirect } from "../router/router";
import {ProvideAuth} from './Pages/authContext';

import Login, {PrivateRoute} from './Pages/Login';

import HpList from './HpList/HpList';
import OCMBuilderHeader from "./Header/OCMBuilderHeader";
// import HomeView from '../js/wizardV2/HomeView';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const App = () => {
  return (
    <ProvideAuth>
      <Router basename="/ocmcoil">
        <View style={{flex: 1}}>
          <OCMBuilderHeader />
          <Switch>
            <Route path="/start">
              <HpList />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </View>
      </Router>
    </ProvideAuth>
  );
};

export default App;
