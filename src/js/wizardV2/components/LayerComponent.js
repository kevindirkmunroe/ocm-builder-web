import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {getImageByNameAndType} from '../../lib/ImageManager';
import {styles} from '../../lib/StyleManager';
import {capitalize} from '../../utils';
import PrintRollerModal from './PrintRollerModal';
import CustomColorModal from './CustomColorModal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {DEVICE as dv} from '../../lib/DeviceDimensionManager';
import {OCM} from '../../lib/AppSkinManager';

export default class LayerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printRollerModalVisible: false,
      colorModalVisible: false,
    };
  }

  onSelectColor = color => {
    const {layerId, onSelectColor} = this.props;
    onSelectColor(layerId, color);

    this.setState({
      colorModalVisible: false,
    });
  };

  onChangePrintRoller() {
    this.setState({
      printRollerModalVisible: true,
    });
  }

  onColorPressed = () => {
    this.setState({
      colorModalVisible: true,
    });
  };

  onBackdropPressed = () => {
    this.setState({
      printRollerModalVisible: false,
      colorModalVisible: false,
    });
  };

  onLayerPrintRollerSelected = (printRollerName, printRollerOpacity) => {
    const {layerId, onSelectPrintRoller} = this.props;
    onSelectPrintRoller(layerId, printRollerName, printRollerOpacity);

    this.setState({
      printRollerModalVisible: false,
    });
  };

  onDeleteLayer() {
    const {onDeleteLayer, layerId} = this.props;
    onDeleteLayer(layerId);
  }

  onHideLayer() {
    const {onHideLayer, layerId} = this.props;
    onHideLayer(layerId);
  }

  render() {
    const {
      printRollerName,
      printRollerOpacity,
      color,
      layerId,
      orientation,
      isHidden,
      colorHistory,
      deleteColorFromHistory,
    } = this.props;
    const {printRollerModalVisible, colorModalVisible} = this.state;

    let hideIcon;
    if (isHidden) {
      hideIcon = (
        <FontAwesomeIcon icon={faEyeSlash} size={23} color="lightgray" />
      );
    } else {
      hideIcon = (
        <FontAwesomeIcon icon={faEye} size={23} color={OCM.iconColorDark} />
      );
    }

    const isPhone = dv === 'phone';
    let opacityPercentage = isPhone ? (
      <Text />
    ) : (
      <Text style={{...styles.textItemWithMargin, fontSize: 16, width: '7%'}}>
        {printRollerOpacity ? Math.round(printRollerOpacity * 100) : 100}%{' '}
      </Text>
    );

    return (
      <View
        style={{
          width: '100%',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <CustomColorModal
          colorModalVisible={colorModalVisible}
          orientation={orientation}
          onColorSelected={this.onSelectColor}
          onBackdropPressed={this.onBackdropPressed}
          colorHistory={colorHistory}
          deleteColorFromHistory={deleteColorFromHistory}
          selectedColor={color}
        />
        <PrintRollerModal
          printRollerModalVisible={printRollerModalVisible}
          orientation={orientation}
          currentPrintRoller={printRollerName}
          printRollerOpacity={printRollerOpacity}
          onLayerPrintRollerSelected={this.onLayerPrintRollerSelected}
          onBackdropPressed={this.onBackdropPressed}
        />
        <Text style={{...styles.textItem, width: '3%'}}>{layerId}</Text>
        <Text
          style={{
            ...styles.textItemWithMargin,
            width: isPhone ? '23%' : '17%',
          }}>
          {isPhone && printRollerName.length > 8
            ? capitalize(printRollerName.substring(0, 8)) + '...'
            : capitalize(printRollerName)}
        </Text>
        {opacityPercentage}
        <View style={{width: '22%'}}>
          <TouchableOpacity
            onPress={() => this.onChangePrintRoller()}
            style={{backgroundColor: color ? color.name : 'white'}}>
            <Image
              style={{height: 35, width: '99%', opacity: printRollerOpacity}}
              source={getImageByNameAndType(printRollerName, 'printRoller')}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: '25%', marginLeft: 5}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'grey',
              height: 30,
              borderRadius: 10,
              borderWidth: 1,
            }}
            onPress={() => this.onColorPressed()}>
            <View
              style={{
                width: '99%',
                height: 25,
                borderRadius: 10,
                backgroundColor: color ? color.name : 'white',
                flex: 1,
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{...styles.textWithShadow, marginTop: 2}}>
                {capitalize(color ? color.name : 'No Color')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '10%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{height: 30, width: 30, marginTop: 3}}
            onPress={() => this.onHideLayer()}>
            {hideIcon}
          </TouchableOpacity>
        </View>
        <View style={{width: '5%'}}>
          <TouchableOpacity
            style={{height: 30, width: 30, marginTop: 3}}
            onPress={() => this.onDeleteLayer()}>
            <FontAwesomeIcon
              icon={faTrash}
              size={23}
              color={OCM.iconColorDark}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
