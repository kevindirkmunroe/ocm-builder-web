import React, { useState } from "react";
import { Dimensions, StyleSheet, View, Text, TouchableHighlight, Image } from "react-native";
import { useNavigate } from 'react-router-dom';

import PrintRollerSelector from "../Widgets/PrintRollerSelector";
import { staticImageUrlMap } from "../../utils/AssetManager";
import CustomColorSelector from "../Widgets/CustomColorSelector";

function CreateCustomFinish(){

  const ENUM_PATTERN = 'PATTERN';
  const ENUM_COLOR = 'COLOR';
  const [selectedView, setSelectedView] = useState(ENUM_PATTERN);

  const navigate = useNavigate();
  const {width, height} = Dimensions.get('window');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  let onStartOver = () => {
    navigate('/start');
  }

  let onSelectPatternTab = () => {
    setSelectedView(ENUM_PATTERN);
  }

  let onSelectColorTab = () => {
    setSelectedView(ENUM_COLOR);
  }

  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4 }}>
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          <View style={{flex: 1, width: width * 0.37, flexDirection: 'row', alignContent: 'flex-start', marginRight: 18, marginTop: 16}}>
            <Image style={{ width: 30, height: 30 }} source={require('../../assets/layer-bottom.png')} />
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>Background Layer</Text>
          </View>

          {/* Tabs */}
         <TouchableHighlight
            style={selectedView === ENUM_PATTERN ? styles.tinyBtnSelected: styles.tinyBtn}
            underlayColor="#676752"
            onPress={onSelectPatternTab}>
            <Text style={styles.btnClr}>Pattern</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={selectedView === ENUM_COLOR ? styles.tinyBtnSelected: styles.tinyBtn}
            underlayColor="#676752"
            onPress={onSelectColorTab}>
            <Text style={styles.btnClr}>Color</Text>
          </TouchableHighlight>
        </View>

        {/* Tab body based on selection */}
        {selectedView === ENUM_PATTERN && <PrintRollerSelector title={''} onSelectPrintRoller={setSelectedItem} initSelectedItem={selectedItem} />}
        {selectedView === ENUM_COLOR && <CustomColorSelector title={''} onSelectColor={setSelectedColor} initSelectedColor={selectedColor} /> }
        <View style={{width: 80, height: 20, margin: 2, alignItems: 'center', backgroundColor: selectedColor}}>
          <Text>{selectedColor}</Text>
        </View>

        {/* Preview Composite image */}
        <View>
          <View style={{
            backgroundColor: selectedColor,
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
    padding: 10,
    fontWeight: 'bold',
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
    backgroundColor: '#209bfc',
    justifyContent: 'left',
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
  },
  btnClr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnBlk: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  belowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default CreateCustomFinish;
