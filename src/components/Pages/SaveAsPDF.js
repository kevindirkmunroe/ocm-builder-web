import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image, Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import {useLocation, useNavigate} from 'react-router-dom';
import ViewShot from 'react-native-view-shot';

import CompositeLayerViewComponent from '../Layer/CompositeLayerViewComponent';
import alert from '../../utils/Alert';
import HomeButton from "../../components/Widgets/HomeButton";
import MyProjectButton from "../../components/Widgets/MyProjectButton";

function SaveAsPDF() {
  const {width} = Dimensions.get('window');
  const navigate = useNavigate();

  // Get Initial state, which should be complete project + form
  const {state} = useLocation();
  const {form, projectLayers} = state;

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

  // Form content...
  const [fileName, setFileName] = useState('');

  //
  // Image -> PDF generation
  //
  const viewShot = useRef(null);

  let onSaveAsPDF = async () => {
    viewShot.current.capture().then(uri => {
      import("jspdf").then((jspdf) => {
        const doc = jspdf.jsPDF();
        doc.text('Created by OCMBuilder', 10, 10);
        doc.addImage(uri, 'PNG', 15, 40, 180, 160);
        const fileToSave = fileName.endsWith('.pdf')
          ? fileName
          : `${fileName}.pdf`;
        doc.save(fileToSave);
      });
    });
  };

  const isSaveAsPdfDisabled = Platform.OS === 'ios';
  if(isSaveAsPdfDisabled){
    alert('Save As PDF is not available for this iOS version.');
  }

  return (
    <View style={styles.belowContainer}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: width * 1.4,
        }}>
        <View
          style={{
            width: width * 0.5,
            flexDirection: 'row',
            alignContent: 'center',
            marginRight: 18,
            marginTop: 16,
            marginBottom: 16,
          }}>
          <HomeButton />
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
          <MyProjectButton isDisabled={false} projectLayers={projectLayers.projectLayers} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Futura',
              marginLeft: 5,
              marginTop: 16,
              color: 'gray',
            }}>
            {' '}
            >{' '}
          </Text>
          <Image
            style={{width: 24, height: 24, marginTop: 12, marginLeft: 5}}
            source={require('../../assets/PDF-48_46492.png')}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'green',
              marginTop: 16,
            }}>
            {' '}
            Download as PDF
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'column', width: width * 0.6}}>
          <Text style={{fontStyle: 'Futura', fontSize: 20, padding: 10}}>
            Created using OCM Builder
          </Text>
          <Text style={{fontStyle: 'Futura', fontSize: 20, padding: 10}}>
            Available in PVDF, SMP, or Polyester paints on aluminum or steel.
            For Building product applications including roofing, wall panels,
            ceilings, soffits, and more!
          </Text>
          <Text style={{fontStyle: 'Futura', fontSize: 20, padding: 10}}>
            Colors may appear differently on screens or print outs. For design
            development purposes only. Production may vary. This is not a color
            standard.
          </Text>
        </View>

        {/* File name form */}
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text
            style={{
              fontSize: 18,
              marginTop: 5,
              padding: 10,
              fontFamily: 'Futura',
            }}>
            File Name:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="my-file-name.pdf"
            value={fileName}
            onChangeText={setFileName}
          />
          <TouchableHighlight
            disabled={isSaveAsPdfDisabled}
            style={styles.tinyBtn2}
            underlayColor="#f0f4f7"
            onPress={onSaveAsPDF}>
            <Text style={[styles.btnClr, { opacity: isSaveAsPdfDisabled ? 0.5: 1 }]}>Download</Text>
          </TouchableHighlight>

          {/*  Composite image preview */}
          <View style={{width: width * 0.6, height: 100}}>
            <ViewShot ref={viewShot} style={styles.viewShot}>
              <View>
                <CompositeLayerViewComponent
                  layers={projectLayers.projectLayers}
                />
              </View>
            </ViewShot>
          </View>
        </View>

        {/* Bottom Navigation */}
        <View
          style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          <TouchableHighlight
            style={styles.tinyBtn2}
            underlayColor="#f0f4f7"
            onPress={onBackToProject}>
            <Text style={styles.btnClr}>Back To Project</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.tinyBtn2Alt}
            underlayColor="#f0f4f7"
            onPress={onStartOver}>
            <Text style={styles.btnClrAlt}>Start Over</Text>
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
    height: 100,
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
