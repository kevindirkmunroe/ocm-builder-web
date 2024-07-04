import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useLocation, useNavigate } from "react-router-dom";

function SavePrintPDF(){
  const {width} = Dimensions.get('window');
  const navigate = useNavigate();

  // Get Initial state, which should be complete project + form
  const { state } = useLocation();
  const { form, projectLayers } = state;

  console.log(`savePrintPdf, form: ${JSON.stringify(form)}, layers=${JSON.stringify(projectLayers)}`);

  let onStartOver = () => {
    navigate('/');
  }

  let onSavePrintPDF = () => {
    console.log(`TODO: Save hook`);
  }

  return (
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4}}>
        <View style={{width: width * 0.5, flexDirection: 'row', alignContent: 'center', marginRight: 18, marginTop: 16, marginBottom: 16}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 16}}>My Finish | </Text>
          <Image style={{ width: 30, height: 40, marginTop: 5, marginLeft: 5 }} source={require('../../assets/pdf_icon.png')} />
          <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 16}}> Save/Print To PDF</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'column', width: width * 0.6}}>
          <Text style={{fontStyle: 'Futura', fontSize: 20, padding: 10}}>
            Created using OCM Builder
          </Text>
          <Text style={{fontStyle: 'Futura', fontSize: 20, padding: 10}}>
            Available in PVDF, SMP, or Polyester paints on aluminum or steel. For Building product applications including roofing, wall panels, ceilings, soffits, and more!
          </Text>
          <Text style={{fontStyle: 'Futura', fontSize: 20, padding: 10}}>
            Colors may appear differently on screens or print outs.  For design development purposes only.  Production may vary.  This is not a color standard.
          </Text>
        </View>
        {/* Bottom Navigation */}
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          <TouchableHighlight
            style={styles.tinyBtn2}
            underlayColor="#f0f4f7"
            onPress={onSavePrintPDF}>
            <Text style={styles.btnClr}>Save/Print As...</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
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

export default SavePrintPDF;
