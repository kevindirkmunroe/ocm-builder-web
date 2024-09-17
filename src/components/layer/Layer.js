import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableHighlight} from 'react-native';
import {staticImageUrlMap} from './../../utils/AssetManager';
import {isAndroidWebBrowser as isAndroid } from "../pages/layout/BasePageLayout";

function Layer({
  level,
  patternName,
  patternImageKey,
  backgroundColor,
  patternOpacity,
  isColorMetallic,
  isVisible,
  onDeleteLayer,
  onEditLayer,
  isReadOnly = false
}) {
  /*
     - level
     - patternName
     - patternImageKey
     - backgroundColor
     - patternOpacity
     - isColorMetallic
     - isVisible
   */
  const [layerState, setLayerState] = useState({
    patternName,
    patternImageKey,
    backgroundColor,
    patternOpacity,
    isColorMetallic,
    isVisible,
    isReadOnly
  });

  const onDelete = () => {
    onDeleteLayer(level);
  };

  const onEditPattern = () => {
    //console.log(`layer: edit PATTERN level: ${level} pattern: ${patternName} opacity: ${patternOpacity}`);
    onEditLayer(level, 'pattern');
  };

  const onEditColor = () => {
    //console.log(`layer: edit COLOR level: ${level} color: ${backgroundColor} metallic: ${isColorMetallic}`);
    onEditLayer(level, 'color');
  };

  const onToggleVisible = () => {
    onEditLayer(level, 'visible');
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexGrow: 0.5,
        alignItems: 'center',
      }}>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
          },
        ]}>
        <View
          style={{
            flex: 1,
            margin: 2,
            backgroundColor: '#f1f1f1',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{margin: 5}}>{level === 'Background'? 'B' : level}</Text>
        </View>
        <View
          style={{
            flex: 4,
            margin: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'left',
            backgroundColor: '#f1f1f1',
          }}>
          <TouchableHighlight
            disabled={level === 'Background' || isReadOnly }
            onPress={onEditPattern}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'left',
                marginTop: 7,
              }}>
              <Image
                style={{width: 30, height: 20, margin: 5}}
                source={staticImageUrlMap[patternImageKey]}
              />
              <Text style={{marginTop: 10}}>{patternName}</Text>
              <Text style={{marginTop: 10}}>
                {' '}
                / {typeof patternOpacity === 'number' ? patternOpacity : ''}%
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View
          style={{
            flex: 3,
            margin: 2,
            flexDirection: 'row',
            backgroundColor: '#f1f1f1',
            alignItems: 'left',
            justifyContent: 'left',
          }}>
          <TouchableHighlight
            disabled={backgroundColor === null || isReadOnly}
            onPress={onEditColor}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'left',
                marginBottom: 6,
              }}>
              <View
                style={{
                  width: 30,
                  height: 20,
                  marginRight: 5,
                  marginTop: 10,
                  backgroundColor: backgroundColor,
                }}
              />
              <Text style={{marginTop: 15}}>
                {backgroundColor? backgroundColor.toUpperCase(): ''}{' '}
                {JSON.stringify(isColorMetallic) === 'true' ? 'M' : ''}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            margin: 2,
            backgroundColor: '#f1f1f1',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {level !== 'Background' && !isReadOnly && (
            <TouchableHighlight onPress={onToggleVisible}>
              <Image
                style={{width: 20, height: 20, marginTop: 5, marginLeft: 5}}
                source={
                  !isVisible
                    ? require('../../assets/checkbox_blank_outline_icon_139814.png')
                    : require('../../assets/checkbox_icon_151467.png')
                }
              />
            </TouchableHighlight>
          )}
          {level !== 'Background' && !isReadOnly &&  (
            <TouchableHighlight onPress={onDelete}>
              <Image
                style={{width: 20, height: 20, marginTop: 5, marginLeft: 3}}
                source={require('../../assets/trash-can-black-symbol_icon-icons.com_72914.png')}
              />
            </TouchableHighlight>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
  },
});

export default Layer;
