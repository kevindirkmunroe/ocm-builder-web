import React from 'react';
import { Text, View, StyleSheet, Image, Platform, TouchableOpacity, Linking, Dimensions } from "react-native";
import { isLandscape } from "../pages/layout/BasePageLayout";

function OCMBuilderHeader(){
  return (
    <View style={[styles.header, {marginTop: Platform.OS === 'ios' && !isLandscape() === true ? 45 : 0}]}>
      <TouchableOpacity onPress={ () => Linking.openURL("https://www.ocmcoil.com")}>
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
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Text style={styles.headerText}>Builder</Text>
        <Text style={styles.headerText}>App (17)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#67674F',
    height: 80,
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
