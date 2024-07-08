import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { useLocation, useNavigate } from "react-router-dom";
import generatePDF, { Options } from "react-to-pdf";


function SaveAsPDF(){
  const {width} = Dimensions.get('window');
  const navigate = useNavigate();

  // Get Initial state, which should be complete project + form
  const { state } = useLocation();
  const { form, projectLayers } = state;

  let onStartOver = () => {
    navigate('/');
  }

  const [fileName, setFileName] = useState('');


  const getTargetElement = () => document.getElementById("pdfContainer");

  let onSaveAsPDF = async () => {
    const options: Options = {
      filename: fileName,
      page: {
        margin: 20
      }
    };
    await generatePDF(getTargetElement, options);
  }


  return (
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4}}>
        <View style={{width: width * 0.5, flexDirection: 'row', alignContent: 'center', marginRight: 18, marginTop: 16, marginBottom: 16}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5, marginTop: 16}}>My Finish</Text>
          <Text style={{fontSize: 16, fontFamily: 'Futura', marginLeft: 5, marginTop: 7, color: 'gray'}}> > </Text>
          <Image style={{ width: 30, height: 40, marginTop: 5, marginLeft: 5 }} source={require('../../assets/pdf_icon.png')} />
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'green', marginLeft: 5, marginTop: 16}}> Save As PDF</Text>
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

        {/* File name form */}
        <View style={{flex:1, flexDirection: 'row'}}>
          <Text style={{fontSize: 18 , marginTop: 5, padding: 10, fontFamily: 'Futura'}}>File Name</Text>
          <TextInput
            style={styles.input}
            placeholder="File Name"
            value={fileName}
            onChangeText={setFileName}
          />
        </View>

        {/* Bottom Navigation */}
        <View style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          <TouchableHighlight
            style={styles.tinyBtn2}
            underlayColor="#f0f4f7"
            onPress={onSaveAsPDF}>
            <Text style={styles.btnClr}>Save As PDF</Text>
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
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
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

export default SaveAsPDF;
