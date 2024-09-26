import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Dimensions } from "react-native";
import { useNavigate } from 'react-router-dom';
import {isMobile} from 'react-device-detect';

import {useAuth} from './authContext';
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

  let selectDesktopView = () => {
    navigate('/my-project-desktop');
  }

  let enterIntoProject = () => isMobile ? selectCustomFinish() : selectDesktopView();

  // pingService().then(d => console.log(d)).
  // catch(error => console.log(error));

  const {width} = Dimensions.get('window');
  return (
    <View style={styles.belowContainer}>
      <View style={[baseLayout.main, {flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={baseLayout.mainText}>Let's Get Started!</Text>
        <Text style={[baseLayout.mainText, {width: '90%', textAlign: 'left', fontSize:20}]}>
          {`\n\tDesign a Finish with the following steps:\n
            1. Select a Background Color\n
            2. Layer up to 3 Color Prints on top of Background Color\n
            The final Print can be sent to OCM and/or downloaded as a PDF document.`}
        </Text>
        <TouchableHighlight
          style={baseLayout.btn}
          underlayColor="#f0f4f7"
          onPress={enterIntoProject}>
          <Text style={styles.btnClr}>Design A New Finish</Text>
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
