import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {useLocation, useNavigate} from 'react-router-dom';
import ViewShot from 'react-native-view-shot';

import CompositeLayerViewComponent from '../Layer/CompositeLayerViewComponent';
import alert from '../../utils/Alert';
import jsPDF from 'jspdf';

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
      'Starting Over clears all your previous changes. Continue?',
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
      const doc = new jsPDF();
      doc.text('Created by OCMBuilder', 10, 10);
      doc.addImage(uri, 'PNG', 15, 40, 180, 160);
      const fileToSave = fileName.endsWith('.pdf')
        ? fileName
        : `${fileName}.pdf`;
      doc.save(fileToSave);
    });
  };

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
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginLeft: 5,
              marginTop: 16,
            }}>
            My Finish
          </Text>
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
            style={{width: 20, height: 28, marginTop: 6, marginLeft: 5}}
            source={require('../../assets/pdf_icon.png')}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'green',
              marginLeft: 5,
              marginTop: 16,
            }}>
            {' '}
            Save As PDF
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
            onPress={onSaveAsPDF}>
            <Text style={styles.btnClr}>Save As PDF</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.tinyBtn2}
            underlayColor="#f0f4f7"
            onPress={onBackToProject}>
            <Text style={styles.btnClr}>Back To Project</Text>
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
