import React, {Component} from 'react';
import {Divider} from 'react-native-elements';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {styles} from '../../lib/StyleManager';
import LayerStackComponent from '../components/LayerStackComponent';
import PrintRollerModal from '../components/PrintRollerModal';
import _ from 'lodash';
import {DEVICE as dv} from '../../lib/DeviceDimensionManager';
import {OCM} from '../../lib/AppSkinManager';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
const plusIcon = (
  <FontAwesomeIcon icon={faPlusCircle} size={28} color="white" />
);

export default class StyleLayersView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      printRollerModalVisible: false,
    };
  }

  isPortrait = () => {
    const dim = Dimensions.get('window');
    return dim.height >= dim.width;
  };

  onLayersUpdated = (changedStyleLayers, color) => {
    const {onStyleLayersUpdated} = this.props;

    // update layerIds just in case layer was deleted
    let count = 1;
    changedStyleLayers.forEach(layer => {
      layer.layerId = count++;
    });

    onStyleLayersUpdated(changedStyleLayers, color);
  };

  onAddLayerSelected = () => {
    this.setState({
      printRollerModalVisible: true,
    });
  };

  onBackdropPressed = () => {
    this.setState({
      printRollerModalVisible: false,
    });
  };

  _getCurrentStyleSnapshot = styleHistory => {
    const currId = styleHistory.currSnapshotId;
    return _.find(styleHistory.snapshots, s => {
      return s.snapshotId === currId;
    });
  };

  onLayerPrintRollerSelected = (printRoller, printRollerOpacity) => {
    const {onStyleLayersUpdated, history} = this.props;
    const currStyle = this._getCurrentStyleSnapshot(history.styleHistory);
    const styleLayers = Object.assign([], currStyle.styleLayers);
    styleLayers.push({
      printRollerName: printRoller,
      printRollerOpacity,
    });

    // update layerIds since a new layer was added
    let count = 1;
    styleLayers.forEach(layer => {
      layer.layerId = count++;
    });

    onStyleLayersUpdated(styleLayers);

    this.setState({
      printRollerModalVisible: false,
    });
  };

  render() {
    const {
      deleteColorFromHistory,
      history,
      selectStyleFromHistory,
      deleteStyleFromHistory,
    } = this.props;
    const {printRollerModalVisible} = this.state;
    const orientation = this.isPortrait() ? 'portrait' : 'landscape';
    const viewWidth = '100%';

    const currStyle = this._getCurrentStyleSnapshot(history.styleHistory);
    const addStylesDisabled = currStyle.styleLayers.length > 3;

    return (
      <View style={{width: viewWidth, marginLeft: dv === 'phone' ? 5 : 10}}>
        <Text style={{...styles.textHeader, color: OCM.fontColorTabHeader}}>
          Layers
        </Text>
        <Divider style={styles.headerDivider} />
        <PrintRollerModal
          printRollerModalVisible={printRollerModalVisible}
          orientation={orientation}
          onLayerPrintRollerSelected={this.onLayerPrintRollerSelected}
          onBackdropPressed={this.onBackdropPressed}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: viewWidth,
              borderBottomWidth: 5,
              borderBottomColor: 'white',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: addStylesDisabled
                  ? OCM.fontColorDisabled
                  : OCM.fontColor,
                width: '99%',
                height: 60,
                borderRadius: 2,
                borderWidth: 1,
                marginTop: orientation === 'portrait' ? 14 : 2,
              }}
              onPress={() => this.onAddLayerSelected()}
              disabled={addStylesDisabled}>
              <Text
                style={{
                  ...styles.textItem,
                  fontSize: 28,
                  alignSelf: 'center',
                  color: 'white',
                  marginTop: dv == 'phone' ? 8 : 12,
                }}>
                {plusIcon} Add Style Layer
              </Text>
            </TouchableOpacity>
          </View>
          <LayerStackComponent
            orientation={orientation}
            history={history}
            onLayersUpdated={this.onLayersUpdated}
            deleteColorFromHistory={deleteColorFromHistory}
            selectStyleFromHistory={selectStyleFromHistory}
            deleteStyleFromHistory={deleteStyleFromHistory}
          />
        </View>
      </View>
    );
  }
}
