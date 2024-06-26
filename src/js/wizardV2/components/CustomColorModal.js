import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Dimensions, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../../lib/StyleManager';
import CustomColorComponent from './CustomColorComponent';
import {Divider} from 'react-native-elements';
import {
  CustomColorModalDimensions as dimMgr,
  DEVICE as dv,
} from '../../lib/DeviceDimensionManager';
import {OCM} from '../../lib/AppSkinManager';
import {fontf} from '../../lib/FontFamilyManager';

let selectedColor = null;

export default class CustomColorModal extends Component {
  constructor(props) {
    super(props);
  }

  onBackdropPress = () => {
    const {onBackdropPressed} = this.props;
    onBackdropPressed();
  };

  onColorSelected = newColor => {
    selectedColor = newColor;
  };

  onSelectComplete = () => {
    const {onColorSelected} = this.props;
    onColorSelected(selectedColor);
  };

  render() {
    const {
      colorModalVisible,
      colorHistory,
      deleteColorFromHistory,
      orientation,
      selectedColor,
      pantoneSelect,
    } = this.props;
    const dimension = Dimensions.get('screen');

    return (
      <Modal
        isVisible={colorModalVisible}
        style={{
          width: '98%',
          marginLeft: 7,
          maxHeight: dimension.height * dimMgr[dv][orientation].maxHeightRatio,
          marginTop: dimension.height * dimMgr[dv][orientation].marginTopRatio,
        }}
        onBackdropPress={() => this.onBackdropPress()}>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <View>
            <CustomColorComponent
              colorHistory={colorHistory}
              orientation={orientation}
              onColorSelected={this.onColorSelected}
              deleteColorFromHistory={deleteColorFromHistory}
              storedSelectedColor={selectedColor}
              pantoneSelect={pantoneSelect}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              maxHeight: dimension.height * 0.2,
            }}>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => this.onBackdropPress()}>
              <Text style={{...styles.textItem, fontSize: 22}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{justifyContent: 'center', marginLeft: 25}}
              onPress={() => this.onSelectComplete()}>
              <Text style={{...styles.textItem, fontSize: 22}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
