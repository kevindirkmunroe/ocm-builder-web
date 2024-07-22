import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, TouchableHighlight, Image } from "react-native";
import { useLocation, useNavigate } from "react-router-dom";

import PrintRollerSelector from "../widgets/PrintRollerSelector";
import { staticImageUrlMap } from "../../utils/AssetManager";
import CustomColorSelector from "../widgets/CustomColorSelector";
import HomeNavButton from "../widgets/HomeNavButton";
import MyProjectNavButton from "../widgets/MyProjectNavButton";
import { getBaseLayout, isAndroidWebBrowser as isAndroid } from "./layout/BasePageLayout";

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
        isVisible: true,
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

  const baseLayout = getBaseLayout();

  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

        {/* Breadcrumb section */}
        <View style={{flex: 1, width: width * 0.8, flexDirection: 'row', justifyContent : 'center', marginLeft: width * 0.1, marginTop: 10}}>
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
          <Text style={{fontSize: 16, color: 'green', fontWeight: 'bold', marginLeft: 5, marginTop: 7}}> Add Layer </Text>
        </View>
        <View style={baseLayout.main}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: isAndroid() ? 4: 0}}>

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

          {/* Tab body based on selection */}
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
              <Text style={styles.btnClr}>
                {selectedColor ? selectedColor.toUpperCase() : 'No Color'} {isColorMetallic ? 'Metallic' : ''}
              </Text>
            </View>

            {/* Preview Composite image */}
            <View style={{marginTop: isAndroid() ? -20 : 6, justifyContent: 'center'}}>
              <View style={{
                backgroundColor: selectedColor,
                zIndex: 0,
                width: width * 0.6,
                height: height * 0.23,
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
                height: height * 0.23,
                opacity: 0.4,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10}}
                     source={selectedItem? staticImageUrlMap[selectedItem.key]: null}>
              </Image>
            </View>
          </View>
        </View>
        {/* Bottom Navigation */}
        <View style={[baseLayout.footer, {alignItems: 'center', marginBottom: isAndroid() ? 1 : 14}]}>
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
    height: 30,
    marginLeft: 10,
    marginTop: 2,
    backgroundColor: '#ADAD86',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
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
