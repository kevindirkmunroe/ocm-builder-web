import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, TextInput, View, TouchableOpacity, Alert} from 'react-native';
import {styles} from '../../lib/StyleManager';
import {Divider} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {validateEmail} from '../../utils/index';
import {OCM} from '../../lib/AppSkinManager';
import {DEVICE, PLATFORM} from '../../lib/DeviceDimensionManager';
import {fontf} from '../../lib/FontFamilyManager';

export default class ClientInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        email: '',
        companyName: '',
        projectName: '',
        lastChanged: 0,
      },
    };
  }

  onCancel = () => {
    const {onClientInfoCanceled} = this.props;
    onClientInfoCanceled();
  };

  onClearAll = () => {
    this.setState({
      formData: {
        name: '',
        email: '',
        companyName: '',
        projectName: '',
        lastChanged: 0,
      },
    });
  };

  clearAllDisabled = () => {
    const {
      formData: {name, email, companyName, projectName},
    } = this.state;
    return (
      name === '' && email === '' && companyName === '' && projectName === ''
    );
  };

  onBackdropPress = () => {
    this.onCancel();
  };

  onFormCompleted = () => {
    const {onClientInfoComplete} = this.props;
    const {formData} = this.state;
    let isValidEmail;
    if (!formData.email) {
      Alert.alert('Please enter a valid email');
    }

    if (formData.email) {
      isValidEmail = validateEmail(formData.email);
    }

    if (isValidEmail) {
      onClientInfoComplete(formData);
    }
  };

  handleName = name => {
    const {formData} = this.state;
    formData.name = name;
    formData.lastChanged = Date.now();
    this.setState({
      formData,
    });
  };

  handleProjectName = projectName => {
    const {formData} = this.state;
    formData.projectName = projectName;
    formData.lastChanged = Date.now();
    this.setState({
      formData,
    });
  };

  handleEmail = email => {
    const {formData} = this.state;
    formData.email = email.trim();
    formData.lastChanged = Date.now();
    this.setState({
      formData,
    });
  };

  handleCompanyName = companyName => {
    const {formData} = this.state;
    formData.companyName = companyName;
    formData.lastChanged = Date.now();
    this.setState({
      formData,
    });
  };

  componentDidMount = () => {
    const {getSettings} = this.props;
    const latestSettings = getSettings();
    this.setState({
      formData: {
        name: latestSettings.name,
        email: latestSettings.email,
        companyName: latestSettings.companyName,
        projectName: latestSettings.projectName,
        lastChanged: Date.now(),
      },
    });
  };

  render() {
    const {clientInfoModalVisible, getSettings} = this.props;
    let {formData} = this.state;

    const infoIcon = (
      <FontAwesomeIcon
        icon={faInfoCircle}
        size={40}
        color={OCM.fontColorDisabled}
      />
    );
    return (
      <Modal
        isVisible={clientInfoModalVisible}
        onBackdropPress={() => this.onBackdropPress()}
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          flexDirection: 'column',
          backgroundColor: 'white',
          width: '100%',
          marginLeft: 10,
          marginTop: PLATFORM === 'iOS' ? 100 : 60,
          maxHeight:
            PLATFORM === 'iOS' ? (DEVICE === 'phone' ? '46%' : '43%') : '70%',
          maxWidth: '95%',
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginLeft: 10,
              marginTop: 3,
            }}>
            {infoIcon}
            <Text
              style={{
                fontFamily: fontf('FuturaPtBold'),
                fontSize: 22,
                color: OCM.fontColorTabHeader,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 10,
              }}>
              Your Information
            </Text>
          </View>
          <Divider style={{backgroundColor: 'grey'}} />
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontFamily: fontf('FuturaPtBold'),
                fontSize: 20,
                color: 'black',
                marginLeft: 30,
              }}>
              Name
            </Text>
            <TextInput
              style={{
                ...styles.textItem,
                fontSize: 22,
                marginLeft: 30,
                marginRight: 28,
                backgroundColor: '#ededed',
              }}
              label="Name"
              value={formData.name}
              defaultValue={formData.name}
              underlineColorAndroid="transparent"
              placeholder="Name"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleName}
            />
            <Text
              style={{
                fontFamily: fontf('FuturaPtBold'),
                fontSize: 20,
                marginTop: 7,
                color: 'black',
                marginLeft: 30,
              }}>
              Email
            </Text>
            <TextInput
              style={{
                ...styles.textItem,
                fontSize: 22,
                marginLeft: 30,
                marginRight: 28,
                backgroundColor: '#ededed',
              }}
              label="Email"
              value={formData.email}
              defaultValue={formData.email}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleEmail}
            />
            <Text
              style={{
                fontFamily: fontf('FuturaPtBold'),
                fontSize: 20,
                marginTop: 7,
                color: 'black',
                marginLeft: 30,
              }}>
              Company Name
            </Text>
            <TextInput
              style={{
                ...styles.textItem,
                fontSize: 22,
                marginLeft: 30,
                marginRight: 28,
                backgroundColor: '#ededed',
              }}
              label="Company Name"
              value={formData.companyName}
              defaultValue={formData.companyName}
              underlineColorAndroid="transparent"
              placeholder="Company"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleCompanyName}
            />
            <Text
              style={{
                fontFamily: fontf('FuturaPtBold'),
                fontSize: 20,
                marginTop: 7,
                color: 'black',
                marginLeft: 30,
              }}>
              Project Name
            </Text>
            <TextInput
              style={{
                ...styles.textItem,
                fontSize: 22,
                marginLeft: 30,
                marginRight: 28,
                backgroundColor: '#ededed',
              }}
              label="Project Name"
              value={formData.projectName}
              defaultValue={formData.projectName}
              underlineColorAndroid="transparent"
              placeholder="Project"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleProjectName}
            />
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  width: '33%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  style={{justifyContent: 'center'}}
                  disabled={this.clearAllDisabled()}
                  onPress={() => this.onClearAll()}>
                  <Text
                    style={{
                      ...styles.textItem,
                      color: this.clearAllDisabled() ? '#d3d3d3' : 'black',
                      fontSize: 22,
                    }}>
                    Clear All
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '33%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  style={{justifyContent: 'center'}}
                  onPress={() => this.onCancel()}>
                  <Text style={{...styles.textItem, fontSize: 22}}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '33%'}}>
                <TouchableOpacity
                  style={{justifyContent: 'center', marginLeft: 30}}
                  onPress={() => this.onFormCompleted()}>
                  <Text style={{...styles.textItem, fontSize: 22}}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
