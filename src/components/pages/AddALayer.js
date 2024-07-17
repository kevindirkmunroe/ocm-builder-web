import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, TouchableHighlight, Image } from "react-native";
import { useLocation, useNavigate } from "react-router-dom";

import PrintRollerSelector from "../widgets/PrintRollerSelector";
import { staticImageUrlMap } from "../../utils/AssetManager";
import CustomColorSelector from "../widgets/CustomColorSelector";
import HomeNavButton from "../widgets/HomeNavButton";
import MyProjectNavButton from "../widgets/MyProjectNavButton";

function AddALayer(){

  const ENUM_PATTERN = 'PATTERN';
  const ENUM_COLOR = 'COLOR';
  const [selectedView, setSelectedView] = useState(ENUM_PATTERN);

  const navigate = useNavigate();
  const {width, height} = Dimensions.get('window');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isColorMetallic, setIsColorMetallic] = useState(false);
  const [opacity, setOpacity] = useState(10);

  // Project Layers is composite layers constructed so far...
  const { state } = useLocation();
  const [projectLayers, setProjectLayers] = useState(state.projectLayers);

  let onCancel = () => {
    navigate('/my-project',
      { state:
          { projectLayers}
      });
  }

  let onOK = () => {
    const newLayer =
      {level: projectLayers.length,
        patternName: selectedItem.name,
        patternImageKey: selectedItem.key,
        backgroundColor: selectedColor,
        patternOpacity: opacity,
        isColorMetallic: isColorMetallic};
    // add new layer...
    setProjectLayers(projectLayers.push(newLayer));
    navigate('/my-project',
      { state:
          { projectLayers}
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.8 }}>
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          {/* Tab Label */}
          <View style={{flex: 1, width: width * 0.5, flexDirection: 'row', alignContent: 'flex-start', marginRight: 18, marginTop: 16}}>
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
            <MyProjectNavButton isDisabled={false} projectLayers={projectLayers} />
            <Text style={{fontSize: 16, fontFamily: 'Futura', marginLeft: 5, marginTop: 7, color: 'gray'}}> > </Text>
            <Image style={{ width: 30, height: 30 }} source={require('../../assets/plus_layer_icon_215065.png')} />
            <Text style={{fontSize: 16, color: 'green', fontWeight: 'bold', marginLeft: 5, marginTop: 7}}> Add A Layer </Text>
          </View>

        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>

          {/* Tabs */}
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

        {/* Tab body based on selection */}
        {selectedView === ENUM_PATTERN && <PrintRollerSelector title={''}
                                                               onSelectPrintRoller={setSelectedItem}
                                                               initSelectedItem={selectedItem}
                                                               onSelectOpacity={setOpacity}
                                                               initSelectedOpacity={opacity}/>}
        {selectedView === ENUM_COLOR && <CustomColorSelector title={''}
                                                             onSelectColor={setSelectedColor}
                                                             initSelectedColor={selectedColor}
                                                             onSelectMetallic={setIsColorMetallic}
                                                             initMetallic={isColorMetallic}
        /> }
        <View style={{width: 180, height: 20, margin: 2, alignItems: 'center', backgroundColor: selectedColor}}>
          <Text style={{fontFamily: 'Futura', fontSize: 16}}>Color: {selectedColor}</Text>
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
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          <TouchableHighlight
            disabled={selectedItem === null || selectedColor === null}
            style={selectedItem === null || selectedColor === null ? styles.tinyBtn2Disabled : styles.tinyBtn2}
            underlayColor="#f0f4f7"
            onPress={onOK}>
            <Text style={styles.btnClr}>OK</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.tinyBtn2}
            underlayColor="#f0f4f7"
            onPress={onCancel}>
            <Text style={styles.btnClr}>Cancel</Text>
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
    width:  100,
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
  },  tinyBtn2Disabled: {
    marginLeft: 10,
    marginTop: 3,
    width: 120,
    height: 45,
    padding: 10,
    backgroundColor: '#dddddd',
    justifyContent: 'left',
    alignItems: 'left',
    borderRadius: 5
  },
  tinyBtnSelected: {
    width:  100,
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
    fontSize: 20,

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
export default AddALayer;