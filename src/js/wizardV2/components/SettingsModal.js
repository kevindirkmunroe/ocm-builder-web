import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import {styles} from '../../lib/StyleManager';
import {Divider} from 'react-native-elements';
import app from '../../../app.json';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserCog} from '@fortawesome/free-solid-svg-icons';
import {validateEmail} from '../../utils';
import {OCM} from '../../lib/AppSkinManager';
import {fontf} from '../../lib/FontFamilyManager';
import {DEVICE, PLATFORM} from '../../lib/DeviceDimensionManager';

export default class SettingsModal extends Component {
  constructor(props) {
    super(props);
    const {settings} = this.props;

    this.state = {
      formData: {
        name: settings.name,
        email: settings.email,
        companyName: settings.companyName,
        projectName: settings.projectName,
      },
    };
  }

  clearAllDisabled = () => {
    const {
      formData: {name, email, companyName, projectName},
    } = this.state;
    return (
      name === '' && email === '' && companyName === '' && projectName === ''
    );
  };

  onCancel = () => {
    const {onSettingsCanceled} = this.props;
    onSettingsCanceled();
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

  onBackdropPress = () => {
    this.onCancel();
  };

  onFormCompleted = () => {
    const {onSettingsComplete} = this.props;
    const {formData} = this.state;
    let isValidEmail;
    if (formData.email) {
      isValidEmail = validateEmail(formData.email.trim());
    }
    if (!formData.email || isValidEmail) {
      onSettingsComplete(formData);
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
    formData.email = email;
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

  render() {
    let {settingsModalVisible, settings} = this.props;
    const {formData} = this.state;
    if (formData.lastChanged > settings.lastChanged) {
      settings = formData;
    }
    const settingsIcon = (
      <FontAwesomeIcon
        icon={faUserCog}
        size={40}
        color={OCM.fontColorDisabled}
      />
    );

    return (
      <Modal
        isVisible={settingsModalVisible}
        onBackdropPress={() => this.onBackdropPress()}
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          flexDirection: 'column',
          backgroundColor: 'white',
          width: '95%',
          marginLeft: 10,
          marginTop: PLATFORM == 'iOS' ? 140 : 100,
          maxHeight:
            PLATFORM == 'iOS' ? (DEVICE === 'phone' ? '53%' : '50%') : '80%',
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginLeft: 10,
            }}>
            {settingsIcon}
            <Text
              style={{
                fontFamily: fontf('FuturaPtBold'),
                fontSize: 22,
                color: OCM.fontColorTabHeader,
                marginTop: 10,
                marginLeft: 10,
              }}>
              User Settings
            </Text>
          </View>
          <Divider style={{backgroundColor: 'grey'}} />
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontFamily: fontf('FuturaPtBold'),
                fontSize: 20,
                color: '#D3D3D3',
                marginLeft: 10,
                marginBottom: 10,
              }}>
              Version {app.expo?.version}
            </Text>
            <Divider style={{backgroundColor: 'grey'}} />
            <Text
              style={{
                fontFamily: fontf('FuturaPtBold'),
                fontSize: 20,
                marginTop: 7,
                color: 'black',
                marginLeft: 15,
              }}>
              Name
            </Text>
            <TextInput
              style={{
                ...styles.textItem,
                fontSize: 22,
                marginLeft: 15,
                marginRight: 10,
                backgroundColor: '#ededed',
              }}
              label="Name"
              defaultValue={settings.name}
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
                marginLeft: 15,
              }}>
              Email
            </Text>
            <TextInput
              style={{
                ...styles.textItem,
                fontSize: 22,
                marginLeft: 15,
                marginRight: 10,
                backgroundColor: '#ededed',
              }}
              label="Email"
              defaultValue={settings.email}
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
                marginLeft: 15,
              }}>
              Company Name
            </Text>
            <TextInput
              style={{
                ...styles.textItem,
                fontSize: 22,
                marginLeft: 15,
                marginRight: 10,
                backgroundColor: '#ededed',
              }}
              label="Company Name"
              defaultValue={settings.companyName}
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
                marginLeft: 15,
              }}>
              Project Name
            </Text>
            <TextInput
              style={{
                ...styles.textItem,
                fontSize: 22,
                marginLeft: 15,
                marginRight: 10,
                backgroundColor: '#ededed',
              }}
              label="Project Name"
              defaultValue={settings.projectName}
              underlineColorAndroid="transparent"
              placeholder="Project"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleProjectName}
            />
            <View style={{flexDirection: 'row', marginTop: 30}}>
              <View
                style={{
                  width: '33%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  style={{justifyContent: 'center'}}
                  onPress={() => this.onClearAll()}>
                  <Text
                    style={{
                      ...styles.textItem,
                      fontSize: 22,
                      color: this.clearAllDisabled() ? '#d3d3d3' : 'black',
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
