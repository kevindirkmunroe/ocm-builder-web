import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableHighlight, ScrollView, Dimensions } from "react-native";
import { useLocation } from "react-router-dom";
import Layer from "../layer/Layer";
import CustomColorSelector from "../widgets/CustomColorSelector";
import { staticImageUrlMap } from "../../utils/AssetManager";
import PrintRollerSelector from "../widgets/PrintRollerSelector";
import { getBaseLayout, isAndroidWebBrowser as isAndroid } from "./layout/BasePageLayout";
import CompositeLayerViewComponent, { deepCloneLayerStack } from "../layer/CompositeLayerViewComponent";
import { isMobile } from "react-device-detect";
import { ReactImageTint } from "react-image-tint";

function MyProjectDesktop(){

  const { state } = useLocation();
  const [projectLayers, setProjectLayers] = useState(state.projectLayers);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isColorMetallic, setIsColorMetallic] = useState(false);

  const {width, height} = Dimensions.get('window');

  // Create clone of layer stack, update on edits, and CompositeLayerView will
  // show clone contents
  let clonedProjectLayers = deepCloneLayerStack(projectLayers);
  const [compositeLayerPreview, setCompositeLayerPreview] =
    useState(new CompositeLayerViewComponent({layers: clonedProjectLayers, isPreview: true}));
  const [layerToEdit, setLayerToEdit] = useState(clonedProjectLayers[0]);

  console.log(`default edit layer: ${JSON.stringify(layerToEdit)}`);
  const baseLayout = getBaseLayout();

  const updatePatternSelectedItem = (newValue) => {
    // console.log(`updatePatternSelectedItem ${JSON.stringify(newValue)}`);
    // update clone and rebuild composite view...
    setLayerToEdit({
      patternName: newValue.name,
      patternImageKey: newValue.key,
    })
    setCompositeLayerPreview(new CompositeLayerViewComponent({layers: clonedProjectLayers, isPreview: true}));
  }

  const makeImage = null;
  const [previewLayerImage, setPreviewLayerImage] = useState(makeImage);

  console.log(`ReactImageTint obj: ${JSON.stringify(previewLayerImage)}`);

  const updateOpacity = (newValue) => {
  }

  const doNothing = () => {}

  const patternAsSelectedItem = {
    key: layerToEdit.patternImageKey, // TODO replace [0] with real selected layer
    name: layerToEdit.patternName,
  }

    return (
    <View style={{flex: 1, justifyContent: 'flex-start', padding: 10, flexWrap: 'wrap', alignItems: 'center'}}>
      <View style={[styles.blockHalf, {paddingBottom: 10}]}>
        {/* Full Composite View */}
        <ScrollView style={{width:'100%', height: '70%'}}>
          <CompositeLayerViewComponent
            layers={projectLayers}
          />
        </ScrollView>
        {/* Project Action Buttons */}
        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems: 'flex-end'}}>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 60}]}
            underlayColor="#f0f4f7"
            onPress={doNothing}>
            <Text style={styles.btnClr}>Reset</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 120, marginLeft: 8}]}
            underlayColor="#f0f4f7"
            onPress={doNothing}>
            <Text style={styles.btnClr}>Save as PDF</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 130, marginLeft: 8}]}
            underlayColor="#f0f4f7"
            onPress={doNothing}>
            <Text style={styles.btnClr}>Send to OCM</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 160, marginLeft: 8}]}
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
                  onEditLayer={doNothing}
                  onDeleteLayer={doNothing}
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
        {/* Preview */}
        <View style={{flex: 1, alignContent:'left', marginLeft: 4}}>
          {/* Layer Preview */}
          <View style={{
            backgroundColor: selectedColor,
            zIndex: 0,
            height: 60,
            borderWidth: 4,
            opacity: 1}} />
          <ReactImageTint
            src={staticImageUrlMap['morton']}
            color={'#FF0000'}
          >
          </ReactImageTint>
          {/*
          <Image style={{
            position: 'absolute',
            zIndex: 1,
            backgroundColor: '#d9d9d9',
            borderWidth: 2,
            borderColor:'#ADAD86',
            height: 60,
            width: '100%',
            opacity: layerToEdit.patternOpacity / 100
          }}
                 source={staticImageUrlMap[layerToEdit.patternImageKey]}>
          </Image>
          */}
          {/* Composite Preview */}
          <ScrollView style={{alignContent: 'center'}}>
            { compositeLayerPreview }
          </ScrollView>
        </View>
      </View>
      <View style={[styles.blockQtr, {flexDirection: 'row'}]}>
        {/* Layer Editors */}
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={[styles.borderStyle, {height: '84%', width: '50%', alignItems: 'center'}]}>
            <PrintRollerSelector
              onSelectPrintRoller={updatePatternSelectedItem}
              initSelectedItem={patternAsSelectedItem}
              onSelectOpacity={updateOpacity}
              initSelectedOpacity={10}/>
          </View>
          <View style={{flex: 1, marginBottom: 4,flexDirection: 'row',justifyContent: 'center', alignItems: 'flex-end'}}>
            <TouchableHighlight
              style={[baseLayout.btn, {width: 140}]}
              underlayColor="#f0f4f7"
              onPress={doNothing}>
              <Text style={styles.btnClr}>Apply Changes</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[baseLayout.btn, {width: 100, marginLeft: 8, marginRight: 10}]}
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
    borderWidth: 2, borderColor: 'lightgray', borderRadius: 5
  },
  blockHalf: {
    width: '50%', height: '100%', padding: 10, borderWidth: 2, borderColor: 'lightgray', borderRadius: 5
  },
  blockQtr: {
    width: '48%', marginLeft: 10, padding: 10, height:'50%', borderWidth: 2, borderColor: 'lightgray', borderRadius: 5
  },
  blockEighth: {
    width: '48%', marginLeft: 10, padding: 10, marginBottom: 10, height:'23%', borderWidth: 2, borderColor: 'lightgray', borderRadius: 5
  },
  btnClr: {
    fontFamily: 'Futura',
    fontSize: 16,

    color: '#fff',
  }
});
export default MyProjectDesktop;
