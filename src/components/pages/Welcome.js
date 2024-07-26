import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useNavigate } from 'react-router-dom';
import { getBaseLayout, isAndroidWebBrowser } from "./layout/BasePageLayout";

function Welcome(){
  const navigate = useNavigate();

  let selectStart = () => {

    //
    // TODO: lock app to PORTRAIT, landscape is unsupported.
    //
    // Tested on Android emulator, and requestFullscreen worked,
    // lock request ok, but orientation still changed. revisit.
    //

    // if(isAndroidWebBrowser()){
    //   document.documentElement.requestFullscreen().then((args) => {
    //     const myScreenOrientation = window.screen.orientation;
    //     myScreenOrientation.lock('portrait').then((args) => {
    //     }).catch((err) => {
    //       alert(`Orientation lock ERROR: ${err}`);
    //     });
    //   }).catch((err) => {
    //     alert(`requestFullScreen ERROR: ${err}`);
    //   });
    // }
    navigate('/start');
  }

  const baseLayout = getBaseLayout();

  return (
    <View style={styles.belowContainer}>
      <View style={baseLayout.main}>
        <View style={{flex: 1, width: '100%', height: '50%', alignItems: 'center'}}>
            <Text style={styles.mainText}>Innovate unique paint finishes for metal architecture.</Text>
            <Text style={styles.mainText}>For roofs, walls, ceilings + more!</Text>
        </View>
      </View>
      <View style={[baseLayout.footer, {flex:1, marginBottom: 30, alignItems: 'center'}]}>
        <TouchableHighlight
          style={styles.bottomButton}
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
    fontFamily: 'Futura',
    width: '80%',
    padding: 20,
  },
  bottomButton: {
    width: 300,
    backgroundColor: '#5DA75E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
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

export default Welcome;
