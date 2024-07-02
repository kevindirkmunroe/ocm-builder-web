import React from 'react';
import { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { getOCMFinishes, getOCMPrintRollers, staticImageUrlMap } from "./../../utils/AssetManager";

function Layer({level, pattern, backgroundColor, patternOpacity}){

  /*
     - level
     - pattern
     - backgroundColor
     - patternOpacity

   */
  const [layerState, setLayerState] = useState({ pattern, backgroundColor, patternOpacity });
  const prs = getOCMPrintRollers();
  const ocms = getOCMFinishes();
  let patternName = prs.find(x => x.key === pattern)?.name;
  if(patternName === null){
    patternName = pattern;
  }

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
        <View style={{flex: 1, backgroundColor: 'red'}}><Text style={{margin: 10}}>{level}</Text></View>
        <View style={{flex: 2, backgroundColor: 'darkorange'}}>
            <View style={{margin: 10, flex: 1, flexDirection: 'row'}}>
            <Image style={{width: 30, height: 30}} source={staticImageUrlMap[pattern]}></Image>
            <Text> {patternName}</Text>
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{backgroundColor: backgroundColor}}>{backgroundColor}</Text>
        </View>
        <View style={{flex: 2, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}>
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
