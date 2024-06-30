import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Dimensions } from "react-native";
import {useAuth} from './authContext';
import { useNavigate } from 'react-router-dom';


function StartProject() {
  const navigate = useNavigate();
  let auth = useAuth();

  let selectCustomFinish = () => {
    auth.signin(() => {
      navigate('/custom-finish');
    });
  };

  let selectNewFinish = () => {
    navigate('/new-finish');
  }

  const {width} = Dimensions.get('window');
  return (
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4}}>
        <Text style={styles.mainText}>Let's Get Started!</Text>
        <Text style={styles.mainText}>What are you creating Today?</Text>
        <TouchableHighlight
          style={styles.btn}
          underlayColor="#f0f4f7"
          onPress={selectNewFinish}>
          <Text style={styles.btnClr}>Design A New Finish</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.btn}
          underlayColor="#f0f4f7"
          onPress={selectCustomFinish}>
          <Text style={styles.btnClr}>Customize Popular OCM Finishes</Text>
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
  belowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default StartProject;
