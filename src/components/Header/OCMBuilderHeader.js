import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const OCMBuilderHeader = () => {
  return (
    <View style={styles.header}>
      <Image
        style={{
          width: 40,
          height: 30,
          marginRight: 5,
          borderRadius: 3,
          borderWidth: 0,
        }}
        source={require('../../images/ocm-icon.png')}
      />
      <Text style={styles.headerText}>OCMBuilder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#67674F',
    flexShrink: 1,
    justifyContent: 'left',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default OCMBuilderHeader;
