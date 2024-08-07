import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, TouchableHighlight, Image, ImageBackground } from "react-native";
import { useNavigate } from 'react-router-dom';

import PrintRollerSelector from "../widgets/PrintRollerSelector";
import { staticImageUrlMap } from "../../utils/AssetManager";
import CustomColorSelector from "../widgets/CustomColorSelector";
import HomeNavButton from "../widgets/HomeNavButton";
import { getBaseLayout, isAndroidWebBrowser as isAndroid } from "./layout/BasePageLayout";

function StartMyProjectCustomFinish(){

  const ENUM_PATTERN = 'PATTERN';
  const ENUM_COLOR = 'COLOR';
  const [selectedView, setSelectedView] = useState(ENUM_COLOR);

  const navigate = useNavigate();
  const {width, height} = Dimensions.get('window');
  const [selectedItem, setSelectedItem] = useState({key: 'blank_print', name: 'BLANK'});
  const [selectedColor, setSelectedColor] = useState(null);
  const [isColorMetallic, setIsColorMetallic] = useState(false);
  const [opacity, setOpacity] = useState(100);

  const baseLayout = getBaseLayout();

  let onStartOver = () => {
    navigate('/start');
  }

  let onContinue = () => {
    navigate('/my-project',
      { state:
        { projectLayers:
            [{level: 'Background',
              patternName: selectedItem.name,
              patternImageKey: selectedItem.key,
              backgroundColor: selectedColor,
              patternOpacity: opacity,
              isColorMetallic}
            ]
        }
    });
  }

  let onSelectPatternTab = () => {
    setSelectedView(ENUM_COLOR);
  }

  let onSelectColorTab = () => {
    setSelectedView(ENUM_COLOR);
  }

  return (
    <View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <View style={baseLayout.header}>
          {/* Breadcrumbs to current state */}
          <View style={{flex: 1, width: isAndroid() ? width * 0.95 : width * 0.8, flexDirection: 'row',
            justifyContent : 'center', marginLeft: isAndroid() ? 0 : width * 0.1,
            marginTop: isAndroid() ? 2 : 10}}>
            <HomeNavButton />
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Futura',
                marginLeft: 5,
                marginTop: 7,
                color: 'gray',
              }}>
              {' '}
              >{' '}
            </Text>
            <Image style={{ width: 20, height: 20, marginTop: 8, marginLeft: 5 }} source={require('../../assets/layer-group.png')} />
            <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 7 , color: 'gray'}}>Background</Text>
            <Text style={{fontSize: 16, fontFamily: 'Futura', marginLeft: 5, marginTop: 7, color: 'gray'}}> > </Text>
            <Image style={{ width: 24, height: 24, marginTop: 4}} source={require('../../assets/customize.png')} />
            <Text style={{fontSize: 16, color: 'green', fontWeight: 'bold', marginLeft: 1, marginTop: 7}}> Custom</Text>
          </View>
        </View>
        <View style={baseLayout.main}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: isAndroid() ? 4: 0}}>

            {/* Pattern and Color Tabs */}
            {/* Background has no print pattern. TODO: remove code once confirmed
            <TouchableHighlight
              style={selectedView === ENUM_PATTERN ? styles.tinyBtnSelected: styles.tinyBtn}
              underlayColor="#676752"
              onPress={onSelectPatternTab}>
              <Text style={styles.btnClr}>Pattern</Text>
            </TouchableHighlight>
            */}
            <TouchableHighlight
              style={selectedView === ENUM_COLOR ? styles.tinyBtnSelected: styles.tinyBtn}
              underlayColor="#676752"
              onPress={onSelectColorTab}>
              <Text style={styles.btnClr}>Color</Text>
            </TouchableHighlight>
          </View>
          <View style={{flex: 1, flexBasis: '100%', flexDirection: 'column'}}>

            {/* Selector to Tab body based on selectedView */}
            {selectedView === ENUM_PATTERN && <View><PrintRollerSelector title={''}
                                                                   onSelectPrintRoller={setSelectedItem}
                                                                   initSelectedItem={selectedItem}
                                                                   onSelectOpacity={setOpacity}
                                                                         initSelectedOpacity={opacity}/></View>}

            {selectedView === ENUM_COLOR && <View><CustomColorSelector
              title={''}
              onSelectColor={setSelectedColor}
              initSelectedColor={selectedColor}
              onSelectMetallic={setIsColorMetallic}
              initMetallic={isColorMetallic} /></View> }
          </View>

          <View style={{marginTop: 50, flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>

            {/* Selected color */}
            <View style={{flexDirection: 'row', margin: 2, justifyContent: 'center'}}>
              <View style={{width: 24, height: 20,backgroundColor: selectedColor, marginTop: 3, marginRight: 5 }}></View>
              <Text style={[styles.btnClr, {color: 'black'}]}>
                {selectedColor ? selectedColor.toUpperCase() : 'No Color'} {isColorMetallic ? 'Metallic' : ''}
              </Text>
            </View>

            {/* Preview Composite image */}
            <ImageBackground source={isColorMetallic ? staticImageUrlMap['metallicPaint'] :staticImageUrlMap['BLANK']}
               style={{width: width * 0.6,
                 height: isAndroid() ? height * 0.15 : height * 0.2,
                 borderWidth: 10,
                 borderRadius: 5}}>
              <View style={{marginTop: 10, justifyContent: 'center'}}>
                <View style={{
                  backgroundColor: selectedColor,
                  zIndex: 0,
                  width: width * 0.6,
                  height: isAndroid() ? height * 0.15 : height * 0.2,
                  borderWidth: 10,
                  borderRadius: 5}} />
                <Image style={{
                  position: 'absolute',
                  zIndex: 1,
                  backgroundColor: '#d9d9d9',
                  borderWidth: 10,
                  borderColor:'#ADAD86',
                  width: width * 0.6,
                  height: isAndroid() ? height * 0.15 : height * 0.2,
                  opacity: 0.4,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10}}
                       source={selectedItem? staticImageUrlMap[selectedItem.key]: null}>
                </Image>
              </View>
            </ImageBackground>
          </View>
        </View>

         {/* Bottom Navigation */}
        <View style={[baseLayout.footer, {marginBottom: isAndroid() ? 3 : 14}]}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', height: 60, marginTop: 10}}>
            <TouchableHighlight
              style={styles.tinyBtn2Alt}
              underlayColor="#f0f4f7"
              onPress={onStartOver}>
              <Text style={styles.btnClrAlt}>Start Over</Text>
            </TouchableHighlight>
            <TouchableHighlight
              disabled={selectedItem === null || selectedColor === null}
              style={[styles.tinyBtn2, {opacity: (selectedItem === null || selectedColor === null ? 0.4 : 1)}]}
              underlayColor="#f0f4f7"
              onPress={onContinue}>
              <Text style={styles.btnClr}>Continue</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    fontFamily: 'Futura',
    mainText: {
    color: 'black',
    fontSize: 30,
    width: '40%',
    padding: 10,

  },
  tinyBtn: {
    width:  100,
    height: 30,
    marginLeft: 10,
    marginTop: 2,
    backgroundColor: '#dddddd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
  },
  tinyBtnSelected: {
    width:  100,
    height: 30,
    marginLeft: 10,
    marginTop: 2,
    backgroundColor: '#ADAD86',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
  },
  tinyBtn2: {
    marginLeft: 10,
    marginTop: 3,
    width: 120,
    height: 45,
    padding: 10,
    backgroundColor: '#5DA75E',
    justifyContent: 'left',
    alignItems: 'left',
    borderRadius: 5
  },
  tinyBtn2Alt: {
    marginLeft: 10,
    marginTop: 3,
    width: 180,
    height: 45,
    padding: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btn: {
    width:  Dimensions.get('window').width * 0.8,
    backgroundColor: '#5DA75E',
    justifyContent: 'left',
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
  },
  btnClr: {
    fontFamily: 'Futura',
    fontSize: 20,
    color: '#fff',
  },
  btnClrAlt: {
    fontSize: 20,
    fontFamily: 'Futura',
    color: 'black',
  },
  btnBlk: {
    fontFamily: 'Futura',
    marginTop: 20,
    fontSize: 30,

    color: 'black',
  },
  belowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default StartMyProjectCustomFinish;
