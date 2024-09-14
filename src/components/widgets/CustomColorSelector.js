import React, { useState } from "react";
import {isMobile} from 'react-device-detect';

import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight, TouchableOpacity,
  View,
} from "react-native";
import ColorPicker from 'react-native-wheel-color-picker'


function CustomColorSelector({onSelectColor, initSelectedColor, onSelectMetallic, initMetallic, layerLevel}){

  const [colorState, setColorState] =
    useState({currentColor: initSelectedColor, swatchesOnly: false, swatchesLast: true, swatchesEnabled: false, disc: false})

  const [typedColor, setTypedColor] = useState(initSelectedColor);

  const onColorChange = (newColor) => {
    onSelectColor(newColor);
    setTypedColor(newColor.substring(1).toUpperCase());
  }

  const onMetallicChange = () => {
    onSelectMetallic(!initMetallic);
  }

  const onColorChangeComplete = (newColor) => {
    onSelectColor(newColor);
  }

  const onTypedColorChangeComplete = () => {
    changeColorIfHex(typedColor);
  }

  const changeColorIfHex = (newColor) => {
    if(newColor.search(/^[0-9a-f]{6}/i) >= 0){
      onSelectColor('#' + newColor);
      colorState.currentColor = '#' + newColor;
    }else{
      alert(`"${newColor}" is not a hexidecimal number.`);
    }
  }

  return(
    <View style={{flex: 1, marginTop: 10, marginLeft: 5, justifyContent: 'top', alignItems: isMobile? 'center': 'left'}}>
        <View style={styles.colorContainerItem}>
          <View style={{flex: 1, flexDirection: 'row', maxHeight: 20}}>
            <View style={{width: 24, height: 30,backgroundColor: initSelectedColor, marginRight: 5, borderWidth: 2 }}></View>
            <Text style={[styles.btnClrAlt, {fontSize: 20}]}>#&nbsp;</Text>
            <TextInput style={{flex: 1, borderWidth: 2, borderColor: 'black', fontFamily: 'Futura', fontSize: 16, height: 30, width: 70, padding: 2,  marginRight: 6}} onChangeText={setTypedColor} value={typedColor ? typedColor.toUpperCase():''}/>
            <TouchableHighlight
              style={{borderColor: 'black', borderWidth: 2, borderRadius: 4, paddingLeft: 5, paddingRight: 5, height: 30}}
              onPress={onTypedColorChangeComplete}>
              <Text style={styles.btnClrAlt}>Set</Text>
            </TouchableHighlight>
          </View>
          <ColorPicker
            ref={r => { this.picker = r }}
            gapSize={0}
            color={colorState.currentColor}
            swatchesOnly={colorState.swatchesOnly}
            onColorChange={onColorChange}
            onColorChangeComplete={onColorChangeComplete}
            thumbSize={40}
            sliderSize={30}
            noSnap={true}
            row={false}
            swatchesLast={colorState.swatchesLast}
            swatches={colorState.swatchesEnabled}
            discrete={colorState.disc}
            wheelLodingIndicator={<ActivityIndicator size={40} />}
            sliderLodingIndicator={<ActivityIndicator size={20} />}
            useNativeDriver={false}
            useNativeLayout={true}
          />
          <View style={{marginTop: 5, flexDirection: 'row-reverse'}}>
            <Text style={[styles.btnClrAlt, {fontSize: 18, marginTop: 3}]}>&nbsp;&nbsp;Metallic</Text>
            <TouchableOpacity onPress={onMetallicChange}>
              <Image
                style={{width: 20, height: 20, marginTop: 4, marginLeft: 3}}
                source={
                  !initMetallic
                    ? require('../../assets/checkbox_blank_outline_icon_139814.png')
                    : require('../../assets/checkbox_icon_151467.png')
                }
              />
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    width: '80%',
    padding: 20,
    textAlign: 'center'
  },
  btnClrAlt: {
    fontFamily: 'Futura',
    fontSize: 16,
    color: 'black',
  },
  colorContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  colorContainerItem: {
    width: '60%',
    alignItems: 'flex-start',
  },
  belowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    height: 200,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#dadad0',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default CustomColorSelector;
