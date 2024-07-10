import React, { useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import ColorPicker from 'react-native-wheel-color-picker'
import ToggleButton from "react-native-toggle-button";


function CustomColorSelector({title, onSelectColor, initSelectedColor, onSelectMetallic, initMetallic}){

  const {width, height} = Dimensions.get('window');

  const [colorState, setColorState] =
    useState({currentColor: initSelectedColor, swatchesOnly: false, swatchesLast: true, swatchesEnabled: true, disc: false})
  const onColorChange = (newColor) => {
    onSelectColor(newColor);
  }

  const onMetallicChange = (newMetallicSetting) => {
    onSelectMetallic(newMetallicSetting);
  }

  const onColorChangeComplete = (newColor) => {
    onSelectColor(newColor);
  }

  return(
    <View style={{flex: 1, marginTop: 5, justifyContent: 'center', alignItems: 'center', width: width * 0.6, backgroundColor: '#ADAD86', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
      <View style={styles.colorContainerItem}>
        <ColorPicker
          ref={r => { this.picker = r }}
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
          useNativeLayout={false}
        />
      </View>
      <View style={{ flex:1 , flexDirection: 'row', marginTop: 18}}>
        <Text style={{ fontSize: 18, fontFamily: 'Futura', marginRight: 10}}>Metallic</Text>
        <ToggleButton
          initial={initMetallic}
          primaryText="On"
          secondaryText="Off"
          onPress={(isToggled: boolean) => {
            onMetallicChange(isToggled);
          }}
        />
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
  colorContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  colorContainerItem: {
    width: '50%', // is 50% of container width
    alignItems: 'flex-end',
  },
  smallBtn: {
    backgroundColor: '#5DA75E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#5DA75E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 10,
  },
  btnClr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
