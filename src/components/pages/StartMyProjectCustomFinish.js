import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, TouchableHighlight, Image } from "react-native";
import { useNavigate } from 'react-router-dom';

import PrintRollerSelector from "../widgets/PrintRollerSelector";
import { staticImageUrlMap } from "../../utils/AssetManager";
import CustomColorSelector from "../widgets/CustomColorSelector";
import HomeNavButton from "../widgets/HomeNavButton";

function StartMyProjectCustomFinish(){

  const ENUM_PATTERN = 'PATTERN';
  const ENUM_COLOR = 'COLOR';
  const [selectedView, setSelectedView] = useState(ENUM_PATTERN);

  const navigate = useNavigate();
  const {width, height} = Dimensions.get('window');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isColorMetallic, setIsColorMetallic] = useState(false);
  const [opacity, setOpacity] = useState(100);

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
    setSelectedView(ENUM_PATTERN);
  }

  let onSelectColorTab = () => {
    setSelectedView(ENUM_COLOR);
  }

  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.6 }}>
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>

          {/* Breadcrumbs to current state */}
          <View style={{flex: 1, width: width * 0.6, flexDirection: 'row', alignItems: 'center', marginRight: 18, marginTop: 16}}>
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
            <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 7 , color: 'gray'}}>My Project</Text>
            <Text style={{fontSize: 16, fontFamily: 'Futura', marginLeft: 5, marginTop: 7, color: 'gray'}}> > </Text>
            <Image style={{ width: 24, height: 24, marginTop: 4}} source={require('../../assets/customize.png')} />
            <Text style={{fontSize: 16, color: 'green', fontWeight: 'bold', marginLeft: 1, marginTop: 7}}> Custom Background</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          {/* Pattern and Color Tabs */}
          <TouchableHighlight
            style={selectedView === ENUM_PATTERN ? styles.tinyBtnSelected: styles.tinyBtn}
            underlayColor="#676752"
            onPress={onSelectPatternTab}>
            <Text style={styles.btnClr}>Pattern</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={selectedView === ENUM_COLOR ? styles.tinyBtnSelected: styles.tinyBtn}
            underlayColor="#676752"
            onPress={onSelectColorTab}>
            <Text style={styles.btnClr}>Color</Text>
          </TouchableHighlight>
        </View>

        {/* Selector to Tab body based on selectedView */}
        {selectedView === ENUM_PATTERN && <PrintRollerSelector title={''}
                                                               onSelectPrintRoller={setSelectedItem}
                                                               initSelectedItem={selectedItem}
                                                               onSelectOpacity={setOpacity}
                                                               initSelectedOpacity={opacity}/>}

        {selectedView === ENUM_COLOR && <CustomColorSelector
          title={''}
          onSelectColor={setSelectedColor}
          initSelectedColor={selectedColor}
          onSelectMetallic={setIsColorMetallic}
          initMetallic={isColorMetallic} /> }
        <View style={{width: 80, height: 20, margin: 2, alignItems: 'center', backgroundColor: selectedColor}}>
          <Text>{selectedColor}</Text>
        </View>

        {/* Preview Composite image */}
        <View>
          <View style={{
            backgroundColor: selectedColor,
            zIndex: 0,
            width: width * 0.6,
            height: height * 0.3,
            borderWidth: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10}} />
          <Image style={{
            position: 'absolute',
            zIndex: 1,
            backgroundColor: '#d9d9d9',
            borderWidth: 10,
            borderColor:'#ADAD86',
            width: width * 0.6,
            height: height * 0.3,
            opacity: 0.4,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10}}
                 source={selectedItem? staticImageUrlMap[selectedItem.key]: null}>
          </Image>
        </View>

        {/* Bottom Navigation */}
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          <TouchableHighlight
            style={styles.tinyBtn2Alt}
            underlayColor="#f0f4f7"
            onPress={onStartOver}>
            <Text style={styles.btnClrAlt}>Start Over</Text>
          </TouchableHighlight>
          <TouchableHighlight
            disabled={selectedItem === null || selectedColor === null}
            style={styles.tinyBtn2}
            underlayColor="#f0f4f7"
            onPress={onContinue}>
            <Text style={styles.btnClr}>Continue</Text>
          </TouchableHighlight>
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
    width:  80,
    height: 50,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#dddddd',
    justifyContent: 'left',
    alignItems: 'left',
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
  tinyBtnSelected: {
    width:  80,
    height: 50,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#ADAD86',
    justifyContent: 'left',
    alignItems: 'left',
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
    fontSize: 16,

    color: '#fff',
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
