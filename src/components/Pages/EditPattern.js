import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, TouchableHighlight, Image } from "react-native";
import { useLocation, useNavigate } from "react-router-dom";

import PrintRollerSelector from "../Widgets/PrintRollerSelector";
import { staticImageUrlMap } from "../../utils/AssetManager";

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
    name: layerToEdit.name,
  }

  // Update item, opacity without changing layer, until OK.
  const [selectedItem, setSelectedItem] = useState(patternAsSelectedItem);
  const [opacity, setOpacity] = useState(layerToEdit.patternOpacity);


  let onCancel = () => {
    navigate('/my-project',
      { state:
          { projectLayers }
      });
  }

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

  const updateSelectedItem = (newValue) => {
    console.log(`EditPattern new selectedItem = ${JSON.stringify(newValue)}`);
    setSelectedItem(newValue);
  }

  const updateOpacity = (newValue) => {
    console.log(`EditPattern new Opacity = ${JSON.stringify(newValue)}`);
    setOpacity(newValue);
  }

  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.9 }}>
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          {/* Tab Label */}
          <View style={{flex: 1, width: width * 0.5, flexDirection: 'row', alignContent: 'flex-start', marginRight: 18, marginTop: 16}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 7}}>My Finish</Text>
            <Text style={{fontSize: 16, fontFamily: 'Futura', marginLeft: 5, marginTop: 7, color: 'gray'}}> > </Text>
            <Image style={{ width: 24, height: 24, marginTop: 5, marginLeft: 5 }} source={require('../../assets/layer-group.png')} />
            <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 7}}> All Layers</Text>
            <Text style={{fontSize: 16, fontFamily: 'Futura', marginLeft: 5, marginTop: 7, color: 'gray'}}> > </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 7}}>Layer "{layerToEdit.level}" </Text>
            <Text style={{fontSize: 16, fontFamily: 'Futura', marginLeft: 5, marginTop: 7, color: 'gray'}}> > </Text>
            <Image style={{ width: 20, height: 20, marginTop: 8 }} source={require('../../assets/draw_write_pen_edit_icon_221063.png')} />
            <Text style={{fontSize: 16, color: 'green', fontWeight: 'bold', marginLeft: 5, marginTop: 7}}>Pattern "{layerToEdit.patternName}"</Text>
          </View>
        </View>

        <PrintRollerSelector title={`"${layerToEdit.patternName}"`}
           onSelectPrintRoller={updateSelectedItem}
           initSelectedItem={patternAsSelectedItem}
           onSelectOpacity={updateOpacity}
           initSelectedOpacity={opacity}/>

        {/* Preview Composite image TODO FIX */}
        <View>
          <View style={{
            backgroundColor: layerToEdit.backgroundColor,
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