import React, { useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import ColorPicker from 'react-native-wheel-color-picker'

function CustomColorSelector({title, onSelectColor, initSelectedColor}){

  const {width, height} = Dimensions.get('window');

  const [colorState, setColorState] =
    useState({currentColor: initSelectedColor, swatchesOnly: false, swatchesLast: true, swatchesEnabled: true, disc: false})

  const onColorChange = (newColor) => {
    // console.log(`New Color: ${JSON.stringify(newColor)}`);
    onSelectColor(newColor);
  }

  const onColorChangeComplete = (newColor) => {
    console.log(`New Color Complete: ${JSON.stringify(newColor)}`);
    onSelectColor(newColor);
  }

  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, width: width * 0.6, backgroundColor: '#ADAD86', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
        <ColorPicker
          ref={r => { this.picker = r }}
          color={colorState.currentColor}
          swatchesOnly={colorState.swatchesOnly}
          onColorChange={onColorChange}
          onColorChangeComplete={onColorChangeComplete}
          thumbSize={40}
          sliderSize={40}
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
  smallBtn: {
    backgroundColor: '#209bfc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#209bfc',
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
