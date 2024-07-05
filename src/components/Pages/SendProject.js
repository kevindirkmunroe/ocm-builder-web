import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
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
        <View style={{width: width * 0.5, flexDirection: 'row', alignContent: 'center', marginRight: 18, marginTop: 16, marginBottom: 16}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 7}}>My Finish | </Text>
          <Image style={{ width: 24, height: 24, marginTop: 5, marginLeft: 5 }} source={require('../../assets/mail-black-envelope-symbol_icon-icons.com_56519.png')} />
          <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 7}}> Send To OCM</Text>
        </View>
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
    backgroundColor: '#5DA75E',
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
    backgroundColor: '#5DA75E',
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
