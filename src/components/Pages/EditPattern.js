import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, TouchableHighlight, Image } from "react-native";
import { useLocation, useNavigate } from "react-router-dom";

import PrintRollerSelector from "../Widgets/PrintRollerSelector";
import { staticImageUrlMap } from "../../utils/AssetManager";
import CompositeLayerViewComponent, { deepCloneLayerStack } from "../Layer/CompositeLayerViewComponent";

function EditPattern(){

  const navigate = useNavigate();
  const {width, height} = Dimensions.get('window');

  // Get layer to edit from state...
  const { state } = useLocation();
  const layerToEditLevel = state.layerToEditLevel;
  const projectLayers = state.projectLayers;
  const layerToEdit = projectLayers[layerToEditLevel];

  // Make Item object for passing to PrintRoller widget
  const patternAsSelectedItem = {
    key: layerToEdit.patternImageKey,
    name: layerToEdit.patternName,
  }

  // Update item, opacity locally without changing layer, until OK button pressed.
  const [selectedItem, setSelectedItem] = useState(patternAsSelectedItem);
  const [opacity, setOpacity] = useState(layerToEdit.patternOpacity);

  // Create clone of layer stack, update on edits, and CompositeLayerView will
  // show clone contents
  let clonedProjectLayers = deepCloneLayerStack(projectLayers);
  const [compositeLayerView, setCompositeLayerView] =
    useState(new CompositeLayerViewComponent({layers: clonedProjectLayers}));

  const updateSelectedItem = (newValue) => {
    setSelectedItem(newValue);

    // update clone and rebuild composite view...
    clonedProjectLayers[layerToEditLevel].patternName = newValue.name;
    clonedProjectLayers[layerToEditLevel].patternImageKey = newValue.key;
    setCompositeLayerView(new CompositeLayerViewComponent({layers: clonedProjectLayers}));
  }

  const updateOpacity = (newValue) => {
    setOpacity(newValue);

    // update clone and rebuild composite view...
    clonedProjectLayers[layerToEditLevel].patternOpacity = newValue;
    setCompositeLayerView(new CompositeLayerViewComponent({layers: clonedProjectLayers}));
  }

  let onCancel = () => {
    navigate('/my-project',
      { state:
          { projectLayers }
      });
  }

  // Finalize updates of edited layer, go back to project
  let onOK = () => {
    // Update layer
    layerToEdit.patternImageKey = selectedItem.key;
    layerToEdit.patternName = selectedItem.name;
    layerToEdit.patternOpacity = opacity;
    navigate('/my-project',
      { state:
          { projectLayers}
      });
  }

  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.9 }}>
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          {/* Tab Label */}
          <View style={{flex: 1, width: width * 0.6, flexDirection: 'row', alignContent: 'center', marginRight: 18, marginTop: 16}}>
            <Image style={{ width: 16, height: 16, marginTop: 8, marginLeft: 5, borderRadius: 5}} source={require('../../assets/ocm-icon.png')} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: 5,
                marginTop: 7,
              }}>
              Start
            </Text>
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
            <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 7}}>My Project</Text>
            <Text style={{fontSize: 16, fontFamily: 'Futura', marginLeft: 5, marginTop: 7, color: 'gray'}}> > </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 7}}>Layer {layerToEdit.level} </Text>
            <Text style={{fontSize: 16, fontFamily: 'Futura', marginLeft: 5, marginTop: 7, color: 'gray'}}> > </Text>
            <Image style={{ width: 20, height: 20, marginTop: 8 }} source={require('../../assets/draw_write_pen_edit_icon_221063.png')} />
            <Text style={{fontSize: 16, color: 'green', fontWeight: 'bold', marginLeft: 5, marginTop: 7}}>Edit Pattern</Text>
          </View>
        </View>

        <PrintRollerSelector title={`"${selectedItem.name}" / Opacity ${opacity}%`}
                             onSelectPrintRoller={updateSelectedItem}
                             initSelectedItem={patternAsSelectedItem}
                             onSelectOpacity={updateOpacity}
                             initSelectedOpacity={opacity}/>

        {/* Preview Composite image */}
        <View style={{flex: 1, marginTop: 50}}>
          <View style={{
            backgroundColor: layerToEdit.backgroundColor,
            zIndex: 0,
            width: width * 0.6,
            height: 100,
            borderWidth: 10,
            opacity: 0.3}} />
          <Image style={{
            position: 'absolute',
            zIndex: 1,
            backgroundColor: '#d9d9d9',
            borderWidth: 10,
            borderColor:'#ADAD86',
            width: width * 0.6,
            height: 100,
            opacity: opacity / 100
          }}
                 source={selectedItem? staticImageUrlMap[selectedItem.key]: null}>
          </Image>
          <View>
            { compositeLayerView }
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          <TouchableHighlight
            style={styles.tinyBtn2}
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
export default EditPattern;
