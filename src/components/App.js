import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Router, Switch, Route} from '../router/router';
import {ProvideAuth} from './Login/authContext';

import Login, {PrivateRoute} from './Login/Login';

import Header from './Header/Header';
// import OCMBuilderHeader from './Header/OCMBuilderHeader';

import HpList from './HpList/HpList';
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
      <Router basename="/hp-dict-web-demo">
  {/* <Router basename="/ocmcoil"> */}
        <View style={{flex: 1}}>
      {/* <OCMBuilderHeader /> */}
          <Header />
          <Switch>
            {/*}
            <Route path="/ocmbuilder">
              <Text>Hello OCMBuilder!</Text>
              <GestureHandlerRootView>
                <View style={splashStyles.container}>
                  <HomeView />
                </View>
              </GestureHandlerRootView>
            </Route>
            */}
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
