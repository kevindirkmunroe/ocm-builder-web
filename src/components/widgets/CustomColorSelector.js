import React, { useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import ColorPicker from 'react-native-wheel-color-picker'
import ToggleButton from "react-native-toggle-button";


function CustomColorSelector({title, onSelectColor, initSelectedColor, onSelectMetallic, initMetallic}){

  const [colorState, setColorState] =
    useState({currentColor: initSelectedColor, swatchesOnly: false, swatchesLast: true, swatchesEnabled: false, disc: false})

  const [typedColor, setTypedColor] = useState(initSelectedColor);

  const onColorChange = (newColor) => {
    onSelectColor(newColor);
    setTypedColor(newColor.substring(1).toUpperCase());
  }

  const onMetallicChange = (newMetallicSetting) => {
    onSelectMetallic(newMetallicSetting);
  }

  const onColorChangeComplete = (newColor) => {
    console.log(`CustomColorSelector: new color=${JSON.stringify(newColor)}`);
    onSelectColor(newColor);
  }

  const onTypedColorChangeComplete = () => {
    changeColorIfHex(typedColor);
  }

  const changeColorIfHex = (newColor) => {
    if(newColor.search(/^[0-9a-f]{6}/i) >= 0){
      console.log(`CustomColorSelector: new typed color=${JSON.stringify(typedColor)}`);
      onSelectColor('#' + newColor);
      colorState.currentColor = '#' + newColor;
    }else{
      alert(`"${newColor}" is not a hexidecimal number.`);
    }
  }

  return(
    <View style={{flex: 1, marginTop: 10, justifyContent: 'top', alignItems: 'center'}}>
        <View style={styles.colorContainerItem}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: 24, height: 20,backgroundColor: initSelectedColor, marginTop: 3, marginRight: 5, borderWidth: 2 }}></View>
            <Text style={[styles.btnClrAlt, {fontSize: 20}]}>#&nbsp;</Text>
            <TextInput style={{flex: 1, borderWidth: 2, borderColor: 'black', fontFamily: 'Futura', fontSize: 16, marginRight: 6}} onChangeText={setTypedColor} value={typedColor ? typedColor.toUpperCase():''}/>
            <TouchableHighlight
              style={{borderColor: 'black', borderWidth: 2, borderRadius: 4, paddingLeft: 5, paddingRight: 5}}
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
        </View>
      {/*
      <View style={{ flex:1 , flexDirection: 'row', marginTop: 10, height: 20}}>
        <Text style={{ fontSize: 18, fontFamily: 'Futura', marginRight: 10}}>Metallic</Text>
        <ToggleButton
          initial={initMetallic}
          primaryText="On"
          secondaryText="Off"
          onPress={(isToggled: boolean) => {
            onMetallicChange(isToggled);
          }}
        />
      </View>*/}
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
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  colorContainerItem: {
    width: '60%', // is 50% of container width
    alignItems: 'center',
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
