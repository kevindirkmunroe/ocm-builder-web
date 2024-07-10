import React from 'react';
import { Dimensions, Image, ImageBackground, Text, View } from "react-native";
import { staticImageUrlMap } from "../../utils/AssetManager";

export default function CompositeLayerViewStack({layers}){

  let currZindex = 0;
  const {width, height} = Dimensions.get('window');

  return (
    <View>
        {layers.map(oneLayer => {
            return (
              (oneLayer.isVisible || oneLayer.level === 'Background') &&
              <View>
                <View style={{
                  backgroundColor: oneLayer.backgroundColor,
                  opacity: 0.4,
                  zIndex: currZindex,
                  width: width * 0.6,
                  height: 100,
                  borderWidth: 10,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10
                }} />
                <Image style={{
                  position: 'absolute',
                  zIndex: ++currZindex,
                  backgroundColor: '#d9d9d9',
                  borderWidth: 10,
                  borderColor: '#ADAD86',
                  width: width * 0.6,
                  height: 100,
                  opacity: oneLayer.patternOpacity,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10
                }}
                       source={staticImageUrlMap[oneLayer.patternImageKey]}>
                </Image>
              </View>
            );
        })}
      </View>
  )
}
