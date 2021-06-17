import React from 'react';
import {ScrollView, View} from 'react-native';
import Header from './Header/Header';
import HpList from './HpList/HpList';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Header />
      <HpList />
    </View>
  );
};

export default App;
