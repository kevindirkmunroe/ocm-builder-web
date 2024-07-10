import React from 'react';
import { Dimensions, Image, View } from "react-native";
import convert from 'color-convert';

import { staticImageUrlMap } from "../../utils/AssetManager";

export default function CompositeLayerViewStack({layers}){

  let currZindex = 0;
  const {width, height} = Dimensions.get('window');

  return (
    <View>
        {layers.map(oneLayer => {
            //
            const rgba =  convert.hex.rgb(oneLayer.backgroundColor);
            const rgbaStr = rgba ? `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${oneLayer.patternOpacity / 100})` : 'rgba(0,0,0,0.0)';
            return (
              (oneLayer.isVisible || oneLayer.level === 'Background') &&
              <View>
                <View style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: rgbaStr,
                  zIndex: currZindex,
                  width: width * 0.5,
                  height: 100,
                  borderWidth: 10,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10
                }} />
                <Image style={{
                  zIndex: ++currZindex,
                  backgroundColor: 'transparent',
                  borderWidth: 10,
                  borderColor: '#ADAD86',
                  width: width * 0.5,
                  height: 100,
                  opacity: oneLayer.level === 'Background' ? 1: 0.3,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
                       source={staticImageUrlMap[oneLayer.patternImageKey]}>
                </Image>
              </View>
            );
        })}
      </View>
  )
}
