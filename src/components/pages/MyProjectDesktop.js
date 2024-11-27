import React, { useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  Modal, Pressable, TextInput,
} from "react-native";
import { Slider } from "@react-native-assets/slider";
const {width, height} = Dimensions.get('window');
import ViewShot, { captureRef } from "react-native-view-shot";


import Layer from "../layer/Layer";
import CustomColorSelector from "../widgets/CustomColorSelector";
import PrintRollerSelector from "../widgets/PrintRollerSelector";
import { getBaseLayout } from "./layout/BasePageLayout";
import { deepCloneLayerStack } from "../layer/CompositeLayerViewComponent";
import { CompositePlusSingleLayerViewer } from "../widgets/CompositePlusSingleLayerViewer";
import alert from "../../utils/Alert";
import { staticImageUrlMap } from "../../utils/AssetManager";
import ProjectSettingsForm from "./form/ProjectSettingsForm";
import DownloadPDFForm from "./form/DownloadPDFForm";
import downloadPdf from "../../utils/PDFDownloader";
import sendEmail from "../../utils/EmailJSClient";

function MyProjectDesktop(){

  const NEW_LAYER =
    {level: 'Background',
    patternName: 'BLANK',
    patternImageKey: 'BLANK',
    backgroundColor: '#d3d3d3',
    patternOpacity: 100,
    isColorMetallic: false,
    isVisible: true,
    };

  const [projectLayers, setProjectLayers] = useState([{...NEW_LAYER}]);
  const [layerIdx, setLayerIdx] = useState(0);

  const viewShot = useRef(null);

  // Create clone of layer stack, update on edits, and CompositeLayerView will
  // show clone contents
  const [clonedProjectLayers, setClonedProjectLayers] = useState(deepCloneLayerStack(projectLayers));
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [settingsValid, setSettingsValid] = useState(false);
  const [projectSettings, setProjectSettings] = useState({});
  const [tempProjectSettings, setTempProjectSettings] = useState({});
  const [fileName, setFileName] = useState('');
  const [opacity, setOpacity] = useState(100);
  const [emailMessage, setEmailMessage] = useState('Your custom message here.');

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
      isColorMetallic: newValue
    };
    updatePreview(clonedProjectLayers);
  }

  const updateOpacity = (newValue) => {
    setOpacity(newValue);
    clonedProjectLayers[layerIdx] = {...clonedProjectLayers[layerIdx],
      patternOpacity: newValue,
    };
    updatePreview(clonedProjectLayers);
  }

  const onEditLayer = (layerId, editType) => {
    if(layerId === 'Background'){
      setLayerIdx(0);
      setOpacity(100);
    }else{
      setLayerIdx(layerId)
    }
    setOpacity(clonedProjectLayers[layerId].patternOpacity);
    if(editType === "visible") {
      clonedProjectLayers[layerId].isVisible = !clonedProjectLayers[layerId].isVisible;
      updatePreview(clonedProjectLayers);
    }
  }

  const onAddLayer = () => {
    const newLayer =
      { ...NEW_LAYER, level: clonedProjectLayers.length };
    // add new layer...
    setLayerIdx(newLayer.level);
    setOpacity(newLayer.patternOpacity);
    clonedProjectLayers.push(newLayer);
    updatePreview(clonedProjectLayers);
  }

  const onFormIsValid = (isValid, data) => {
    setSettingsValid(isValid);
    setTempProjectSettings(data);
  }

  const onSaveProjectSettings = () => {
    setProjectSettings(tempProjectSettings);
  }

  const onDeleteLayer = (layerToDelete) => {
    alert('Delete', `‣ Deleting Layer '${layerToDelete}', Continue?`, [
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
    alert('Reset', `‣ Clearing all Layers, Continue?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          setLayerIdx(0);
          updateProject([{...NEW_LAYER}]);
        },
      },
    ]);
  }

  const onSaveAsPdf = () => {
    if(!settingsValid){
      alert('Save as PDF', `‣ Enter valid Project Info before Saving.`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            setModalVisible(!modalVisible);
          },
        },
      ]);
    }else{
      setPdfModalVisible(!pdfModalVisible);
    }
  }

  const onApplyChanges = () => {
    updateProject(clonedProjectLayers);
  }

  const onClearPreview = () => {
    setLayerIdx(0);
    updatePreview([{...NEW_LAYER}]);
  }

  const onSetPdfFileName = (fileName) => {
    setFileName(fileName);
  }

  const onDownloadPdfFile = async() => {
    try{
      const snapshot = await captureRef(viewShot, {
        fileName: 'entryFilename',
        format: "png",
        quality: 0.9,
      });
      await downloadPdf(fileName, projectSettings, projectLayers, snapshot)
    }catch(err){
      console.log(`ERROR screencap: ${err}`);
    }
  }

  const onSendToOCM = async () => {
    if(!settingsValid){
      alert('Send to OCM', `‣ Enter valid Project Info before Sending.`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            setModalVisible(!modalVisible);
          },
        },
      ]);
    }else {
      setEmailModalVisible(!emailModalVisible);
    }
  }

  const sendProjectToPreview = () => {
    setLayerIdx(0);
    updatePreview(deepCloneLayerStack(projectLayers));
  }

  const patternAsSelectedItem = {
    key: clonedProjectLayers[layerIdx].patternImageKey, // TODO replace [0] with real selected layer
    name: clonedProjectLayers[layerIdx].patternName,
  }

    let zIdx = 0;
    return (
    <View style={{flex: 1, justifyContent: 'flex-start', padding: 10, flexWrap: 'wrap', alignItems: 'center'}}>
      {/*
        Modal for Sending Email
      */}
      <Modal
        transparent={true}
        visible={emailModalVisible}
        onRequestClose={() => {
          setEmailModalVisible(!emailModalVisible);
        }}>
        <View style={{ marginLeft: width * 0.1, marginTop: 60, width: width * 0.8}}>
          <View style={styles.modalView}>
            <Text style={{fontSize: 20, padding: 10, fontFamily: 'Futura'}}>
              <Image
                style={{width: 24, height: 20, marginRight: 4, tintColor: '#000000'}}
                source={require('../../assets/mail-black-envelope-symbol_icon-icons.com_56519.png')}
              />
              Send Project to OCM
            </Text>
            <View style={styles.container}>
              <TextInput
                style={styles.textArea}
                multiline={true}
                numberOfLines={4}
                onChangeText={setEmailMessage}
                value={emailMessage}
                placeholder="Enter text here"
              />
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
              <Pressable
                style={[styles.button, styles.buttonClose, {width: 100}]}
                onPress={ async () => {
                    setEmailModalVisible(!emailModalVisible)
                    try {
                      const snapshot = await captureRef(viewShot, {
                        fileName: 'entryFilename',
                        format: "png",
                        quality: 0.9,
                      });
                      await sendEmail(emailMessage, projectSettings, projectLayers, snapshot);
                    } catch (err) {
                      console.log(`ERROR screencap: ${err}`);
                    }
                  }
                }>
                <Text style={[styles.btnClr, {marginLeft: 16}]}>Send</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/*
         Modal for PDF file
      */}
      <Modal
        transparent={true}
        visible={pdfModalVisible}
        onRequestClose={() => {
          setModalVisible(!pdfModalVisible);
        }}>
        <View style={{ marginLeft: width * 0.1, marginTop: 60, width: width * 0.8}}>
          <View style={styles.modalView}>
            <Text style={{fontSize: 20, padding: 10, fontFamily: 'Futura'}}>
              <Image
                style={{width: 24, height: 20, marginRight: 4, tintColor: '#000000'}}
                source={require('../../assets/PDF-48_46492.png')}
              />
              Download PDF
            </Text>
            <DownloadPDFForm fileName={fileName} onSetFileName={onSetPdfFileName} />
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Pressable
                style={[styles.button, styles.buttonClose, {width: 100}]}
                onPress={() => setPdfModalVisible(!pdfModalVisible)}>
                <Text style={styles.btnClr}>⌀ Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, {marginLeft: 8, width: 130}, ]}
                onPress={
                  async () => {
                    setPdfModalVisible(!pdfModalVisible)
                    await onDownloadPdfFile();
                  }
                }>
                <Text style={styles.btnClr}>⇣ Download</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/*
         Modal for showing Project Info
      */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ marginLeft: width * 0.1, marginTop: 60, width: width * 0.8}}>
          <View style={styles.modalView}>
            <Text style={{fontSize: 20, padding: 10, fontFamily: 'Futura'}}>⚙ Project Info</Text>
            <View style={{marginTop: 20, marginBottom: 6, padding: 10, borderRadius: 5, borderWidth: 1}}>
              <ProjectSettingsForm  projectSettings={projectSettings} validation={onFormIsValid}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={[styles.btnClr, {backgroundColor: '#ffffff'}]}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, {marginLeft: 8}, ]}
                onPress={
                  () => {
                    setModalVisible(!modalVisible)
                    onSaveProjectSettings();
                  }
                }>
                <Text style={[styles.btnClr, {backgroundColor: '#ffffff'}]}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* LEFT HALF */}

      <View style={[styles.blockHalf, {paddingBottom: 10}]}>
        {/* Full Composite View */}
          <ScrollView style={{width:'100%', height: '70%'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{padding: 2, fontSize: 18, marginTop: 4, fontWeight: 'bold'}}>Project</Text>
              <Text style={{padding: 2, fontSize: 18, marginTop: 4, fontWeight: 'bold', color: 'gray'}}>></Text>
              <Text style={{padding: 4, fontSize: 20, color:'black', fontStyle: projectSettings.projectName ? 'normal' : 'italic'}}>{projectSettings.projectName || 'Untitled'}</Text>
            </View>
            <TouchableHighlight onPress={sendProjectToPreview}>
              <ViewShot ref={viewShot} style={styles.viewShot}>
                <View style={{marginTop: '4%', flex: 7}}>
                  {projectLayers.map(oneLayer => {
                    if(oneLayer.isColorMetallic){
                      return (
                        <>
                          <View style={{
                            position: 'absolute',
                            zIndex: zIdx++,
                            top: 6,
                            width: '100%',
                            height: height * 0.6,
                            borderRadius: 3,
                            background: '--shine-deg: 45deg; linear-gradient(45deg, #999 5%, #fff 10%, #ccc 30%, #ddd 50%, #ccc 70%, #fff 80%, #999 95%);'
                          }}>
                            <Image style={{
                              width: '100%',
                              height: height * 0.6,
                              borderRadius: 3,
                              opacity: oneLayer.patternOpacity / 100,
                              tintColor: oneLayer.backgroundColor,
                            }} source={staticImageUrlMap[oneLayer.patternImageKey]}/>
                          </View>
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
                              opacity: 0.3,
                            }} source={staticImageUrlMap["metallicLayer"]}/>
                          </View>
                        </>
                      )
                    }

                    return (oneLayer.isVisible || oneLayer.level === 'Background') && (
                      <View style={{
                        position: 'absolute',
                        zIndex: zIdx++,
                        top: 6,
                        width: '100%',
                        height: height * 0.6,
                        borderRadius: 3
                      }}>
                        <Image
                          style={{
                            width: '100%',
                            height: height * 0.6,
                            borderRadius: 3,
                            tintColor: oneLayer.backgroundColor,
                            opacity: oneLayer.patternOpacity / 100,
                          }}
                          source={staticImageUrlMap[oneLayer.patternImageKey]}/>
                      </View>)
                  })}
                </View>
              </ViewShot>
            </TouchableHighlight>
          </ScrollView>
        {/* Project Action Buttons */}
        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems: 'flex-end'}}>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 80}]}
            underlayColor="#f0f4f7"
            onPress={onResetProject}>
            <Text style={styles.btnClr}>Reset</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[baseLayout.btn, {marginLeft: 8, width: 140}]}
            underlayColor="#f0f4f7"
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.btnClr}>Project Info...</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 160, marginLeft: 40, backgroundColor: '#ffffff'}]}
            underlayColor="#f0f4f7"
            onPress={onSaveAsPdf}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 24, height: 20, marginRight: 4, marginLeft: 3, tintColor: '#000000'}}
                source={require('../../assets/PDF-48_46492.png')}
              />
              <Text style={styles.btnClr}>Save As PDF</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={[baseLayout.btn, {width: 160, marginLeft: 8, backgroundColor: '#ffffff'}]}
            underlayColor="#f0f4f7"
            onPress={onSendToOCM}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 24, height: 20, marginRight: 4, marginLeft: 3, tintColor: '#000000'}}
                source={require('../../assets/mail-black-envelope-symbol_icon-icons.com_56519.png')}
              />
              <Text style={styles.btnClr}>Send To OCM</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>

      {/* RIGHT HALF */}

      <View style={styles.blockEighth}>
        {/* Display All Layers */}
        <View>
          {/* Existing Layers */}
          <FlatList
            data={clonedProjectLayers}
            scrollEnabled={false}
            initialNumToRender={4}
            renderItem={({item}) => {
              return (
                <View style={{flexDirection: 'row' }}>
                  <Text style={{marginTop: 4, fontSize: 18, color: 'red'}}>{(item.level === layerIdx || (item.level === 'Background' && layerIdx === 0)) ? '►': '    '}</Text>
                  <View style={{flex: 8}}>
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
                  </View>
                </View>
              )
            }}
            keyExtractor={item => `${item.patternImageKey}-${item.level}`}
          />
          {/* Add A Layer */}
          { clonedProjectLayers.length < 4 &&
            <TouchableHighlight
              style={[baseLayout.btn, {backgroundColor: '#ffffff', borderRadius: 2, marginTop: 0, marginLeft: 3, padding: 2, width: '99%'}]}
              underlayColor="#d3d3d3"
              onPress={onAddLayer}>
              <Text style={styles.btnClr}>+Add Layer</Text>
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

            {/* Opacity Slider */}
            <View style={{marginTop: 6, width: width * 0.18, flexDirection: 'column'}}>
              <Text style={{fontFamily: 'Futura', fontSize: 16, paddingLeft: 5}}>Opacity {opacity}%</Text>
              <Slider
                enabled={layerIdx !== 0}
                value={opacity}                   // set the current slider's value
                minimumValue={0}                  // Minimum value
                maximumValue={100}                // Maximum value
                step={5}                          // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
                minimumTrackTintColor='grey'      // The track color before the current value
                maximumTrackTintColor='grey'      // The track color after the current value
                onValueChange={updateOpacity}
                thumbSize={20}
                thumbTintColor='darkcyan'/>
            </View>
            {/* spacer */}
            <View style={{width: 74}}/>
            <TouchableHighlight
              style={[baseLayout.btn, {width: 100, height: 40}]}
              underlayColor="#f0f4f7"
              onPress={onApplyChanges}>
              <Text style={[styles.btnClr, {width: 100}]}>
                <Image style={{ width: 16, height: 16, marginLeft: 10, borderRadius: 5, tintColor: 'black'}} source={require('../../assets/start-button_icon-icons.com_53873.png')} />&nbsp;
                Set</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[baseLayout.btn, {width: 100, height: 40, marginLeft: 10, alignItems: 'center'}]}
              underlayColor="#f0f4f7"
              onPress={onClearPreview}>
              <Text style={[styles.btnClr, {width: 100, padding: 2, marginTop: -2, marginLeft: 50}]}>Clear</Text>
            </TouchableHighlight>
          </View>
          <View style={[styles.borderStyle, {width: '44%', height: '84%', alignItems: 'center'}]}>
            <CustomColorSelector
            onSelectColor={updateColor}
            initSelectedColor={clonedProjectLayers[layerIdx].backgroundColor}
            onSelectMetallic={updateColorMetallic}
            initMetallic={clonedProjectLayers[layerIdx].isColorMetallic}
            layerLevel={layerIdx}
            />
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
    width: '48%', marginLeft: 10, padding: 10, height:'51%', borderWidth: 2, borderColor: 'lightgray', borderRadius: 5
  },
  blockEighth: {
    width: '48%', marginLeft: 10, padding: 2, marginBottom: 10, height:'23%', borderWidth: 2, borderColor: 'lightgray', borderRadius: 5
  },
  btnClr: {
    fontFamily: 'Futura',
    fontSize: 16,
    color: '#000000',
    alignItems: 'center'
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
    height: 40,
    width: 80,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'black'
  },
  viewShot: {
    height: 400,
  },
  container: {
    flex: 1,
    padding: 20,
    width: 600
  },
  textArea: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    textAlignVertical: 'top',
  },
});
export default MyProjectDesktop;
