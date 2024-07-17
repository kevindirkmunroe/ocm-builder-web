import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
} from "react-native";
import { useLocation, useNavigate } from "react-router-dom";
import Layer from "../layer/Layer";
import CompositeLayerViewComponent from "../layer/CompositeLayerViewComponent";
import alert from "../../utils/Alert";
import HomeNavButton from "../widgets/HomeNavButton";
import MyProjectNavButton from "../widgets/MyProjectNavButton";

function MyProject(){
  const MAX_LAYERS = 4;
  const {width, height} = Dimensions.get('window');

  // Get Initial state, which could be from Background or Edit or Send...
  const { state } = useLocation();
  const [projectLayers, setProjectLayers] = useState(state.projectLayers);
  const [refresh, setRefresh] = useState(false);

  const onDeleteLayer = (layerToDelete) => {
    // Chop out layer...
    projectLayers.splice(layerToDelete, 1);
    // Update layer numbers...
    let currLayer = 1;
    for(const layer of projectLayers){
      if(layer.level !== 'Background'){
        layer.level = currLayer++;
      }
    }

    setProjectLayers(projectLayers);
    setRefresh(!refresh);
  }

  const onToggleVisible = (newValue) => {
  }

  //
  // Navigations...
  //
  const navigate = useNavigate();

  let onStartOver = () => {
    alert('Start Over', 'Start Over clears all your Project\'s changes. Continue?', [
      {
        text: 'No, keep my changes',
        style: 'cancel',
      },
      {
        text: 'Yes, Reset', onPress: () => navigate('/start'),
      },
    ]);
  }

  let onAddALayer = () => {
    navigate('/add-layer', { state : {projectLayers: projectLayers }});
  }

  let onContinue = () => {
    navigate('/email', { state: { projectLayers: projectLayers } });
  }

  //
  // Edit a layer
  //
  const editColor = (layer) => {
    navigate('/edit-color', { state: { projectLayers: projectLayers, layerToEditLevel: layer.level } });
  }

  const editPattern = (layer) => {
    navigate('/edit-pattern', { state: { projectLayers: projectLayers, layerToEditLevel: layer.level } });
  }

  const editLayer = (layerId, editType ) => {
    let layerIndex = 0;
    if(layerId !== 'Background'){
      layerIndex = layerId
    }
    const layer = projectLayers[layerIndex];
    if(editType === "color"){
      editColor(layer);
    }else if(editType === "pattern"){
      editPattern(layer);
    }else if(editType === "visible"){
      projectLayers[layer.level].isVisible = !projectLayers[layer.level].isVisible;
      setProjectLayers(projectLayers);
      // BS HACK: change a value in FlatList to force it to update UI.
      setRefresh(!refresh);
    }
  }

  //
  // Main Project layout: Layers + Composite image
  //
  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4 }}>

        {/* Breadcrumb to feature */}
        <View style={{width: width * 0.5, flexDirection: 'row', alignContent: 'center', marginRight: 18, marginTop: 16, marginBottom: 16}}>
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
          <MyProjectNavButton isDisabled={true} projectLayers={projectLayers}/>
        </View>
        <View style={{width: 500, height: 280}}>
          <View style={{border: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
            <Text style={{backgroundColor: '#5DA75E',
              alignItems: 'center',
              fontFamily: 'Futura',
              fontSize: 16,
              padding: 5,
              color: 'white'}}>My Print Finish Layers</Text>
          </View>
          {/* Layers header */}
          <View
            style={[
              styles.container,
              { flexDirection: 'row',
              },
            ]}>
            <View style={{flex: 2, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}><Text style={{margin: 2, fontWeight: 'bold'}}>Level</Text></View>
            <View style={{flex: 5, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}><Text style={{margin: 10, fontWeight: 'bold'}}>Pattern / Opacity</Text></View>
            <View style={{flex: 4, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{margin: 10, fontWeight: 'bold'}}>Color</Text>
            </View>
            <View style={{flex: 4, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{margin: 10, fontWeight: 'bold'}}></Text>
            </View>
          </View>

          {/* Display All Layers */}
          <FlatList
            data={projectLayers}
            scrollEnabled={false}
            initialNumToRender={MAX_LAYERS}
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
                  isVisible={item.isVisible}
                  onDeleteLayer={onDeleteLayer}
                  onEditLayer={editLayer}
                  onToggleVisible={onToggleVisible}
                />
              )
            }}
            keyExtractor={item => `${item.patternImageKey}-${item.level}`}
          />
        </View>
        {/*  Composite image preview */}
        <View style={{width: width * 0.6, height: 100}}>
          <CompositeLayerViewComponent layers={projectLayers} />
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 120, width: width * 0.8 }}>
          <TouchableHighlight
            disabled={projectLayers && projectLayers.length >= MAX_LAYERS}
            style={projectLayers && projectLayers.length >= MAX_LAYERS ? styles.btnDisabled : styles.btn}
            underlayColor="#f0f4f7"
            onPress={onAddALayer}>
            <Text style={styles.btnClr}>+ Add A Layer</Text>
          </TouchableHighlight>

          {/* Bottom Navigation */}
          <View style={{flex: 1, marginTop: 10, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
            <TouchableHighlight
              style={styles.tinyBtn2Alt}
              underlayColor="#f0f4f7"
              onPress={onStartOver}>
              <Text style={styles.btnClrAlt}>Start Over</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.tinyBtn2}
              underlayColor="#f0f4f7"
              onPress={onContinue}>
              <Text style={styles.btnClr}>Save Project As...</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    fontFamily: 'Futura',
    color: 'black',
    fontSize: 30,
    width: '40%',
    padding: 20,

  },
  container: {
    flex: 1,
    padding: 3,
  },
  btn: {
    width:  Dimensions.get('window').width * 0.4,
    backgroundColor: '#5DA75E',
    justifyContent: 'left',
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
  },
  btnDisabled: {
    width:  Dimensions.get('window').width * 0.4,
    backgroundColor: '#dddddd',
    justifyContent: 'left',
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
  },
  tinyBtn2: {
    marginLeft: 10,
    marginTop: 3,
    width: 180,
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
  btnClr: {
    fontFamily: 'Futura',
    fontSize: 20,
    color: '#fff',
  },
  btnClrAlt: {
    fontFamily: 'Futura',
    fontSize: 20,
    color: 'black',
  },
  belowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MyProject;
