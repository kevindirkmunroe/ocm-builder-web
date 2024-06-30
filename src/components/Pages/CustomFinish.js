import React from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { useNavigate } from 'react-router-dom';

function CustomFinish(){
  const navigate = useNavigate();
  const {width} = Dimensions.get('window');

  let onStartOver = () => {
    navigate('/start');
  }

  return(
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4}}>
        <Text>Create Custom Finish</Text>
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
export default CustomFinish;
