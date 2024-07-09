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
            <View
              style={{
                position: 'absolute',
                zIndex: currZindex++,
                backgroundColor: oneLayer.backgroundColor,
                maxWidth: '60%',
              }}>
              <Image style={{
                position: 'absolute',
                zIndex: currZindex++,
                borderWidth: 10,
                width: width * 0.5,
                height: height * 0.3,
                borderColor:'#ADAD86',
                opacity: oneLayer.patternOpacity,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10}}
                     source={oneLayer? staticImageUrlMap[oneLayer.patternImageKey]: null}>
              </Image>
            </View>
          );
        })}
      </View>
  )
}
