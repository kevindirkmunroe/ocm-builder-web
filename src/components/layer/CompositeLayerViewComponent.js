import React from "react";
import { Dimensions, View } from "react-native";
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
                        (oneLayer.isMetallic ? require('../../assets/printRollers/metallicPaint.png') :
                            require('../../assets/printRollers/blank.png')
                        ):
                        staticImageUrlMap[oneLayer.patternImageKey]}
                      color={oneLayer.backgroundColor}
                    >
                    </ReactImageTint>
                  </View>
            );
        })}
      </View>
  )
}
