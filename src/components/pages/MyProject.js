import React, { useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList, Modal, Pressable, Image,
} from "react-native";
import { useLocation, useNavigate } from "react-router-dom";
import ViewShot from "react-native-view-shot";


import Layer from "../layer/Layer";
import CompositeLayerViewComponent from "../layer/CompositeLayerViewComponent";
import alert from "../../utils/Alert";
import HomeNavButton from "../widgets/HomeNavButton";
import MyProjectNavButton from "../widgets/MyProjectNavButton";
import { getBaseLayout, isAndroidWebBrowser as isAndroid } from "./layout/BasePageLayout";

function MyProject(){
  const MAX_LAYERS = 4;
  const {width, height} = Dimensions.get('window');

  // Get Initial state, which could be from Background or Edit or Send...
  const { state } = useLocation();
  const [projectLayers, setProjectLayers] = useState(state.projectLayers);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const baseLayout = getBaseLayout();

  //
  // Capture 'MyProject' view as a base64 image
  //
  const viewShot = useRef(null);

  const onDeleteLayer = (layerToDelete) => {
    alert('Delete', `Deleting Layer '${layerToDelete}', Continue?`, [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes, Delete', onPress: () => {

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
          },
      },
    ]);
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

  let onVerifyImageForSave = () => {
    setModalVisible(true);
  }

  let onContinue = async () => {
    let snapshot = null;
    viewShot.current.capture().then(uri => {
      snapshot = uri;
      console.log(`SNAPSHOT OK, length: ${uri.length}`);
      navigate('/email', { state: { projectLayers, snapshot } });
    }).catch(err =>{
      console.log(`ERROR screencap: ${err}`);
    });
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
      {/*
         Modal for showing image that will be saved in PDF, email
      */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ width: width, height: height * 0.4 }}>
          <View style={styles.modalView}>
            <Text style={{fontSize: 20, padding: 10, fontFamily: 'Futura'}}><Image style={{ width: 16, height: 16, marginTop: 8, marginLeft: 5, borderRadius: 5}} source={require('../../assets/photo-icon.png')} />&nbsp;Image Preview</Text>
            <Text style={{fontSize: 16, padding: 14, marginBottom: 5, fontFamily: 'Futura'}}>Capture and Save Image:</Text>
            <ViewShot ref={viewShot} style={styles.viewShot}>
              <View>
                {/* Display All Layers */}
                <View
                  style={[
                    styles.container,
                    { flexDirection: 'row',
                    },
                  ]}>
                  <View style={{backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}><Text style={{margin: 3, fontWeight: 'bold'}}>Level</Text></View>
                  <View style={{backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}><Text style={{margin: 12, fontWeight: 'bold'}}>Pattern / Opacity</Text></View>
                  <View style={{backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{marginLeft: 20, fontWeight: 'bold'}}>Color</Text>
                  </View>
                </View>
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
                <CompositeLayerViewComponent
                  layers={projectLayers}
                />
              </View>
            </ViewShot>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.btnClr}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, {marginLeft: 8}, styles.buttonClose]}
                onPress={
                          () => {
                            setModalVisible(!modalVisible)
                            onContinue();
                          }
                        }>
                <Text style={styles.btnClr}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={[baseLayout.header, {position: 'fixed', top: 75}]}>

          {/* Breadcrumb to feature */}

          <View style={{width: width * 0.8, flexDirection: 'row', justifyContent: 'center', marginLeft: width * 0.1, marginTop: isAndroid() ? 2 : 10}}>
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
        </View>
        <View style={[baseLayout.main, {position: 'fixed', top: isAndroid() ? 112: 150}]}>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', marginTop: isAndroid() ? 4: 0}}>

            {/* Layers Top Header */}
            <View style={{border: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
              <Text style={{backgroundColor: '#5DA75E',
                alignItems: 'center',
                fontFamily: 'Futura',
                fontSize: 16,
                padding: 5,
                color: 'white'}}>My Print Finish Layers</Text>
            </View>

            {/* Layer Headers */}
            <View
              style={[
                styles.container,
                { flexDirection: 'row'
                },
              ]}>
              <View style={{flex: 2, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}><Text style={{marginLeft: 1, fontWeight: 'bold'}}>Level</Text></View>
              <View style={{flex: 5, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}><Text style={{margin: 10, fontWeight: 'bold'}}>Pattern / Opacity</Text></View>
              <View style={{flex: 3, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{margin: 10, fontWeight: 'bold'}}>Color</Text>
              </View>
              <View style={{flex: 4, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{margin: 10, fontWeight: 'bold'}}></Text>
              </View>
            </View>

            {/* Layer Rows */}
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
                  />
                )
              }}
              keyExtractor={item => `${item.patternImageKey}-${item.level}`}
            />
          </View>
          {/*  Composite image preview */}
           <View style={{alignContent: 'flex-end', height: (0.45 * height) - ( projectLayers.length * 40), marginLeft: width * 0.12}}>
            <CompositeLayerViewComponent layers={projectLayers} />
          </View>
        </View>

        <View style={[baseLayout.footer, {marginBottom: isAndroid() ? 1 : 14}]}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 0, marginLeft: width * 0.1, width: width * 0.8 }}>
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
                onPress={onVerifyImageForSave}>
                <Text style={styles.btnClr}>Save Project As...</Text>
              </TouchableHighlight>
            </View>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#5DA75E',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  viewShot: {
    height: 400,
  },
});
export default MyProject;
