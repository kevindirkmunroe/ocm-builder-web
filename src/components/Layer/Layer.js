import React from 'react';
import { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableHighlight } from "react-native";
import { staticImageUrlMap } from "./../../utils/AssetManager";

function Layer({level, patternName, patternImageKey, backgroundColor, patternOpacity, isColorMetallic, isVisible, onDeleteLayer, onEditLayer} ){

  /*
     - level
     - patternName
     - patternImageKey
     - backgroundColor
     - patternOpacity
     - isColorMetallic
     - isVisible
   */
  const [layerState, setLayerState] =
    useState({ patternName,
      patternImageKey,
      backgroundColor,
      patternOpacity,
      isColorMetallic,
      isVisible});

  const onDelete = () => {
    onDeleteLayer(level);
  }

  const onEditPattern = () => {
    //console.log(`Layer: edit PATTERN level: ${level} pattern: ${patternName} opacity: ${patternOpacity}`);
    onEditLayer(level, "pattern");
  }

  const onEditColor = () => {
    //console.log(`Layer: edit COLOR level: ${level} color: ${backgroundColor} metallic: ${isColorMetallic}`);
    onEditLayer(level, "color");
  }

  const onToggleVisible = () => {
    onEditLayer(level, "visible");
  }

  return (
    <View style={{flex: 1, flexDirection: 'row', flexGrow: 0.5, alignItems: 'center'}}>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
          },
        ]}>
          <View style={{flex: 2, margin: 2, backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center'}}><Text style={{margin: 10}}>{level}</Text>
          </View>
          <View style={{flex: 5, margin: 2,flexDirection: 'row' , alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f1f1'}}>
            <TouchableHighlight
               disabled={level === 'Background'}
               onPress={onEditPattern}>
              <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', marginTop: 7}}>
                <Image style={{width: 30, height: 30, marginRight: 5}} source={staticImageUrlMap[patternImageKey]}></Image>
                <Text style={{marginTop: 5}}>{patternName}</Text>
                <Text style={{marginTop: 5}}> / {typeof patternOpacity === 'number'? patternOpacity : ''}%</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{flex: 4, margin: 2,flexDirection: 'row', backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableHighlight
              disabled={backgroundColor === null}
              onPress={onEditColor}>
              <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', marginBottom: 6}}>
                <View style={{width: 30, height: 30, marginRight: 5, marginTop: 10, backgroundColor: backgroundColor}}></View>
                <Text style={{marginTop: 15}}>{backgroundColor} {JSON.stringify(isColorMetallic) === 'true' ? 'Metallic': ''}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{flex: 2, flexDirection: 'row', margin: 2,backgroundColor: '#f1f1f1', alignItems: 'center', justifyContent: 'center'}}>
            { level !== 'Background' && <TouchableHighlight
              onPress={onToggleVisible}>
              <Image style={{ width: 20, height: 20, marginTop: 5, marginLeft: 5 }}
                     source={!isVisible ? require('../../assets/eye_slash_visible_hide_hidden_show_icon_145987.png') : require('../../assets/eye_visible_hide_hidden_show_icon_145988.png')} />
            </TouchableHighlight>
            }
            { level !== 'Background' && <TouchableHighlight
              onPress={onDelete}>
              <Image style={{ width: 20, height: 20, marginTop: 5, marginLeft: 5 }} source={require('../../assets/trash-can-black-symbol_icon-icons.com_72914.png')} />
            </TouchableHighlight>
            }
          </View>
        </View>
    </View>
  )
}

export function isBackgroundLayer(){
  return level === 'Background';
}

const styles = StyleSheet.create({
            container: {
              flex: 1,
              padding: 3,
            },
});

export default Layer;
