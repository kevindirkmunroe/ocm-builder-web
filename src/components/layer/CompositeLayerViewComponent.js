import React from "react";
import { Dimensions, Image, View } from "react-native";
import convert from "color-convert";

import { staticImageUrlMap } from "../../utils/AssetManager";
import {isAndroidWebBrowser as isAndroid } from "../pages/layout/BasePageLayout";

export function deepCloneLayerStack(layers){
  return layers.map((oneLayer) => {
    return { ...oneLayer };
  });
}

export default function CompositeLayerViewComponent({layers, setHeight}){

  let currZIndex = 0;
  const {width, height} = Dimensions.get('window');

  const layerHeight = isAndroid() ? 0.12 : 0.25;
  const layerGap =  (0.45 * height) - ( layers.length * 40);

  return (
    <View>
        {layers.map(oneLayer => {
            const rgba =  convert.hex.rgb(oneLayer.backgroundColor);
            const rgbaStr = rgba ? `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${oneLayer.patternOpacity / 100})` : 'rgba(0,0,0,0.0)';
            return (
              (oneLayer.isVisible || oneLayer.level === 'Background') &&
              <View
                style={{
                  marginTop: 5,
                  backgroundColor: oneLayer.backgroundColor,
                  opacity: 1 - (0.2 * (currZIndex + 1)),
                  borderRadius: 10,
                  top: 0,
                  left: 0,
                  position: 'absolute',
                  zIndex: currZIndex + 1,
                }}>
                <Image
                  style={{
                    borderRadius: 10,
                    width: width * 0.8,
                    height: setHeight? setHeight : isAndroid() ? height * 0.12 : layerGap,
                    opacity: oneLayer.patternOpacity / 100,
                    marginLeft: (currZIndex++ - 1) * 3,
                  }}
                  source={staticImageUrlMap[oneLayer.patternImageKey]}
                >
                </Image>
              </View>
            );
        })}
      </View>
  )
}
