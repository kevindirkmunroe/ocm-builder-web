import React from 'react';
import { Dimensions, Text, Image, View } from "react-native";

import { staticImageUrlMap } from "../../utils/AssetManager";
import convert from "color-convert";

export default function CompositeLayerViewStackClassic({layers}){

  let currZIndex = 0;
  const {width, height} = Dimensions.get('window');

  return (
    <View>
        {layers.map(oneLayer => {
            const rgba =  convert.hex.rgb(oneLayer.backgroundColor);
            const rgbaStr = rgba ? `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 0.2)` : 'rgba(0,0,0,0.0)';
            return (
              (oneLayer.isVisible || oneLayer.level === 'Background') &&
              <View
                style={{
                  marginTop: 5,
                  backgroundColor: rgbaStr,
                  top: 0,
                  left: 0,
                  position: 'absolute',
                  zIndex: currZIndex + 1,
                }}>
                <Image
                  style={{
                    borderRadius: 10,
                    width: width * 0.6,
                    height: height * 0.2,
                    opacity: oneLayer.patternOpacity / 100,
                    marginLeft: (currZIndex++ - 1.3) * 3,
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
