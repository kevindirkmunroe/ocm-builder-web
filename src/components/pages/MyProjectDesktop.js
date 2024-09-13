import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableHighlight } from "react-native";
import { useLocation } from "react-router-dom";
import Layer from "../layer/Layer";
import CustomColorSelector from "../widgets/CustomColorSelector";
import { staticImageUrlMap } from "../../utils/AssetManager";
import PrintRollerSelector from "../widgets/PrintRollerSelector";
import { getBaseLayout } from "./layout/BasePageLayout";

function MyProjectDesktop(){

  const { state } = useLocation();
  const [projectLayers, setProjectLayers] = useState(state.projectLayers);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isColorMetallic, setIsColorMetallic] = useState(false);
  const [layerToEdit, setLayerToEdit] = useState('Background');
  const baseLayout = getBaseLayout();

  const updateSelectedItem = (newValue) => {
  }
  const updateOpacity = (newValue) => {
  }

  const doNothing = () => {}

  const patternAsSelectedItem = {
    key: projectLayers[0].patternImageKey, // TODO replace [0] with real selected layer
    name: projectLayers[0].patternName,
  }

    return (
    <View style={{flex: 1, justifyContent: 'flex-start', padding: 10, flexWrap: 'wrap', alignItems: 'center'}}>
      <View style={styles.blockHalf}>
        {/* Full Composite View */}
        <Text>*</Text>

        {/* Project Action Buttons */}
        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems: 'flex-end'}}>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 60}]}
            underlayColor="#f0f4f7"
            onPress={doNothing}>
            <Text style={styles.btnClr}>Reset</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 120, marginLeft: 2}]}
            underlayColor="#f0f4f7"
            onPress={doNothing}>
            <Text style={styles.btnClr}>Save as PDF</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 130, marginLeft: 2}]}
            underlayColor="#f0f4f7"
            onPress={doNothing}>
            <Text style={styles.btnClr}>Send to OCM</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 160, marginLeft: 2}]}
            underlayColor="#f0f4f7"
            onPress={doNothing}>
            <Text style={styles.btnClr}>Project Settings...</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.blockEighth}>
        {/* Display All Layers */}
        <View>
          <FlatList
            data={projectLayers}
            scrollEnabled={false}
            initialNumToRender={4}
            extraData={state.refresh}
            renderItem={({item}) => {
              return (
                <Layer
                  level={item.level}
                  patternName={item.patternName}
                  patternImageKey={item.patternImageKey}
                  backgroundColor={item.backgroundColor}
                  patternOpacity={item.patternOpacity}
                  isColorMetallic={item.isColorMetallic}
                  isVisible={true}
                  isReadOnly={true}
                />
              )
            }}
            keyExtractor={item => `${item.patternImageKey}-${item.level}`}
          />
        </View>
      </View>
      <View style={styles.blockEighth}>

        {/* Layer Preview */}
        <View style={[styles.borderStyle, {flex: 1, alignContent:'left', marginLeft: 4}]}>
          <View style={{
            backgroundColor: selectedColor,
            zIndex: 0,
            height: 60,
            borderWidth: 10,
            opacity: 0.3}} />
          <Image style={{
            position: 'absolute',
            zIndex: 1,
            backgroundColor: '#d9d9d9',
            borderWidth: 10,
            borderColor:'#ADAD86',
            height: 60,
            opacity: layerToEdit.patternOpacity / 100
          }}
                 source={staticImageUrlMap[layerToEdit.patternImageKey]}>
          </Image>
        </View>
        {/* Composite Preview */}

      </View>
      <View style={[styles.blockQtr, {flexDirection: 'row'}]}>
        {/* Layer Editors */}
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={[styles.borderStyle, {height: '84%', width: '50%', alignItems: 'center'}]}>
            <PrintRollerSelector
              onSelectPrintRoller={updateSelectedItem}
              initSelectedItem={patternAsSelectedItem}
              onSelectOpacity={updateOpacity}
              initSelectedOpacity={10}/>
          </View>
          <View style={{flex: 1, marginBottom: 4,flexDirection: 'row',justifyContent: 'center', alignItems: 'flex-end'}}>
            <TouchableHighlight
              style={[baseLayout.btn, {width: 100}]}
              underlayColor="#f0f4f7"
              onPress={doNothing}>
              <Text style={styles.btnClr}>Set Layer</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[baseLayout.btn, {width: 100, marginLeft: 4, marginRight: 10}]}
              underlayColor="#f0f4f7"
              onPress={doNothing}>
              <Text style={styles.btnClr}>Clear</Text>
            </TouchableHighlight>
          </View>
          <View style={[styles.borderStyle, {width: '44%', height: '84%', alignItems: 'center'}]}>
            <CustomColorSelector
              onSelectColor={setSelectedColor}
              initSelectedColor={selectedColor}
              onSelectMetallic={setIsColorMetallic}
              initMetallic={isColorMetallic}
              layerLevel={'Background'}/>
          </View>
        </View>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  borderStyle: {
    borderWidth: 2, borderColor: 'gray', borderRadius: 5
  },
  blockHalf: {
    width: '50%', height: '99%', padding: 10, borderWidth: 2, borderColor: 'gray', borderRadius: 5
  },
  blockQtr: {
    width: '48%', marginLeft: 10, padding: 10, height:'50%', borderWidth: 2, borderColor: 'gray', borderRadius: 5
  },
  blockEighth: {
    width: '48%', marginLeft: 10, padding: 10, marginBottom: 10, height:'23%', borderWidth: 2, borderColor: 'gray', borderRadius: 5
  },
  btnClr: {
    fontFamily: 'Futura',
    fontSize: 16,

    color: '#fff',
  }
});
export default MyProjectDesktop;
