import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useNavigate } from 'react-router-dom';

function Welcome(){
  const {width} = Dimensions.get('window');
  const navigate = useNavigate();

  let selectStart = () => {
    navigate('/start');
  }

  return (
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4}}>
        <Text style={styles.mainText}>Innovate unique paint finishes for metal architecture.</Text>
        <Text style={styles.mainText}>For roofs, walls, ceilings + more!</Text>
        <TouchableHighlight
          style={styles.btn}
          underlayColor="#f0f4f7"
          onPress={selectStart}>
          <Text style={styles.btnClr}>Innovate!</Text>
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
    width: 300,
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

export default Welcome;
