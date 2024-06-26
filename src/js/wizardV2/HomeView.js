import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  AppState,
} from 'react-native';
import {styles} from '../lib/StyleManager';
import CustomStylesWizard from './CustomStylesWizard';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faPlusCircle,
  faTrash,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import {Divider} from 'react-native-elements';
import {
  HomeViewDimensions as dimMgr,
  PLATFORM,
  DEVICE as dv,
} from '../lib/DeviceDimensionManager';
import Orientation from 'react-native-orientation-locker';
import {storeHistory, retrieveHistory} from '../lib/AppStorageManager';
import {RFValue} from 'react-native-responsive-fontsize';
import SettingsModal from './components/SettingsModal';
import {OCM} from '../lib/AppSkinManager';
import {mergeHistoryWithDefaults} from '../lib/DefaultStyleManager';
import _ from 'lodash';

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  splashText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 20,
  },
  buttonGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end', // if you want to fill rows left to right
    justifyContent: 'center',
  },
  item: {
    width: '75%', // is 50% of container width
  },
});

const plusIcon = (
  <FontAwesomeIcon icon={faPlusCircle} size={28} color="white" />
);

const _isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

export default class HomeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: {
        styleHistory: {
          currSnapshotId: undefined,
          snapshots: [],
        },
        colorHistory: [],
        settings: {
          name: '',
          email: '',
          companyName: '',
          projectName: '',
        },
      },
      wizardView: false,
      orientation: _isPortrait() ? 'portrait' : 'landscape',
      settingsModalVisible: false,
    };
      
    let eventListenerSubscription;

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: _isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }

  _createNewStyleSnapshot = snapshots => {
    return {
      snapshotId: Math.floor(Math.random() * 100000),
      styleName: `new-style-${snapshots.length + 1}`,
      styleLayers: [],
    };
  };

  onCreateNewStyle = () => {
    const {history} = this.state;
    const snapshot = this._createNewStyleSnapshot(
      history.styleHistory.snapshots,
    );
    history.styleHistory.snapshots.push(snapshot);
    history.styleHistory.currSnapshotId = snapshot.snapshotId;

    this.setState({
      wizardView: true,
      history,
    });
  };

  onReturnHome = () => {
    this.setState({
      wizardView: false,
    });
  };

  onOpenStyle = style => {
    const {history} = this.state;
    if (style.snapshotId < 0) {
      const defaultStyleCopy = Object.assign({}, style);
      defaultStyleCopy.snapshotId = Math.floor(Math.random() * 100000);
      defaultStyleCopy.styleName =
        defaultStyleCopy.styleName +
        ' ' +
        (history.styleHistory.snapshots.length + 1);
      history.styleHistory.snapshots.push(defaultStyleCopy);
      history.styleHistory.currSnapshotId = defaultStyleCopy.snapshotId;
    } else {
      history.styleHistory.currSnapshotId = style.snapshotId;
    }
    this.setState({
      history,
      wizardView: true,
    });
  };

  onDeleteStyleFromHistory = snapshotId => {
    const {history} = this.state;
    const update = _.filter(history.styleHistory.snapshots, function (o) {
      return o.snapshotId !== snapshotId;
    });
    history.styleHistory.snapshots = update;
    this.setState({
      history,
    });
  };

  updateHistory = history => {
    // dedup color history
    const dedupedColorHistory = _.uniqBy(history.colorHistory, 'name');
    history.colorHistory = dedupedColorHistory;
    this.setState({
      history,
    });
  };

  showSettings = () => {
    this.setState({
      settingsModalVisible: true,
    });
  };

  onSettingsCanceled = () => {
    this.setState({
      settingsModalVisible: false,
    });
  };

  onSettingsComplete = settingsData => {
    const {history} = this.state;
    history.settings = settingsData;
    this.setState({
      history,
      settingsModalVisible: false,
    });
  };

  _filterDefaults = history => {
    const filteredSnapshots = _.filter(
      history.styleHistory.snapshots,
      snap => snap.snapshotId >= 0,
    );
    history.styleHistory.snapshots = filteredSnapshots;
    return history;
  };

  _handleAppStateChange = async nextAppState => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      await storeHistory(this._filterDefaults(this.state.history));
    }
  };

  async componentDidMount() {
    eventListenerSubscription = AppState.addEventListener('change', this._handleAppStateChange);
    let savedHistory = await retrieveHistory();
    savedHistory = mergeHistoryWithDefaults(savedHistory || this.state.history);
    if (savedHistory) {
      try {
        this.setState({
          history: {
            styleHistory: savedHistory.styleHistory,
            colorHistory: savedHistory.colorHistory,
            settings: savedHistory.settings,
          },
        });
      } catch (err) {}
    }

    if (dv === 'phone') {
      Orientation.lockToPortrait();
    }
  }

  componentWillUnmount() {
      eventListenerSubscription.remove();
  }

  render() {
    const {history, wizardView, orientation, settingsModalVisible} = this.state;
    const homeIconDisabled = (
      <FontAwesomeIcon icon={faHome} size={40} color={OCM.fontColorDisabled} />
    );
    const settingsIcon = (
      <FontAwesomeIcon icon={faUserCog} size={40} color={OCM.mainColor} />
    );
    const textMargin = dimMgr[dv][orientation].blurb_marginTop;
    const dim = Dimensions.get('screen');
    const screenHeight = orientation === 'portrait' ? dim.height : dim.width;

    const paddingTop = PLATFORM == 'iOS' ? 60 : StatusBar.currentHeight;
    const isPhone = dv === 'phone';

    const styleListView = (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '96%',
          marginTop: dimMgr[dv][orientation].marginTop,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            maxHeight: 40,
          }}>
          <Image
            source={require('../../images/ocm-image-small.png')}
            style={{marginTop: isPhone ? 5 : 0}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: isPhone ? 0 : -dimMgr[dv][orientation].marginTop,
            }}>
            <TouchableOpacity
              style={{height: 40, justifyContent: 'flex-end'}}
              onPress={() => this.showSettings()}>
              {settingsIcon}
            </TouchableOpacity>
            <View style={{marginLeft: 10}}>{homeIconDisabled}</View>
          </View>
        </View>
        <View style={{marginTop: textMargin}}>
          <Text
            style={{...styles.textInput, fontSize: RFValue(18, screenHeight)}}>
            Create custom styles from OCM's catalog of prints, materials and
            colors. Custom colors are also supported.
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: 10,
            minHeight:
              Dimensions.get('screen').height *
              dimMgr[dv][orientation].projects_minHeight,
          }}>
          <View
            style={{
              marginTop: dimMgr[dv][orientation].recentProjects_marginTop,
            }}>
            <Text
              style={{
                ...styles.textHeader,
                color: OCM.fontColorTabHeader,
                marginBottom: 5,
              }}>
              Projects
            </Text>
          </View>
          <Divider style={styles.headerDivider} />
          <FlatList
            data={_.sortBy(
              history.styleHistory.snapshots,
              history.styleHistory.snapshots.styleName,
            )}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignContent: 'flex-end',
                  backgroundColor: '#f9f9f9',
                  borderBottomColor: 'white',
                  borderBottomWidth: 3,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: 3,
                    marginRight: 10,
                  }}>
                  <TouchableOpacity
                    disabled={item.snapshotId < 0}
                    onPress={() =>
                      item.snapshotId < 0
                        ? ''
                        : this.onDeleteStyleFromHistory(item.snapshotId)
                    }>
                    <FontAwesomeIcon
                      icon={faTrash}
                      size={20}
                      color={
                        item.snapshotId < 0
                          ? OCM.iconColorDisabled
                          : OCM.iconColorDark
                      }
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.onOpenStyle(item)}>
                  <Text
                    style={{
                      ...styles.textItemTyped,
                      fontSize: RFValue(26, screenHeight),
                    }}>
                    {item.styleName}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: OCM.iconColor,
            height: 50,
            borderRadius: 2,
            borderWidth: 1,
            marginBottom: 50,
          }}
          onPress={() => this.onCreateNewStyle()}>
          <Text
            style={{
              ...styles.textItem,
              fontSize: 28,
              alignSelf: 'center',
              color: 'white',
              marginTop: 6,
            }}>
            {plusIcon} Create New Style
          </Text>
        </TouchableOpacity>
      </View>
    );

    const styleWizardView = (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          width: '96%',
        }}>
        <CustomStylesWizard
          history={history}
          onReturnHome={this.onReturnHome}
          restartApp={this.onReturnHome}
          updateHistory={this.updateHistory}
          onSettingsComplete={this.onSettingsComplete}
          onSettingsCanceled={this.onSettingsCanceled}
        />
      </View>
    );

    return (
      <View
        style={{
          ...splashStyles.container,
          paddingTop: paddingTop,
          width: '96%',
        }}>
        <SettingsModal
          settingsModalVisible={settingsModalVisible}
          settings={history.settings}
          onSettingsComplete={this.onSettingsComplete}
          onSettingsCanceled={this.onSettingsCanceled}
        />
        {wizardView && styleWizardView}
        {!wizardView && styleListView}
      </View>
    );
  }
}
