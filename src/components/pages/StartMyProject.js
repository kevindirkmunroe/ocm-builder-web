import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Dimensions } from "react-native";
import {useAuth} from './authContext';
import { useNavigate } from 'react-router-dom';
import { getBaseLayout } from "./layout/BasePageLayout";

function StartMyProject() {
  const navigate = useNavigate();
  let auth = useAuth();
  const baseLayout = getBaseLayout();

  let selectCustomFinish = () => {
    auth.signin(() => {
      navigate('/custom-finish');
    });
  };

  let selectOCMFinish = () => {
    navigate('/ocm-finish');
  }

  const {width} = Dimensions.get('window');
  return (
    <View style={styles.belowContainer}>
      <View style={[baseLayout.main, {flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={baseLayout.mainText}>Let's Get Started!</Text>
        <Text style={baseLayout.mainText}>What are you creating Today?</Text>
        <TouchableHighlight
          style={baseLayout.btn}
          underlayColor="#f0f4f7"
          onPress={selectCustomFinish}>
          <Text style={styles.btnClr}>Design A New Finish</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={baseLayout.btn}
          underlayColor="#f0f4f7"
          onPress={selectOCMFinish}>
          <Text style={styles.btnClr}>Customize Popular OCM Finishes</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default StartMyProject;
