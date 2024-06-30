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

function OCMFinish(){
  const navigate = useNavigate();
  const {width, height} = Dimensions.get('window');

  let onStartOver = () => {
    navigate('/start');
  }

  const [selectedItem, setSelectedItem ] = useState(null);

  return(
    <View style={styles.belowContainer}>
      <Text style={styles.mainText}>Select OCM Finish</Text>
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
        <View style={{ backgroundColor: '#d9d9d9', marginTop: 15, flexDirection: 'row', width: width * 0.5, height: height * 0.3}}>
          <ImageBackground style={{width: width * 0.5, height: height * 0.3}} source={selectedItem? staticImageUrlMap[selectedItem.key]: null}>
            <View style={{ position: 'absolute', top: 10, left: 10, right: 0, bottom: 0, justifyContent: 'left', alignItems: 'left'}}>
              <Text style={{ textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10, fontWeight: 'bold', fontSize: 20, color: 'white'}}>{selectedItem? selectedItem.name : 'None'}</Text>
            </View>
          </ImageBackground>
        </View>
        <TouchableHighlight
          style={styles.btn}
          underlayColor="#f0f4f7"
          onPress={onStartOver}>
          <Text style={styles.btnClr}>Start Over</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    color: 'black',
    fontSize: 30,
    width: '80%',
    padding: 20,
    fontWeight: 'bold',
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
  btnClr: {
    fontSize: 20,
    fontWeight: 'bold',
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
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#dadad0',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default OCMFinish;
