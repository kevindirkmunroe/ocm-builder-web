import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableHighlight, ScrollView, Dimensions } from "react-native";
import { useLocation } from "react-router-dom";
import Layer from "../layer/Layer";
import CustomColorSelector from "../widgets/CustomColorSelector";
import { staticImageUrlMap } from "../../utils/AssetManager";
import PrintRollerSelector from "../widgets/PrintRollerSelector";
import { getBaseLayout, isAndroidWebBrowser as isAndroid } from "./layout/BasePageLayout";
import CompositeLayerViewComponent, { deepCloneLayerStack } from "../layer/CompositeLayerViewComponent";
import { CompositePlusSingleLayerViewer } from "../widgets/CompositePlusSingleLayerViewer";

function MyProjectDesktop(){
  const { state } = useLocation();
  const [projectLayers, setProjectLayers] = useState(state.projectLayers);
  const [layerIdx, setLayerIdx] = useState(0);

  const {width, height} = Dimensions.get('window');

  // Create clone of layer stack, update on edits, and CompositeLayerView will
  // show clone contents
  const [clonedProjectLayers, setClonedProjectLayers] = useState(deepCloneLayerStack(projectLayers));

  let preview = new CompositePlusSingleLayerViewer({ layerIdx, compositeLayers: clonedProjectLayers});
  const baseLayout = getBaseLayout();

  const updatePreview = (clonedProjectLayers) => {
    setClonedProjectLayers(deepCloneLayerStack(clonedProjectLayers));
    preview = new CompositePlusSingleLayerViewer({ layerIdx, compositeLayers: clonedProjectLayers});
  }

  const updatePatternSelectedItem = (newValue) => {
    // update clone and rebuild composite view...
    clonedProjectLayers[layerIdx] = {...clonedProjectLayers[layerIdx],
      patternName: newValue.name,
      patternImageKey: newValue.key,
    };
    updatePreview(clonedProjectLayers);
  }

  const updateColor = (newValue) => {
    clonedProjectLayers[layerIdx] = {...clonedProjectLayers[layerIdx],
      backgroundColor: newValue,
    };
    updatePreview(clonedProjectLayers);
   }

  const updateColorMetallic = (newValue) => {
    clonedProjectLayers[layerIdx] = {...clonedProjectLayers[layerIdx],
      isColorMetallic: newValue,
    };
    updatePreview(clonedProjectLayers);
  }

  const updateOpacity = (newValue) => {
    clonedProjectLayers[layerIdx] = {...clonedProjectLayers[layerIdx],
      patternOpacity: newValue,
    };
    updatePreview(clonedProjectLayers);
  }

  const doNothing = () => {}
  const onAddLayer = () => {
    const newLayer =
      {level: clonedProjectLayers.length,
        patternName: 'BLANK',
        patternImageKey: 'BLANK',
        backgroundColor: '#d3d3d3',
        patternOpacity: 100,
        isVisible: true,
        isColorMetallic: false};
    // add new layer...
    setLayerIdx(newLayer.level);
    clonedProjectLayers.push(newLayer);
    updatePreview(clonedProjectLayers);
  }

  const onEditLayer = (layerToEdit) => {
    setLayerIdx(layerToEdit.level);

  }

  const patternAsSelectedItem = {
    key: clonedProjectLayers[layerIdx].patternImageKey, // TODO replace [0] with real selected layer
    name: clonedProjectLayers[layerIdx].patternName,
  }

    return (
    <View style={{flex: 1, justifyContent: 'flex-start', padding: 10, flexWrap: 'wrap', alignItems: 'center'}}>
      <View style={[styles.blockHalf, {paddingBottom: 10}]}>
        {/* Full Composite View */}
        <ScrollView style={{width:'100%', height: '70%'}}>
          <Text>Composite: {JSON.stringify(projectLayers)}</Text>
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
          {/* Existing Layers */}
          <FlatList
            data={clonedProjectLayers}
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
                  isReadOnly={false}
                />
              )
            }}
            keyExtractor={item => `${item.patternImageKey}-${item.level}`}
          />
          {/* Add A Layer */}
          { clonedProjectLayers.length < 4 &&
            <TouchableHighlight
              style={[baseLayout.btn, {backgroundColor: '#d3d3d3', borderRadius: 2, marginTop: 0, padding: 2, width: '99%'}]}
              underlayColor="#d3d3d3"
              onPress={onAddLayer}>
              <Text style={styles.btnClr}>+Add A Layer</Text>
            </TouchableHighlight>
          }
        </View>
      </View>
      <View style={[styles.blockEighth, {padding: 4}]}>
        {/* Preview */}
        <View style={{flex: 1, alignContent:'left', marginLeft: 4}}>
          { preview }
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
              initSelectedOpacity={clonedProjectLayers[layerIdx].patternOpacity}/>
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
              onSelectColor={updateColor}
              initSelectedColor={clonedProjectLayers[layerIdx].backgroundColor}
              onSelectMetallic={updateColorMetallic}
              initMetallic={clonedProjectLayers[layerIdx].isColorMetallic}
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
    width: '48%', marginLeft: 10, padding: 2, marginBottom: 10, height:'23%', borderWidth: 2, borderColor: 'lightgray', borderRadius: 5
  },
  btnClr: {
    fontFamily: 'Futura',
    fontSize: 16,

    color: '#fff',
  }
});
export default MyProjectDesktop;
