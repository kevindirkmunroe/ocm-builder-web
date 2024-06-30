import React from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableHighlight, Image } from "react-native";
import { useNavigate } from 'react-router-dom';

import { getOCMFinishes } from "../../utils/AssetManager";
import { SectionList } from "../list/SectionList";

function OCMFinish(){
  const navigate = useNavigate();
  const {width, height} = Dimensions.get('window');

  let onStartOver = () => {
    navigate('/start');
  }

  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4, height: height * 0.6}}>
        <Text style={styles.mainText}>Select OCM Finish</Text>
        <SectionList
          sections={getOCMFinishes()}
          renderItem={({item}) => {
            return (
              <View style={{ backgroundColor: 'rgba(247, 247, 247, 1.0)', margin: 5, flexDirection: 'row', width: width * 0.5 }}>
                <Image style={{width: 50, height: 50}} source={require(`../../assets/texture/${item.imgUrl}`)} />
                <Text style={styles.item}>{item.name}</Text>
              </View>
            )
          }}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={item => `basicListEntry-${item.name}`}
         initialNumToRender={3}/>
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
    width: '40%',
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
