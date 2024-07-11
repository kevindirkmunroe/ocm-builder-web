import React from "react";
import { Dimensions, Image, View } from "react-native";
import convert from "color-convert";

import { staticImageUrlMap } from "../../utils/AssetManager";

const PDF_CONTAINER_COMPONENT_ID = 'pdf-container';

export function deepCloneLayerStack(layers){
  return layers.map((oneLayer) => {
    return { ...oneLayer };
  });
}

export default function CompositeLayerViewComponent({layers}){

  let currZIndex = 0;
  const {width, height} = Dimensions.get('window');

  return (
    <View id={PDF_CONTAINER_COMPONENT_ID}>
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
