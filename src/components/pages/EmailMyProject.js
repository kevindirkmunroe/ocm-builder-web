import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useLocation, useNavigate} from 'react-router-dom';
import EmailProjectForm from '../../components/pages/form/EmailProjectForm';
import alert from '../../utils/Alert';
import HomeNavButton from "../widgets/HomeNavButton";
import MyProjectNavButton from "../widgets/MyProjectNavButton";

function EmailMyProject() {
  const {width} = Dimensions.get('window');
  const navigate = useNavigate();

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
          onPress: () => navigate('/start'),
        },
      ],
    );
  };

  let onBackToProject = () => {
    navigate('/my-project', {state: {projectLayers}});
  };

  // Get Initial state, which should be complete project
  const {state} = useLocation();
  const {projectLayers, snapshot } = state;
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
            width: width * 0.98,
            flexDirection: 'row',
            alignItems: 'left',
            justifyContent: 'left',
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
              marginTop: 7,
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
        </View>
        {/*
            form where email is sent...
        */}
        <EmailProjectForm projectLayers={projectLayers} snapshot={snapshot} />
        <View
          style={{flex: 1, flexDirection: 'row', height: 60, flexGrow: 0.2}}>
          <TouchableHighlight
            style={styles.tinyBtn2Alt}
            underlayColor="#ffffff"
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
    justifyContent: 'left',
    alignItems: 'left',
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
});

export default EmailMyProject;
