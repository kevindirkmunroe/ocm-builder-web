import React from 'react';
import {Text, View, StyleSheet, Image, Platform} from 'react-native';

const OCMBuilderHeader = () => {
  return (
    <View style={styles.header}>
      <a href="https://www.ocmcoil.com" target="_blank">
        <Image
          style={{
            width: 200,
            height: 60,
            marginRight: 15,
            borderRadius: 3,
            borderWidth: 0,
          }}
          source={require('../../assets/ocm-splash.png')}
        />
      </a>
      <View style={{flex: 1}}>
        <Text style={styles.headerText}>Builder</Text>
        <Text style={styles.headerText}>App</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#67674F',
    height: Platform.OS === 'ios' ? 200 : 100,
    flexShrink: 1,
    justifyContent: 'left',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Futura',
  },
});

export default OCMBuilderHeader;
