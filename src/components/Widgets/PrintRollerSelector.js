import React, { useState } from "react";
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground, FlatList, TouchableHighlight, StyleSheet,
} from "react-native";
import { useNavigate } from "react-router-dom";
import { getOCMPrintRollers, staticImageUrlMap } from "../../utils/AssetManager";

function PrintRollerSelector({title}){
  const navigate = useNavigate();
  const {width, height} = Dimensions.get('window');

  const [selectedItem, setSelectedItem ] = useState(null);

  let onNext = () => {
    navigate('/start');
  }

  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4}}>
        <Text style={styles.mainText}>{title}</Text>
        <View style={{flex: 1, justifyContent: 'top', alignItems: 'center', width: width * 1.4, height: height * 0.6}}>
          {/* Table of images */}
          <View style={styles.container}>
            <FlatList
              data={getOCMPrintRollers()}
              scrollEnabled={true}
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
              keyExtractor={item => `basicListEntry-${item.name}`}/>
          </View>

          {/* Preview Image */}
          <View style={{ backgroundColor: '#d9d9d9', marginTop: 15, flexDirection: 'column', width: width * 0.5, height: 50}}>
            <ImageBackground style={{width: width * 0.5, height: 50}} source={selectedItem? staticImageUrlMap[selectedItem.key]: null}>
              <View style={{ position: 'absolute', top: 5, left: 5, right: 0, bottom: 0, justifyContent: 'left', alignItems: 'left'}}>
                <Text style={{ textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: {width: -1, height: 1},
                  textShadowRadius: 10,
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'white'}}>{selectedItem? selectedItem.name : 'None'}
                </Text>
              </View>
            </ImageBackground>
            <Image style={{marginTop: 15, backgroundColor: '#d9d9d9', width: width * 0.5, height: height * 0.20}} source={selectedItem? staticImageUrlMap[selectedItem.key]: null}>
            </Image>
            <TouchableHighlight
              style={styles.smallBtn}
              underlayColor="#f0f4f7"
              onPress={onNext}>
              <Text style={styles.btnClr}>Next</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    width: '80%',
    padding: 20,
    textAlign: 'center'
  },
  smallBtn: {
    backgroundColor: '#209bfc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#209bfc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    height: 200,
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

export default PrintRollerSelector;
