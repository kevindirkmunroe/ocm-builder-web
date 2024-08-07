import React from "react";
import { Dimensions, Image, ImageBackground, View } from "react-native";
import convert from "color-convert";
import { ReactImageTint } from "react-image-tint";

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

  // TODO: Metallic should overlay metallic print
  return (
    <View>
        {layers.map(oneLayer => {
            const rgba =  convert.hex.rgb(oneLayer.backgroundColor);
            const rgbaStr = rgba ? `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${oneLayer.patternOpacity / 100})` : 'rgba(0,0,0,0.0)';
            const rotate = oneLayer.level === 'Background' ? 0 : 90;
            return (
              (oneLayer.isVisible || oneLayer.level === 'Background') &&
                  <View
                    style={{
                      marginTop: 5,
                      borderRadius: 10,
                      top: 0,
                      left: 0,
                      maxWidth: width * 0.8,
                      position: 'absolute',
                      zIndex: currZIndex + 1,
                    }}>
                    <ReactImageTint
                      src={oneLayer.level === 'Background' ? require('../../assets/printRollers/blank-tiny.png') :
                        (oneLayer.level === 1 ? require('../../assets/printRollers/sandobi_1_w_trans.png') :
                          require('../../assets/printRollers/sandobi_2_w_trans.png'))}
                      color={oneLayer.backgroundColor}
                    >
                    </ReactImageTint>
                  </View>
            );
        })}
      </View>
  )
}
