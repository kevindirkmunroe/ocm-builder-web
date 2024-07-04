import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useLocation, useNavigate } from "react-router-dom";
import SendProjectForm from "../Form/SendProjectForm";

function SendProject(){
  const {width} = Dimensions.get('window');
  const navigate = useNavigate();

  let onStartOver = () => {
    navigate('/start');
  }

  let onBackToProject = () => {
    navigate('/my-project', {state: { projectLayers }});
  }

  // Get Initial state, which should be complete project
  const { state } = useLocation();
  const { projectLayers } = state;

  return (
    <View style={styles.belowContainer}>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4}}>
        <Text style={styles.mainText}>Send Project to OCM</Text>
        <SendProjectForm projectLayers={projectLayers}/>
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          <TouchableHighlight
            style={styles.tinyBtn2}
            underlayColor="#f0f4f7"
            onPress={onBackToProject}>
            <Text style={styles.btnClr}>Back To Project</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.tinyBtn2}
            underlayColor="#f0f4f7"
            onPress={onStartOver}>
            <Text style={styles.btnClr}>Start Over</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'Futura',
    width: '40%',
    padding: 20,
  },
  btn: {
    width: 300,
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
    width: 180,
    height: 45,
    padding: 10,
    backgroundColor: '#209bfc',
    justifyContent: 'left',
    alignItems: 'left',
    borderRadius: 5
  },
  btnClr: {
    fontSize: 20,

    fontFamily: 'Futura',
    color: '#fff',
  },
  belowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default SendProject;
