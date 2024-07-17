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
import { Row, Column } from "../GridLayout";
import HomeNavButton from "../widgets/HomeNavButton";
import { getBaseLayout, isLandscape } from "./layout/BasePageLayout";


function StartMyProjectClassicOCMFinish(){
  const navigate = useNavigate();
  const {width, height} = Dimensions.get('window');

  const [selectedItem, setSelectedItem ] = useState(null);
  const baseLayout = getBaseLayout();

  let onStartOver = () => {
    navigate('/start');
  }

  let onContinue = () => {
    navigate('/my-project',
      { state:
          { projectLayers:
              [{level: 'Background',
                patternName: selectedItem.name,
                patternImageKey: selectedItem.key,
                backgroundColor: null,
                patternOpacity: 100}
              ]
          }
      });
  }

  return(
    <View style={styles.belowContainer}>
       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: height * 0.6}}>
         <View style={styles.app}>
           {/* Breadcrumb */}
             <Row>
               <Column numRows={3}>
                 <View style={{width: width * 0.9, flexDirection: 'row', alignContent: 'center',
                   marginTop: 16, marginLeft: width * 0.1, marginBottom: 16}}>
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
                   <Image style={{ width: 20, height: 20, marginTop: 8, marginLeft: 5 }} source={require('../../assets/layer-group.png')} />
                   <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 10, marginTop: 7, color: 'gray'}}>My Project</Text>
                   <Text style={{fontSize: 14, fontFamily: 'Futura', marginLeft: 5, marginTop: 7, color: 'gray'}}> > </Text>
                   <Image style={{ width: 20, height: 20, marginTop: 8}} source={require('../../assets/map_library_icon_158312.png')} />
                   <Text style={{fontSize: 14, fontWeight: 'bold', color: 'green', marginLeft: 1, marginTop: 7}}> Background</Text>
                 </View>
               </Column>
             </Row>

           {/* Table of images */}
           <Row>
             <Column numRows={3}>
               <View style={{height: height * 0.3, alignItems: 'center', }}>
                 <SectionList
                   sections={getOCMFinishes()}
                   renderItem={({item}) => {
                     return (
                       <TouchableOpacity onPress={()=> {
                         setSelectedItem(item);
                       }
                       }>
                         <View style={{ backgroundColor: 'rgba(247, 247, 247, 1.0)', margin: 5, flexDirection: 'row',
                           width: width * 0.75 }}>
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
               </View>
             </Column>
           </Row>
           {/* Preview */}
           <Row>
             <Column numRows={3}>
               <View style={{ alignItems: 'center', marginTop: 10, height: height * 0.25}}>
                 <ImageBackground style={{width: width * 0.75, height: height * 0.25}} source={selectedItem? staticImageUrlMap[selectedItem.key]: null}>
                   <View style={{ position: 'absolute', top: 10, left: 10, right: 0, bottom: 0, justifyContent: 'left', alignItems: 'left'}}>
                     { selectedItem &&
                       <Text style={{ textShadowColor: 'rgba(0, 0, 0, 0.75)',
                         textShadowOffset: {width: -1, height: 1},
                         textShadowRadius: 10,  fontSize: 20, color: 'white'}}>{selectedItem.name}</Text>
                     }
                     { !selectedItem &&
                       <Text style={{ fontSize: 20, color: 'gray'}}>No Pattern Selected</Text>
                     }
                   </View>
                 </ImageBackground>
               </View>
             </Column>
           </Row>
         </View>
       </View>
       <View style={baseLayout.footer}>
         <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', height: 60, marginTop: 10}}>
           <TouchableHighlight
             style={styles.tinyBtn2Alt}
             underlayColor="#f0f4f7"
             onPress={onStartOver}>
             <Text style={styles.btnClrAlt}>Start Over</Text>
           </TouchableHighlight>
           <TouchableHighlight
             disabled={selectedItem === null}
             style={selectedItem ? styles.tinyBtn2 : styles.tinyBtn2Disabled }
             underlayColor="#f0f4f7"
             onPress={onContinue}>
             <Text style={styles.btnClr}>Continue</Text>
           </TouchableHighlight>
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
    backgroundColor: '#5DA75E',
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
  tinyBtn2Disabled: {
    marginLeft: 10,
    marginTop: 3,
    width: 120,
    height: 45,
    padding: 10,
    backgroundColor: '#dddddd',
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
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: 400,
    backgroundColor: "white"
  },
  row: {
    flexDirection: "row"
  },
  "1col":  {
    backgroundColor:  "lightblue",
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  1
  },
  "2col":  {
    backgroundColor:  "white",
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  2
  },
  "3col":  {
    backgroundColor:  "orange",
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  3
  },
  "4col":  {
    flex:  4
  }
});

export default StartMyProjectClassicOCMFinish;
