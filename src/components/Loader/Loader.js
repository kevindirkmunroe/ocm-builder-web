import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#123f63" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    margin: 20,
  },
});

export default Loader;
