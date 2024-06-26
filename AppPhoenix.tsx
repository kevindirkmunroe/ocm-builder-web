import React from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import HomeView from './src/js/wizardV2/HomeView';

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount = () => {
    const sleep = (milliseconds: number) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
    sleep(1000).then(() => {
      SplashScreen.hide();
    });
  };

  render() {
    return (
        <GestureHandlerRootView>
          <View style={splashStyles.container}>
            <HomeView />
          </View>
        </GestureHandlerRootView>
    );
  }
}

AppRegistry.registerComponent('OCM Builder', () => App);
