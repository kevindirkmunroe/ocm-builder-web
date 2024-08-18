import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, TouchableHighlight, Image } from "react-native";
import { useLocation, useNavigate } from "react-router-dom";

import { staticImageUrlMap } from "../../utils/AssetManager";
import CustomColorSelector from "../widgets/CustomColorSelector";
import CompositeLayerViewComponent, { deepCloneLayerStack } from "../layer/CompositeLayerViewComponent";
import HomeNavButton from "../widgets/HomeNavButton";
import MyProjectNavButton from "../widgets/MyProjectNavButton";
import { isAndroidWebBrowser as isAndroid } from "../pages/layout/BasePageLayout";

function EditColor(){

  const navigate = useNavigate();
  const {width, height} = Dimensions.get('window');

  // Get layer to edit from state...
  const { state } = useLocation();
  const layerToEditLevel = state.layerToEditLevel;
  const projectLayers = state.projectLayers;
  const layerToEdit = projectLayers[layerToEditLevel === 'Background' ? 0 : layerToEditLevel];

  // Update backgroundColor, metallic without changing layer, until OK.
  const [color, setColor] = useState(layerToEdit.backgroundColor);
  const [isColorMetallic, setIsMetallic] = useState(layerToEdit.isColorMetallic);

  // Create clone of layer stack, update on edits, and CompositeLayerView will
  // show clone contents
  let clonedProjectLayers = deepCloneLayerStack(projectLayers);
  const [compositeLayerView, setCompositeLayerView] =
    useState(new CompositeLayerViewComponent({layers: clonedProjectLayers}));

  const onSetColor = (newValue) => {
    setColor(newValue);
    clonedProjectLayers[layerToEditLevel === 'Background' ? 0 : layerToEditLevel].backgroundColor = newValue;
    setCompositeLayerView(new CompositeLayerViewComponent({layers: clonedProjectLayers}));
  }

  let onCancel = () => {
    navigate('/my-project',
      { state:
          { projectLayers }
      });
  }

  let onOK = () => {
    // Update layer
    layerToEdit.backgroundColor = color;
    layerToEdit.isColorMetallic = isColorMetallic;
    navigate('/my-project',
      { state:
          { projectLayers}
      });
  }

  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          {/* Breadcrumbs */}
          <View style={{flex: 1, marginLeft: 10, width: width * 0.98,
            flexDirection: 'row', justifyContent: 'left', alignContent: 'left',
            marginTop: isAndroid() ? 2 : 16}}>
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
            <Image style={{ width: 20, height: 18, marginTop: 8 }} source={require('../../assets/edit_icon_128873.png')} />
            <Text style={{fontSize: 16, color: 'black', marginLeft: 5, fontStyle: 'italic', marginTop: 7}}>&nbsp;Edit Layer {layerToEdit.level} - Color</Text>
          </View>
        </View>
        <View style={{flex: 2}}>
          <CustomColorSelector title={`"${layerToEdit.backgroundColor}"`}
                               onSelectColor={onSetColor}
                               initSelectedColor={color}
                               onSelectMetallic={setIsMetallic}
                               initMetallic={isColorMetallic}/>
        </View>
        {/* Preview Composite image */}
        <View style={{flex: 1, marginTop: isAndroid() ? 122: 45}}>
          <View style={{
            backgroundColor: color,
            zIndex: 0,
            width: width * 0.8,
            height: 60,
            borderWidth: 10,
            opacity: 0.3}} />
          <Image style={{
            position: 'absolute',
            zIndex: 1,
            backgroundColor: '#d9d9d9',
            borderWidth: 10,
            borderColor:'#ADAD86',
            width: width * 0.8,
            height: 60,
            opacity: layerToEdit.patternOpacity / 100
          }}
                 source={staticImageUrlMap[layerToEdit.patternImageKey]}>
          </Image>
          <View>
            { compositeLayerView }
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          <TouchableHighlight
            style={[styles.tinyBtn2, {height: 32, alignItems: 'center', justifyContent: 'center'}]}
            underlayColor="#f0f4f7"
            onPress={onOK}>
            <Text style={styles.btnClr}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.tinyBtn2, {height: 32, alignItems: 'center', justifyContent: 'center'}]}
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
export default EditColor;
