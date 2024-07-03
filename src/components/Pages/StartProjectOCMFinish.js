import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigate } from 'react-router-dom';

import { getOCMFinishes, staticImageUrlMap } from "../../utils/AssetManager";
import { SectionList } from "../list/SectionList";

function StartProjectOCMFinish(){
  const navigate = useNavigate();
  const {width, height} = Dimensions.get('window');

  const [selectedItem, setSelectedItem ] = useState(null);

  let onStartOver = () => {
    navigate('/start');
  }

  let onContinue = () => {
    navigate('/my-project',
      { state:
          { projectLayers:
              [{level: 'X',
                patternName: selectedItem.name,
                patternImageKey: selectedItem.key,
                backgroundColor: null,
                patternOpacity: 1}
              ]
          }
      });
  }

  return(
    <View style={styles.belowContainer}>
      <View style={{flexDirection: 'row'}}>
        <Image style={{ width: 30, height: 30, marginTop: 15 }} source={require('../../assets/layer-bottom.png')} />
        <Text style={styles.mainText}>Background</Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 7}}>/ OCM Finish</Text>
      </View>
     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4, height: height * 0.6}}>
        {/* Table of images */}
        <SectionList
          sections={getOCMFinishes()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={()=> {
                setSelectedItem(item);
                }
              }>
                <View style={{ backgroundColor: 'rgba(247, 247, 247, 1.0)', margin: 5, flexDirection: 'row', width: width * 0.5 }}>
                  <Image style={{width: 50, height: 50}} source={staticImageUrlMap[item.key]} />
                  <Text style={styles.item}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={item => `basicListEntry-${item.name}`}
         initialNumToRender={3}/>

        {/* Preview Image */}
        <View style={{height: height * 0.5}}>
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#d9d9d9', marginTop: 15, width: width * 0.5, height: height * 0.6}}>
            <ImageBackground style={{width: width * 0.5, height: height * 0.4}} source={selectedItem? staticImageUrlMap[selectedItem.key]: null}>
              <View style={{ position: 'absolute', top: 10, left: 10, right: 0, bottom: 0, justifyContent: 'left', alignItems: 'left'}}>
                <Text style={{ textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: {width: -1, height: 1},
                  textShadowRadius: 10,  fontSize: 20, color: 'white'}}>{selectedItem? selectedItem.name : 'None'}</Text>
              </View>
            </ImageBackground>
          </View>

          {/* Navigation */}

          <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
            <TouchableHighlight
              style={styles.tinyBtn2}
              underlayColor="#f0f4f7"
              onPress={onStartOver}>
              <Text style={styles.btnClr}>Start Over</Text>
            </TouchableHighlight>
            <TouchableHighlight
              disabled={selectedItem === null}
              style={styles.tinyBtn2}
              underlayColor="#f0f4f7"
              onPress={onContinue}>
              <Text style={styles.btnClr}>Continue</Text>
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
    width: '80%',
    padding: 10,
    textAlign: 'center'
  },
  btn: {
    width:  Dimensions.get('window').width * 0.8,
    backgroundColor: '#209bfc',
    justifyContent: 'left',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 10,
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
    backgroundColor: '#209bfc',
    justifyContent: 'left',
    alignItems: 'left',
    borderRadius: 5
  },
  btnClr: {
    fontFamily: 'Futura',
    fontSize: 20,

    color: '#fff',
  },
  belowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    fontFamily: 'Futura',
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,

    backgroundColor: '#dadad0',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default StartProjectOCMFinish;
