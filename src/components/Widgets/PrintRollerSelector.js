import React, { useState } from "react";
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground, FlatList, StyleSheet,
} from "react-native";
import { getOCMPrintRollers, staticImageUrlMap } from "../../utils/AssetManager";

function PrintRollerSelector({title, onSelectPrintRoller, initSelectedItem}){
  const {width, height} = Dimensions.get('window');

  const [selectedItem, setSelectedItem ] = useState(initSelectedItem);

  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 0.6, backgroundColor: '#ADAD86', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
        <Text style={styles.mainText}>{title}</Text>
        <View style={{flex: 1, justifyContent: 'top', alignItems: 'center', width: width * 1.4, height: height * 0.6}}>
          {/* Table of images */}
          <View style={styles.container}>
            <FlatList
              data={getOCMPrintRollers()}
              scrollEnabled={true}
              showsVerticalScrollIndicator={true}
              initialNumToRender={4}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity onPress={()=> {
                    setSelectedItem(item);
                    onSelectPrintRoller(item);
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
          <View style={{ backgroundColor: '#d9d9d9', marginTop: 15, flexDirection: 'column', width: width * 0.5, height: 40}}>
            <ImageBackground style={{width: width * 0.5, height: 40}} source={selectedItem? staticImageUrlMap[selectedItem.key]: null}>
              <View style={{ position: 'absolute', top: 8, left: 8, right: 0, bottom: 0, justifyContent: 'left', alignItems: 'left'}}>
                <Text style={{
                  alignSelf: 'flex-start',
                  backgroundColor:'white',
                  borderWidth: 2,
                  borderColor: 'black',
                  fontSize: 20,
                  color: 'black'}}>{selectedItem? selectedItem.name : '---'}
                </Text>
              </View>
            </ImageBackground>
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
    fontFamily: 'Futura',
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
    fontFamily: 'Futura',
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
