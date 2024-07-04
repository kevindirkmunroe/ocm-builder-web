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
import Layer from "../../components/ProjectState/Layer";
import { staticImageUrlMap } from "../../utils/AssetManager";

function MyProject(){
  const navigate = useNavigate();
  const {width, height} = Dimensions.get('window');

  // Get Initial state, which should be background layer only.
  const { state } = useLocation();
  const [projectLayers, setProjectLayers] = useState(state.projectLayers);

  let onStartOver = () => {
    navigate('/start');
  }

  let onAddALayer = () => {
    navigate('/add-layer', { state : {projectLayers: projectLayers }});
  }

  let onContinue = () => {
    navigate('/send', { state : {projectLayers: projectLayers }});
  }
  //
  // Create composite image with all layers in projectLayers
  //
  // TODO fix and display this
  let currZIndex = 0;
  projectLayers.map((oneLayer) => {
      return (
        <View style={{ position: 'absolute', zIndex: currZIndex++ }}>
          <Image
            style={{
              width: width * 0.6,
              height: height * 0.3,
              marginLeft: 3,
              borderRadius: 10,
              borderWidth: 1,
              tintColor: oneLayer.backgroundColor || undefined,
            }}
            source={staticImageUrlMap[oneLayer.patternImageKey]}
          />
        </View>
      );
    });

  //
  // Main image
  //
  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4 }}>
        <View style={{width: width * 0.5, flexDirection: 'row', alignContent: 'center', marginRight: 18, marginTop: 16, marginBottom: 16}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 7}}>My Finish | </Text>
          <Image style={{ width: 24, height: 24, marginTop: 5, marginLeft: 5 }} source={require('../../assets/layer-group.png')} />
          <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 7}}> All Layers</Text>
        </View>
        <View style={{width: 350, height: 200}}>

          {/* Layers Header */}
          <View
            style={[
              styles.container,
              { flexDirection: 'row',
              },
            ]}>
            <View style={{flex: 1, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}><Text style={{margin: 2, fontWeight: 'bold'}}>Level</Text></View>
            <View style={{flex: 2, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}><Text style={{margin: 10, fontWeight: 'bold'}}>Pattern</Text></View>
            <View style={{flex: 2, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{margin: 10, fontWeight: 'bold'}}>Color</Text>
            </View>
            <View style={{flex: 2, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{margin: 10, fontWeight: 'bold'}}>Opacity</Text>
            </View>
          </View>

          {/* All Layers */}
          <FlatList
            data={projectLayers}
            scrollEnabled={false}
            initialNumToRender={4}
            renderItem={({item}) => {
              return (
                  <Layer
                    level={item.level}
                    patternName={item.patternName}
                    patternImageKey={item.patternImageKey}
                    backgroundColor={item.backgroundColor}
                    patternOpacity={item.patternOpacity} />
              )
            }}
            keyExtractor={item => `basicListEntry-${item.patternImageKey}`}/>
        </View>
        {/* Preview Composite image */}
        <View>
          <Text>Composite Snapshot</Text>
        </View>
        <TouchableHighlight
          disabled={projectLayers && projectLayers.length >= 4}
          style={styles.btn}
          underlayColor="#f0f4f7"
          onPress={onAddALayer}>
          <Text style={styles.btnClr}>+ Add A Layer</Text>
        </TouchableHighlight>

        {/* Bottom Navigation */}
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          <TouchableHighlight
            style={styles.tinyBtn2}
            underlayColor="#f0f4f7"
            onPress={onStartOver}>
            <Text style={styles.btnClr}>Start Over</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.tinyBtn2}
            underlayColor="#f0f4f7"
            onPress={onContinue}>
            <Text style={styles.btnClr}>Send To OCM</Text>
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
    width: '40%',
    padding: 20,

  },
  container: {
    flex: 1,
    padding: 3,
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
  tinyBtn2: {
    marginLeft: 10,
    marginTop: 3,
    width: 150,
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
  },
});
export default MyProject;
