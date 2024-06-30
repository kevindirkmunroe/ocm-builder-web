import React, {Component} from 'react';
import ProgressSteps from '../ProgressSteps/ProgressSteps';
import ProgressStep from '../ProgressSteps/ProgressStep';
import {Dimensions, Image, View, TouchableOpacity, Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import StyleNameView from './views/StyleNameView';
import BackgroundColorView from './views/BackgroundColorView';
import StyleLayersView from './views/StyleLayersView';
import SummaryView from './views/SummaryView';
import {sendOCMSummaryMail as gmailSendOCMSummaryMail} from '../lib/GoogleMailSender';
import ClientInfoModal from './components/ClientInfoModal';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome, faUserCog} from '@fortawesome/free-solid-svg-icons';
import {
  CustomStylesWizardDimensions as dimMgr,
  DEVICE as dv,
} from '../lib/DeviceDimensionManager';
import SettingsModal from './components/SettingsModal';
import {OCM} from '../lib/AppSkinManager';
import {fontf} from '../lib/FontFamilyManager';

const buttonTextStyle = {
  color: OCM.fontColorDark,
  fontFamily: fontf('FuturaPtBold'),
  fontSize: 25,
};

const homeIcon = (
  <FontAwesomeIcon icon={faHome} size={40} color={OCM.fontColor} />
);

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
  const dim = Dimensions.get('window');
  return dim.height >= dim.width;
};

class CustomStylesWizard extends Component {
  constructor(props) {
    super(props);
    const {history} = this.props;
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
      history,
      isSubmitModalVisible: false,
      isSpinnerVisible: false,
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
        isFirstStep: false,
        isLastStep: false,
        errors: true,
      });
    });
  }

  _getCurrentStyleSnapshot = styleHistory => {
    const currId = styleHistory.currSnapshotId;
    return _.find(styleHistory.snapshots, s => {
      return s.snapshotId === currId;
    });
  };

  onStyleNameSet = styleName => {
    const {history} = this.state;
    const snapshot = this._getCurrentStyleSnapshot(history.styleHistory);
    snapshot.styleName = styleName;
    this.setState({
      history,
      isValid: true,
    });
  };

  updateHistory = history => {
    const {updateHistory} = this.props;
    updateHistory(history);
  };

  onBackgroundColorSelected = backgroundColor => {
    const {history} = this.state;
    const snapshot = this._getCurrentStyleSnapshot(history.styleHistory);
    snapshot.backgroundColor = backgroundColor;
    this.setState({
      history,
      isValid: true,
    });
    this.updateHistory(history);
  };

  deleteColorFromHistory = color => {
    const {history} = this.state;
    const update = _.filter(history.colorHistory, function (o) {
      return o.name !== color;
    });
    history.colorHistory = update;
    this.setState({
      history,
    });
    this.updateHistory(history);
  };

  selectStyleFromHistory = styleId => {
    const {history} = this.state;
    history.styleHistory.currSnapshotId = styleId;
    this.setState({
      history,
    });
    this.updateHistory(history);
  };

  _colorExists = (colorHistory, color) => {
    return _.find(colorHistory, color);
  };

  onReturnHome = () => {
    const {onReturnHome: goHome} = this.props;
    goHome();
  };

  onStyleLayersUpdated = (updatedLayers, color) => {
    const {history} = this.state;
    const snapshot = this._getCurrentStyleSnapshot(history.styleHistory);
    snapshot.styleLayers = updatedLayers;
    if (
      color &&
      color.name.startsWith('#') &&
      !this._colorExists(history.colorHistory, color)
    ) {
      history.colorHistory.push(color);
    }
    this.setState({
      history,
      isValid: true,
    });
    this.updateHistory(history);
  };

  onNextStepStyleName = () => {
    const {history} = this.state;
    const snapshot = this._getCurrentStyleSnapshot(history.styleHistory);
    if (!snapshot.styleName) {
      this.setState({history, errors: true});
    } else {
      this.setState({history, errors: false, isValid: true});
    }
  };

  onNextStepStyleLayers = () => {
    const {history} = this.state;
    const snapshot = this._getCurrentStyleSnapshot(history.styleHistory);
    let isMissingColorInLayer = false;
    snapshot.styleLayers.forEach(layer => {
      if (!layer.color) {
        Alert.alert('Missing Color', `Layer ${layer.layerId} has no color!`);
        isMissingColorInLayer = true;
      }
    });
    if (isMissingColorInLayer) {
      this.setState({history, errors: true, isValid: false});
    } else {
      this.setState({history, errors: false, isValid: true});
    }
  };

  onNextStepBackgroundColor = () => {
    const {history} = this.state;
    const snapshot = this._getCurrentStyleSnapshot(history.styleHistory);

    if (
      snapshot.backgroundColor &&
      snapshot.backgroundColor.name.startsWith('#') &&
      !this._colorExists(history.colorHistory, snapshot.backgroundColor)
    ) {
      history.colorHistory.push(snapshot.backgroundColor);
    }

    if (!this.state.isValid || !snapshot.backgroundColor) {
      this.setState({history, errors: true});
    } else {
      this.setState({history, errors: false, isValid: false});
    }
  };

  onPreviousStep = () => {
    this.setState({
      isValid: true,
    });
  };

  onRestart = () => {
    this.setState({
      history: {},
    });
  };

  onSummarySnapshotReady = summarySnapshotURL => {
    this.setState({
      summarySnapshotURL,
    });
  };

  onSubmit = async () => {
    this.setState({
      clientInfoModalVisible: true,
    });
  };

  onClientInfoCanceled = () => {
    this.setState({
      clientInfoModalVisible: false,
    });
  };

  onClientInfoComplete = async formData => {
    this.setState({
      clientInfoModalVisible: false,
      isSpinnerVisible: true,
    });

    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Alert.alert(
        'Message was not sent: Wi-Fi or Wireless Connection not available.',
      );
      this.setState({
        isSpinnerVisible: false,
      });
      return;
    }

    const {history, summarySnapshotURL} = this.state;
    const wizardData = this._getCurrentStyleSnapshot(history.styleHistory);
    const tmp = summarySnapshotURL.split('/');
    const snapshotName = tmp[tmp.length - 1];

    try {
      await gmailSendOCMSummaryMail(
        wizardData,
        snapshotName,
        summarySnapshotURL,
        formData,
      );
      Alert.alert('Message sent to OCM!');
    } catch (error) {
      Alert.alert('Message sent to OCM had errors: ' + error);
    }
    this.setState({
      isSpinnerVisible: false,
    });

    // wizard is complete
    this.props.restartApp();
  };

  showSettings = () => {
    this.setState({
      settingsModalVisible: true,
    });
  };

  onSettingsCanceled = () => {
    const {onSettingsCanceled} = this.props;
    onSettingsCanceled();
    this.setState({
      settingsModalVisible: false,
    });
  };

  onSettingsComplete = settingsData => {
    const {onSettingsComplete} = this.props;
    onSettingsComplete(settingsData);
    this.setState({
      settingsModalVisible: false,
    });
  };

  getSettings = () => {
    const {history} = this.state;
    return history.settings;
  };

  render() {
    const {errors, history, clientInfoModalVisible, settingsModalVisible} =
      this.state;
    const orientation = isPortrait() ? 'portrait' : 'landscape';
    const currentStyleSnapshot = this._getCurrentStyleSnapshot(
      history.styleHistory,
    );
    const settingsIcon = (
      <FontAwesomeIcon icon={faUserCog} size={40} color={OCM.fontColor} />
    );
    const screenHeight = Dimensions.get('screen').height;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          width: '96%',
          height:
            dv === 'phone'
              ? screenHeight * 0.93
              : screenHeight * (orientation === 'portrait' ? 0.9 : 0.9),
          justifyContent: 'flex-start',
          marginTop: dimMgr[dv][orientation].marginTop,
        }}>
        <Spinner
          visible={this.state.isSpinnerVisible}
          textContent={'Sending Data to OCM...'}
          textStyle={{color: '#FFF'}}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            maxHeight: 40,
          }}>
          <View
            style={{
              marginTop: 5,
            }}>
            <Image source={require('../../assets/ocm-image-small.png')} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={{height: 40, justifyContent: 'flex-end'}}
              onPress={() => this.showSettings()}>
              {settingsIcon}
            </TouchableOpacity>
            <TouchableOpacity
              style={{height: 40, marginLeft: 10}}
              onPress={() => this.onReturnHome()}>
              {homeIcon}
            </TouchableOpacity>
          </View>
        </View>
        <ClientInfoModal
          clientInfoModalVisible={clientInfoModalVisible}
          orientation={orientation}
          getSettings={this.getSettings}
          onClientInfoComplete={this.onClientInfoComplete}
          onClientInfoCanceled={this.onClientInfoCanceled}
        />
        <SettingsModal
          settingsModalVisible={settingsModalVisible}
          settings={history.settings}
          onSettingsComplete={this.onSettingsComplete}
          onSettingsCanceled={this.onSettingsCanceled}
        />
        <View style={{flex: 1}}>
          <ProgressSteps>
            <ProgressStep
              label="1. Name"
              onNext={this.onNextStepStyleName}
              skipBtnDisabled={true}
              restartBtnDisabled={false}
              onRestart={this.onRestart}
              errors={errors}
              nextBtnTextStyle={buttonTextStyle}
              previousBtnTextStyle={buttonTextStyle}>
              <StyleNameView
                orientation={orientation}
                wizardData={currentStyleSnapshot}
                onStyleNameSet={this.onStyleNameSet}
              />
            </ProgressStep>
            <ProgressStep
              label="2. Color"
              skipBtnDisabled={true}
              onNext={this.onNextStepBackgroundColor}
              onRestart={this.onRestart}
              onSkip={this.onTextureSkipped}
              onPrevious={this.onPreviousStep}
              errors={errors}
              nextBtnTextStyle={buttonTextStyle}
              previousBtnTextStyle={buttonTextStyle}>
              <View scrollEnabled={false} style={{alignItems: 'center'}}>
                <BackgroundColorView
                  orientation={orientation}
                  wizardData={currentStyleSnapshot}
                  nestedScrollEnabled={true}
                  colorHistory={history.colorHistory}
                  deleteColorFromHistory={this.deleteColorFromHistory}
                  onBackgroundColorSelected={this.onBackgroundColorSelected}
                />
              </View>
            </ProgressStep>
            <ProgressStep
              label="3. Layers"
              skipBtnDisabled={true}
              onNext={this.onNextStepStyleLayers}
              onPrevious={this.onPreviousStep}
              onRestart={this.onRestart}
              scrollViewProps={{nestedScrollEnabled: true}}
              errors={errors}
              nextBtnTextStyle={buttonTextStyle}
              previousBtnTextStyle={buttonTextStyle}>
              <View style={{alignItems: 'center'}}>
                <StyleLayersView
                  orientation={orientation}
                  history={history}
                  deleteColorFromHistory={this.deleteColorFromHistory}
                  onStyleLayersUpdated={this.onStyleLayersUpdated}
                  selectStyleFromHistory={this.selectStyleFromHistory}
                />
              </View>
            </ProgressStep>
            <ProgressStep
              label="4. Summary"
              skipBtnDisabled={true}
              onPrevious={this.onPreviousStep}
              onRestart={this.onRestart}
              onSubmit={this.onSubmit}
              nextBtnTextStyle={buttonTextStyle}
              previousBtnTextStyle={buttonTextStyle}>
              <View style={{alignItems: 'center'}}>
                <SummaryView
                  orientation={orientation}
                  wizardData={currentStyleSnapshot}
                  onSummarySnapshotReady={this.onSummarySnapshotReady}
                />
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </View>
    );
  }
}

export default CustomStylesWizard;
