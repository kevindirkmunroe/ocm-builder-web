import React from 'react';
import { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { getOCMFinishes, staticImageUrlMap } from "./../../utils/AssetManager";

function Layer({level, patternName, patternImageKey, backgroundColor, patternOpacity}){

  /*
     - level
     - patternName
     - patternImageKey
     - backgroundColor
     - patternOpacity

   */
  const [layerState, setLayerState] = useState({ patternName, patternImageKey, backgroundColor, patternOpacity });
  const ocms = getOCMFinishes();

  return (
    <View style={{flex: 1, flexDirection: 'row', flexGrow: 0.5, alignItems: 'center'}}>
      <View
        style={[
          styles.container,
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: 'row',
          },
        ]}>
          <View style={{flex: 1, margin: 2, backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center'}}><Text style={{margin: 10}}>{level}</Text>
          </View>
          <View style={{flex: 2, margin: 2,flexDirection: 'row' , alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f1f1'}}>
            <Image style={{width: 30, height: 30, marginRight: 5, marginTop: 10}} source={staticImageUrlMap[patternImageKey]}></Image>
            <Text>{patternName}</Text>
          </View>
          <View style={{flex: 2, margin: 2,flexDirection: 'row', backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: 30, height: 30, marginRight: 5, marginTop: 10, backgroundColor: backgroundColor}}></View>
            <Text>{backgroundColor}</Text>
          </View>
          <View style={{flex: 2, margin: 2,backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center'}}>
            <Text>{typeof patternOpacity === 'number'? patternOpacity * 100 : 'Opacity'}%</Text>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
            container: {
              flex: 1,
              padding: 3,
            },
});

export default Layer;
