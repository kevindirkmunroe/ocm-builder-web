import React, { useState } from "react";
import { ScrollView, Text, View, Image, Dimensions } from "react-native";
import CompositeLayerViewComponent from "../layer/CompositeLayerViewComponent";
import { staticImageUrlMap } from "../../utils/AssetManager";
import { ReactImageTint } from "react-image-tint";
import { isAndroidWebBrowser as isAndroid } from "../pages/layout/BasePageLayout";
import { isMobile } from "react-device-detect";
const {width, height} = Dimensions.get('window');

export function CompositePlusSingleLayerViewer({layerIdx, compositeLayers}){
  let oneLayerZIdx = 0;
  let zIdx = 0;
  return(
    <ScrollView style={{height: 100}}>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={{flex: 2, padding: 4, width: 100, fontStyle: 'italic', fontSize: 12}}>Layer {layerIdx === 0 ? 'B' : layerIdx}:</Text>
          <Image style={{
            flex: 14,
            width: '100%',
            height: 60,
            borderRadius: 3,
            opacity: compositeLayers[layerIdx].patternOpacity / 100,
            tintColor: compositeLayers[layerIdx].backgroundColor,
          }} source={staticImageUrlMap[compositeLayers[layerIdx].patternImageKey]}/>
      </View>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={{flex: 1, padding: 4, width: 100, fontStyle: 'italic', fontSize: 12, marginTop: 10}}>Composite Preview:</Text>
        <View style={{marginTop: 5, flex: 7}}>
          {compositeLayers.map(oneLayer => {
            if(oneLayer.isColorMetallic){
              return (
                <>
                  <View style={{
                    position: 'absolute',
                    zIndex: zIdx++,
                    top: 6,
                    width: '100%',
                    height: 94,
                    borderRadius: 3,
                    background: '--shine-deg: 45deg; linear-gradient(45deg, #999 5%, #fff 10%, #ccc 30%, #ddd 50%, #ccc 70%, #fff 80%, #999 95%);'
                  }}>
                    <Image style={{
                      width: '100%',
                      height: 94,
                      borderRadius: 3,
                      opacity: oneLayer.patternOpacity / 100,
                      tintColor: oneLayer.backgroundColor,
                    }} source={staticImageUrlMap[oneLayer.patternImageKey]}/>
                  </View>
                  <View style={{
                    position: 'absolute',
                    zIndex: zIdx++,
                    top: 6,
                    width: '100%',
                    height: 94,
                    borderRadius: 3
                  }}>
                    <Image style={{
                      width: '100%',
                      height: 94,
                      borderRadius: 3,
                      opacity: 0.3,
                    }} source={staticImageUrlMap["metallicLayer"]}/>
                  </View>
                </>
              )
            }
            return (oneLayer.isVisible || oneLayer.level === 'Background') && (
              <View style={{
                position: 'absolute',
                zIndex: zIdx++,
                top: 6,
                width: '100%',
                height: 94,
                borderRadius: 3
              }}>
                <Image style={{
                  width: '100%',
                  height: 94,
                  borderRadius: 3,
                  opacity: oneLayer.patternOpacity / 100,
                  tintColor: oneLayer.backgroundColor,
                }} source={staticImageUrlMap[oneLayer.patternImageKey]}/>
              </View>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}
