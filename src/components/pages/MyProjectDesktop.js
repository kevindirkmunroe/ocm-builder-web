import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableHighlight, ScrollView, Dimensions } from "react-native";
import { useLocation } from "react-router-dom";
const {width, height} = Dimensions.get('window');


import Layer from "../layer/Layer";
import CustomColorSelector from "../widgets/CustomColorSelector";
import PrintRollerSelector from "../widgets/PrintRollerSelector";
import { getBaseLayout } from "./layout/BasePageLayout";
import CompositeLayerViewComponent, { deepCloneLayerStack } from "../layer/CompositeLayerViewComponent";
import { CompositePlusSingleLayerViewer } from "../widgets/CompositePlusSingleLayerViewer";
import alert from "../../utils/Alert";
import { staticImageUrlMap } from "../../utils/AssetManager";

function MyProjectDesktop(){
  const { state } = useLocation();
  const [projectLayers, setProjectLayers] = useState(state.projectLayers);
  const [layerIdx, setLayerIdx] = useState(0);

  // Create clone of layer stack, update on edits, and CompositeLayerView will
  // show clone contents
  const [clonedProjectLayers, setClonedProjectLayers] = useState(deepCloneLayerStack(projectLayers));

  let preview = new CompositePlusSingleLayerViewer({ layerIdx, compositeLayers: clonedProjectLayers});
  const baseLayout = getBaseLayout();

  const updatePreview = (clonedProjectLayers) => {
    setClonedProjectLayers(deepCloneLayerStack(clonedProjectLayers));
    preview = new CompositePlusSingleLayerViewer({ layerIdx, compositeLayers: clonedProjectLayers});
  }

  const updateProject = (clonedProjectLayers) => {
    setProjectLayers(deepCloneLayerStack(clonedProjectLayers));
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

  const onEditLayer = (layerId, editType) => {
    if(layerId === 'Background'){
      setLayerIdx(0);
    }else{
      setLayerIdx(layerId)
    }
    if(editType === "visible") {
      clonedProjectLayers[layerId].isVisible = !clonedProjectLayers[layerId].isVisible;
      updatePreview(clonedProjectLayers);
    }
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

  const onDeleteLayer = (layerToDelete) => {
    alert('Delete', `Deleting Layer '${layerToDelete}', Continue?`, [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes, Delete', onPress: () => {

          // Chop out layer...
          clonedProjectLayers.splice(layerToDelete, 1);
          // Update layer numbers...
           let currLayer = 1;
          for(const layer of clonedProjectLayers){
            if(layer.level !== 'Background'){
              layer.level = currLayer++;
            }
          }

          setLayerIdx(0);
          updatePreview(clonedProjectLayers);
        },
      },
    ]);
  }

  const onResetProject = () => {
    alert('Reset', `Clearing all Layers, Continue?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          console.log('Cancel: OK');
          setLayerIdx(0);
          updateProject([{level: 'Background',
            patternName: 'BLANK',
            patternImageKey: 'BLANK',
            backgroundColor: '#d3d3d3',
            patternOpacity: 100,
            isColorMetallic: false}
          ]);
        },
      },
    ]);
  }

  const onApplyChanges = () => {
    updateProject(clonedProjectLayers);
  }

  const patternAsSelectedItem = {
    key: clonedProjectLayers[layerIdx].patternImageKey, // TODO replace [0] with real selected layer
    name: clonedProjectLayers[layerIdx].patternName,
  }
    let zIdx = 0;
    return (
    <View style={{flex: 1, justifyContent: 'flex-start', padding: 10, flexWrap: 'wrap', alignItems: 'center'}}>
      <View style={[styles.blockHalf, {paddingBottom: 10}]}>
        {/* Full Composite View */}
        <ScrollView style={{width:'100%', height: '70%'}}>
          <Text style={{padding: 4, fontSize: 16, fontStyle: 'italic'}}>Untitled</Text>
          <View style={{marginTop: '4%', flex: 7}}>
            {projectLayers.map(oneLayer => {
              return (oneLayer.isVisible || oneLayer.level === 'Background') && (
                <View style={{
                  position: 'absolute',
                  zIndex: zIdx++,
                  top: 6,
                  width: '100%',
                  height: height * 0.6,
                  borderRadius: 3
                }}>
                  <Image style={{
                    width: '100%',
                    height: height * 0.6,
                    borderRadius: 3,
                    opacity: oneLayer.patternOpacity / 100,
                    tintColor: oneLayer.backgroundColor,
                  }} source={staticImageUrlMap[oneLayer.patternImageKey]}/>
                </View>)
            })}
          </View>
        </ScrollView>
        {/* Project Action Buttons */}
        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems: 'flex-end'}}>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 60}]}
            underlayColor="#f0f4f7"
            onPress={onResetProject}>
            <Text style={styles.btnClr}>Reset</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 120, marginLeft: 8, backgroundColor: '#dddddd'}]}
            underlayColor="#f0f4f7"
            onPress={doNothing}>
            <Text style={styles.btnClr}>Save as PDF</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 130, marginLeft: 8, backgroundColor: '#dddddd'}]}
            underlayColor="#f0f4f7"
            onPress={doNothing}>
            <Text style={styles.btnClr}>Send to OCM</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 160, marginLeft: 8, backgroundColor: '#dddddd'}]}
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
                  onEditLayer={onEditLayer}
                  onDeleteLayer={onDeleteLayer}
                  isVisible={item.isVisible}
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
            { clonedProjectLayers[layerIdx].level === 'Background' ? <Text style={{padding: 4, color: 'gray'}}>No Prints Available</Text> :
            <PrintRollerSelector
              onSelectPrintRoller={updatePatternSelectedItem}
              initSelectedItem={patternAsSelectedItem}
              onSelectOpacity={updateOpacity}
              initSelectedOpacity={clonedProjectLayers[layerIdx].patternOpacity}/>
            }
          </View>
          <View style={{flex: 1, marginBottom: 4,flexDirection: 'row',justifyContent: 'center', alignItems: 'flex-end'}}>
            <TouchableHighlight
              style={[baseLayout.btn, {width: 100, height: 40}]}
              underlayColor="#f0f4f7"
              onPress={onApplyChanges}>
              <Text style={[styles.btnClr, {width: 100}]}>
                <Image style={{ width: 16, height: 16, marginLeft: 10, borderRadius: 5, tintColor: 'white'}} source={require('../../assets/start-button_icon-icons.com_53873.png')} />&nbsp;
                Set</Text>
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
