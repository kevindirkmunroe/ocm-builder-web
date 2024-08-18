import React, { useState } from "react";
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground, FlatList, StyleSheet,
} from "react-native";
import { Slider } from '@react-native-assets/slider'

import { getOCMPrintRollers, staticImageUrlMap } from "../../utils/AssetManager";

function PrintRollerSelector({title, onSelectPrintRoller, initSelectedItem, onSelectOpacity, initSelectedOpacity}){
  const {width, height} = Dimensions.get('window');

  const [selectedItem, setSelectedItem ] = useState(initSelectedItem);
  const [opacity, setOpacity] = useState(initSelectedOpacity);

  const onOpacityChanged = (newValue) => {
    setOpacity(newValue);
    onSelectOpacity(newValue);
  }

  return(
    <View>
        <View style={{flex: 1, marginTop: 10, justifyContent: 'top', alignItems: 'center'}}>
          { title &&
            <Text style={{width: width * 0.6, padding: 2, fontFamily: 'Futura', marginBottom: 5, backgroundColor: 'lightgray'}}>{title}</Text>
          }
          {/*
            Table of Print Roller images
          */}
          <View style={{width: width * 0.6, height: height * 0.25, backgroundColor: 'lightgray'}}>
            {/* Preview Image */}
            <ImageBackground style={{width: width * 0.6, height: 40}} source={selectedItem? staticImageUrlMap[selectedItem.key]: null}>
              <View style={{ position: 'absolute', top: 8, left: 8, right: 0, bottom: 0, justifyContent: 'left', alignItems: 'left'}}>
                <Text style={{
                  alignSelf: 'flex-start',
                  backgroundColor:'white',
                  borderWidth: 1,
                  borderColor: 'black',
                  padding: 2,
                  fontSize: 16,
                  color: selectedItem? 'black': 'darkgray'}}>{selectedItem? selectedItem.name : 'No Pattern Selected'}
                </Text>
              </View>
            </ImageBackground>

            {/* Print Roller list */}
            <FlatList
              data={getOCMPrintRollers()}
              scrollEnabled={true}
              showsVerticalScrollIndicator={true}
              initialNumToRender={4}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity onPress={()=> {
                    setSelectedItem(item);
                    onSelectPrintRoller(item);
                  }
                  }>
                    <View style={{ backgroundColor: 'rgba(247, 247, 247, 1.0)', margin: 5, flexDirection: 'row', width: width * 0.5 }}>
                      <Image style={{width: 50, height: 50}} source={staticImageUrlMap[item.key]} />
                      <Text style={styles.item}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }}
              renderSectionHeader={({section}) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
              )}
              keyExtractor={item => `basicListEntry-${item.name}`}/>
          </View>

          <View style={{ backgroundColor: '#d9d9d9', marginTop: 10, flexDirection: 'column', width: width * 0.6, height: 40}}>
            {/* Opacity Slider */}
            <View style={{marginTop: 6, width: width * 0.6, flexDirection: 'column'}}>
              <Text style={{fontFamily: 'Futura', fontSize: 16, paddingLeft: 5}}>Opacity {opacity}%</Text>
              <Slider
                value={opacity}                   // set the current slider's value
                minimumValue={0}                  // Minimum value
                maximumValue={100}                // Maximum value
                step={5}                          // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
                minimumTrackTintColor='grey'      // The track color before the current value
                maximumTrackTintColor='grey'      // The track color after the current value
                onValueChange={onOpacityChanged}
                thumbSize={20}
                thumbTintColor='darkcyan'/>
            </View>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    fontFamily: 'Futura',
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    width: '80%',
    padding: 20,
    textAlign: 'center'
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
    fontFamily: 'Futura',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionHeader: {
    fontFamily: 'Futura',
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
    fontSize: 16,
    height: 44,
  },
});

export default PrintRollerSelector;
