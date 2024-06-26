import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {FlatGrid} from 'react-native-super-grid';
import Slider from '@react-native-community/slider';
import {capitalize} from '../../utils';
import {getImageByNameAndType} from '../../lib/ImageManager';
import {
  PrintRollerModalDimensions as dimMgr,
  DEVICE as dv,
} from '../../lib/DeviceDimensionManager';
import {fontf} from '../../lib/FontFamilyManager';

const printRollers = [
  'bamboo',
  'brushed',
  'delta',
  'grande',
  'hairline',
  'kbrushed',
  'k5',
  'maple',
  'morton',
  'oak',
  'sandobi',
  'spangle',
  'rift',
  'terrazzo1',
  'terrazzo2',
];

export default class PrintRollerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: this.props.printRollerOpacity
        ? Math.round(this.props.printRollerOpacity * 100)
        : 100,
      currentPrintRoller: props.currentPrintRoller,
    };
  }

  onBackdropPress = () => {
    this.setState({
      currentPrintRoller: undefined,
      sliderValue: this.props.printRollerOpacity
        ? Math.round(this.props.printRollerOpacity * 100)
        : 100,
    });
    const {onBackdropPressed} = this.props;
    onBackdropPressed();
  };

  onPrintRollerClicked = (printRoller, sliderValue) => {
    this.setState({
      currentPrintRoller: printRoller,
      sliderValue,
    });
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      slider: {
        height: 45,
        width: '50%',
      },
    });

    const {printRollerModalVisible, onLayerPrintRollerSelected, orientation} =
      this.props;
    const currentPrintRoller =
      this.state.currentPrintRoller || this.props.currentPrintRoller;

    const dimension = Dimensions.get('screen');
    return (
      <Modal
        isVisible={printRollerModalVisible}
        style={{
          backgroundColor: '#f9f9f9',
          width: '90%',
          maxHeight: dimension.height * dimMgr[dv][orientation].maxHeightRatio,
          marginTop: dimension.height * dimMgr[dv][orientation].marginTopRatio,
        }}
        onBackdropPress={() => this.onBackdropPress()}>
        <View
          style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
          <Text
            style={{
              fontFamily: fontf('FuturaPtBold'),
              fontSize: 22,
              color: '#67674f',
              marginTop: 10,
              marginBottom: 5,
              marginLeft: 20,
            }}>
            Print Rollers
          </Text>
          <Divider
            style={{
              backgroundColor: 'grey',
              marginBottom: dv === 'phone' ? 15 : 0,
            }}
          />
          <View
            style={{
              ...styles.container,
              flexDirection: 'row',
              marginTop: orientation === 'portrait' ? 0 : 20,
            }}>
            <Text style={{fontSize: 18, fontFamily: fontf('FuturaPtBold')}}>
              {this.state.sliderValue}%
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={20}
              maximumValue={100}
              thumbTintColor="black"
              step={5}
              value={Math.round(this.state.sliderValue)}
              minimumTrackTintColor="#67674f"
              maximumTrackTintColor="gray"
              onValueChange={value => this.setState({sliderValue: value})}
            />
          </View>
          <View style={{maxHeight: '80%'}}>
            <FlatGrid
              itemDimension={130}
              data={printRollers}
              renderItem={({item}) => (
                <View>
                  <Text style={{...styles.textItem}}>{capitalize(item)}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.onPrintRollerClicked(item, this.state.sliderValue)
                    }>
                    <Image
                      style={{
                        height: 120,
                        width: 130,
                        borderColor:
                          item === currentPrintRoller ? 'green' : 'white',
                        borderWidth: 6,
                        opacity: this.state.sliderValue / 100,
                      }}
                      source={getImageByNameAndType(item, 'printRoller')}
                    />
                  </TouchableOpacity>
                </View>
              )}
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
              onPress={() =>
                onLayerPrintRollerSelected(
                  currentPrintRoller,
                  this.state.sliderValue / 100,
                )
              }>
              <Text style={{...styles.textItem, fontSize: 22}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
