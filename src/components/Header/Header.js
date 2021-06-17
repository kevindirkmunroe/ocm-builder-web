import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Harry Potter Dictionary</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#123f63',
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
