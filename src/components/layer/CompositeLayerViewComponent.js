import React from "react";
import { Dimensions, Image, ImageBackground, View } from "react-native";
import { ReactImageTint } from "react-image-tint";

import { staticImageUrlMap } from "../../utils/AssetManager";
import {isAndroidWebBrowser as isAndroid } from "../pages/layout/BasePageLayout";

export function deepCloneLayerStack(layers){
  return layers.map((oneLayer) => {
    return { ...oneLayer };
  });
}

export default function CompositeLayerViewComponent({layers, isModal}){

  let currZIndex = 0;
  const {width, height} = Dimensions.get('window');

  // TODO: Metallic should overlay metallic print
  return (
    <View>
        {layers.map(oneLayer => {
            return (
              (oneLayer.isVisible || oneLayer.level === 'Background') &&
              ( oneLayer.level === 'Background' ?
                  <ImageBackground source={staticImageUrlMap['BLANK']}
                                   style={{width: width * 0.4,
                                     height: isAndroid() ? height * 0.15 : height * 0.25}}>
                    <View style={{marginTop: isAndroid()? 5 : 40, justifyContent: 'center'}}>
                      <View style={{
                        backgroundColor: oneLayer.backgroundColor,
                        zIndex: 0,
                        maxWidth: width * (isModal? 0.77 : 0.8)
                      }} />
                      <Image style={{
                        backgroundColor: '#d9d9d9',
                        position: 'absolute',
                        zIndex: 1,
                        maxWidth: width * (isModal? 0.77 : 0.8),
                        opacity: 0.4
                      }}
                             source={oneLayer.isColorMetallic ? staticImageUrlMap['metallicPaint'] :staticImageUrlMap['BLANK']}>
                      </Image>
                  </View>
                  </ImageBackground>
                  :
                  <View
                    style={{
                      flex: 1,
                      marginTop: 5,
                      borderRadius: 10,
                      top: 0,
                      left: 0,
                      marginLeft: isAndroid() ? 0 : 4,
                      maxWidth: width * (isModal? 0.77 : 0.8),
                      position: 'absolute',
                      opacity: oneLayer.patternOpacity / 100,
                      zIndex: currZIndex + 1,
                    }}>
                    <ReactImageTint
                      src={oneLayer.level === 'Background' ?
                        (oneLayer.isColorMetallic ? staticImageUrlMap['metallicPaint'] :
                            staticImageUrlMap['BLANK']
                        ):
                        staticImageUrlMap[oneLayer.patternImageKey]}
                      color={oneLayer.backgroundColor}
                    >
                    </ReactImageTint>
                  </View>
              )
            );
        })}
      </View>
  )
}
