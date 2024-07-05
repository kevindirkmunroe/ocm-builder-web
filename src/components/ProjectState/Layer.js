import React from 'react';
import { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableHighlight } from "react-native";
import { getOCMFinishes, staticImageUrlMap } from "./../../utils/AssetManager";

function Layer({level, patternName, patternImageKey, backgroundColor, patternOpacity, onDeleteLayer} ){

  /*
     - level
     - patternName
     - patternImageKey
     - backgroundColor
     - patternOpacity

   */
  const [layerState, setLayerState] = useState({ patternName, patternImageKey, backgroundColor, patternOpacity });

  const onDelete = () => {
    console.log(`Layer: delete ${JSON.stringify(level)}`);
    onDeleteLayer(level);
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
          <View style={{flex: 2, margin: 2,backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center'}}>
            { level !== 'X' && <TouchableHighlight
              onPress={onDelete}>
              <Image style={{ width: 20, height: 20, marginTop: 5, marginLeft: 5 }} source={require('../../assets/trash-can-black-symbol_icon-icons.com_72914.png')} />
            </TouchableHighlight>
            }
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
