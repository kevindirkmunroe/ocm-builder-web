import React, {useRef, useState} from 'react';
import {
  Dimensions, FlatList,
  Image, Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import {useLocation, useNavigate} from 'react-router-dom';

import alert from '../../utils/Alert';
import HomeNavButton from "../widgets/HomeNavButton";
import MyProjectNavButton from "../widgets/MyProjectNavButton";

function SaveAsPDF() {
  const {width, height} = Dimensions.get('window');
  const navigate = useNavigate();

  // Get Initial state, which should be complete project + form
  const {state} = useLocation();
  const {form, projectLayers, snapshot} = state;

  //
  // Navigation...
  //
  let onStartOver = () => {
    alert(
      'Start Over',
      'Start Over clears all your Project\'s changes, Continue?',
      [
        {
          text: 'No, keep my changes',
          style: 'cancel',
        },
        {
          text: 'Yes, Reset',
          onPress: () => navigate('/'),
        },
      ],
    );
  };

  let onBackToProject = () => {
    navigate('/my-project', {
      state: {projectLayers: projectLayers.projectLayers},
    });
  };

  // form content...
  const [fileName, setFileName] = useState('');

  //
  // Image -> PDF generation
  //
  const viewShot = useRef(null);

  let onSaveAsPDF = async () => {
      import("jspdf").then((jspdf) => {
        const doc = jspdf.jsPDF();
        doc.text(`\n${new Date().toDateString()}\n\nOCM Builder App - Sample Project\n
        Company Name: ${form.companyName}
        Email: ${form.email}
        Project Name: ${form.projectName}
        Designer Name: ${form.designerName}
        Request Samples: ${form.requestSamples}`, 10, 20);

        doc.addImage(snapshot, 'PNG', 15, 90, 180, 160);
        const fileToSave = fileName.endsWith('.pdf')
          ? fileName
          : `${fileName}.pdf`;
        doc.save(fileToSave);
    });
  };

  const isSaveAsPdfDisabled = Platform.OS === 'ios';
  if(isSaveAsPdfDisabled){
    alert('Save As PDF is not available for this iOS version.');
  }

  const onShowInfo = () => {
    alert('More Info...', `
Created using OCM Builder.

Available in PVDF, SMP, or Polyester paints on aluminum or steel.
For Building product applications including roofing, wall panels,
ceilings, soffits, and more!
            
Colors may appear differently on screens or print outs. For design
development purposes only. Production may vary. This is not a color standard.
    `);
  }

  return (
    <View style={styles.belowContainer}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'left',
            marginRight: 18,
            marginTop: 16,
            marginBottom: 16,
          }}>
          <HomeNavButton />
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Futura',
              marginLeft: 5,
              marginTop: 7,
              color: 'gray',
            }}>
            {' '}
            >{' '}
          </Text>
          <MyProjectNavButton isDisabled={false} projectLayers={projectLayers} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Futura',
              marginLeft: 5,
              marginTop: 3,
              color: 'gray',
            }}>
            {' '}
            >{' '}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
              marginLeft: 5,
              marginTop: 4,
            }}><Image
            style={{width: 20, height: 20}}
            source={require('../../assets/complete_task.png')}
          />
            {' '}
            Finish
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Futura',
              marginLeft: 5,
              marginTop: 7,
              color: 'gray',
            }}>
            {' '}
            >{' '}
          </Text>
          <Image
            style={{width: 24, height: 24, marginTop: 4, marginLeft: 3}}
            source={require('../../assets/PDF-48_46492.png')}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 8,
            }}>
            {' '}
            Download PDF
          </Text>
        </View>
        <TouchableHighlight
          style={styles.tinyBtn2Alt}
          underlayColor="#f0f4f7"
          onPress={onShowInfo}>
          <Text style={styles.btnClrAlt}>More Info...</Text>
        </TouchableHighlight>

        {/* File name form */}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 5}}>
          <View style={{flex:1, width: width * 0.9, flexDirection: 'row', justifyContent: 'center'}}>
            <TextInput
              style={styles.input}
              placeholder="my-file-name.pdf"
              value={fileName}
              onChangeText={setFileName}
            />
            <TouchableHighlight
              disabled={isSaveAsPdfDisabled || fileName === null || fileName.length < 3}
              style={styles.tinyBtn2}
              underlayColor="#f0f4f7"
              onPress={onSaveAsPDF}>
              <Text style={[styles.btnClr, { opacity: isSaveAsPdfDisabled || fileName === null || fileName.length < 3 ? 0.4: 1 }]}>Download</Text>
            </TouchableHighlight>
          </View>
        </View>

        {/* Bottom Navigation */}
        <View
          style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          <TouchableHighlight
            style={styles.tinyBtn2Alt}
            underlayColor="#f0f4f7"
            onPress={onStartOver}>
            <Text style={styles.btnClrAlt}>Start Over</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.tinyBtn2}
            underlayColor="#f0f4f7"
            onPress={onBackToProject}>
            <Text style={styles.btnClr}>Back To Project</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'Futura',
    width: '40%',
    padding: 20,
  },
  viewShot: {
    width: SCREEN_WIDTH * 0.6,
    height: 400,
  },
  input: {
    height: 50,
    width: 160,
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
    borderRadius: 5,
  },
  tinyBtn2Alt: {
    marginLeft: 10,
    marginTop: 3,
    width: 180,
    height: 45,
    padding: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  container: {
    flex: 1,
    padding: 3,
  },
  btnClr: {
    fontSize: 20,

    fontFamily: 'Futura',
    color: '#fff',
  },
  btnClrAlt: {
    fontSize: 20,
    fontFamily: 'Futura',
    color: 'black',
  },
  belowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#000',
  },
  previewImage: {
    width: SCREEN_WIDTH * 0.6,
    height: 400,
    backgroundColor: 'green',
  },
});

export default SaveAsPDF;
