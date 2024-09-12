import React, { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

function MyProjectDesktop(){
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', padding: 10, flexWrap: 'wrap', alignItems: 'center'}}>
      <View style={styles.blockHalf}>
        <Text>Half (Main)</Text>
      </View>
      <View style={styles.blockEighth}>
        <Text>Eight 1</Text>
      </View>
      <View style={styles.blockEighth}>
        <Text>Eight 2</Text>
      </View>
      <View style={styles.blockQtr}>
        <Text>Quarter</Text>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  blockHalf: {
    width: '50%', height: '99%', padding: 10, borderWidth: 2, borderColor: 'gray', borderRadius: 5
  },
  blockQtr: {
    width: '48%', marginLeft: 10, padding: 10, height:'50%', borderWidth: 2, borderColor: 'gray', borderRadius: 5
  },
  blockEighth: {
    width: '48%', marginLeft: 10, padding: 10, marginBottom: 10, height:'23%', borderWidth: 2, borderColor: 'gray', borderRadius: 5
  }
});
export default MyProjectDesktop;
