import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useLocation, useNavigate } from "react-router-dom";
import Layer from "../../components/ProjectState/Layer";
import { staticImageUrlMap } from "../../utils/AssetManager";

function EditProject(){
  const navigate = useNavigate();
  const {width} = Dimensions.get('window');

  let onStartOver = () => {
    navigate('/start');
  }

  // Get Initial state, which should be background layer only.
  const { state } = useLocation();
  const { level, printRoller, ocmFinish, color } = state;
  const [projectLayers, setProjectLayers] = useState([
    { key: level,
      pattern: printRoller? printRoller.key : ocmFinish.key,
      backgroundColor: color || 'No Color',
      patternOpacity: 1}]);

  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4}}>
        <Text style={styles.mainText}>My Project</Text>
        <View style={{width: 350, height: 500}}>
          <View
            style={[
              styles.container,
              { flexDirection: 'row',
              },
            ]}>
            <View style={{flex: 1, backgroundColor: 'lightgray'}}><Text style={{margin: 10}}>Level</Text></View>
            <View style={{flex: 2, backgroundColor: 'lightgray'}}><Text>Pattern</Text></View>
            <View style={{flex: 1, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}>
              <Text>Color</Text>
            </View>
            <View style={{flex: 2, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center'}}>
              <Text>Opacity</Text>
            </View>
          </View>
          <FlatList
            data={projectLayers}
            scrollEnabled={false}
            initialNumToRender={4}
            renderItem={({item}) => {
              return (
                  <Layer
                    level={item.key}
                    pattern={item.pattern}
                    backgroundColor={item.backgroundColor}
                    patternOpacity={item.patternOpacity} />
              )
            }}
            keyExtractor={item => `basicListEntry-${item.key}`}/>
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
});
export default EditProject;
