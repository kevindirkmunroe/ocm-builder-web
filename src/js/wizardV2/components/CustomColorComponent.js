import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  capitalize,
  HSV2hex,
  HSV2RGB,
  RGB2HSV,
  hex2HSV,
  hex2RGB,
} from '../../utils';
import ColorPickerInput from './ColorPickerInput';
import {Divider} from 'react-native-elements';
import {
  CustomColorComponentDimensions as dimMgr,
  DEVICE as dv,
  PLATFORM,
} from '../../lib/DeviceDimensionManager';
import RBSheet from 'react-native-raw-bottom-sheet';
import {styles} from '../../lib/StyleManager';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash, faHistory, faExpand} from '@fortawesome/free-solid-svg-icons';
import FullscreenImageModal from './FullscreenImageModal';
import ColorPicker, {
  Panel1,
  Panel3,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';
import DropdownPicker from 'react-native-dropdown-picker';
import {
  getHexFromPantone,
  getPantoneFromHex,
  PANTONE,
} from '../../lib/ImageManager';
import {OCM} from '../../lib/AppSkinManager';
import {fontf} from '../../lib/FontFamilyManager';

export default class CustomColorComponent extends Component {
  constructor(props) {
    super(props);

    if (props.storedSelectedColor) {
      const storedHsv = hex2HSV(props.storedSelectedColor.name);
      const storedRGB = hex2RGB(props.storedSelectedColor.name);
      this.state = {
        selectedColor: props.storedSelectedColor.name,
        hue: storedHsv[0],
        saturation: storedHsv[1],
        value: storedHsv[2],
        rgb: storedRGB,
        imageModalVisible: false,
        isMetallic: props.storedSelectedColor.isMetallic ? true : false,
        pantoneSelect: getPantoneFromHex(props.storedSelectedColor.name),
      };
    } else {
      this.state = {
        selectedColor: undefined,
        hue: 0,
        saturation: 0,
        value: 1,
        rgb: [0, 0, 0],
        isMetallic: false,
        pantoneSelect: 'Select',
      };
    }
    this.onSatValPickerChange = this.onSatValPickerChange.bind(this);
    this.onHuePickerChange = this.onHuePickerChange.bind(this);
  }

  updateColor(hue, saturation, value, hexColor, notes) {
    const {onColorSelected} = this.props;
    let color;
    if (!hexColor) {
      color = '#' + HSV2hex(hue, saturation, value);
    } else {
      color = hexColor;
    }
    const newColor = {
      name: color,
      notes: notes,
    };

    onColorSelected(newColor);
    this.setState({
      hue,
      saturation,
      value,
      selectedColor: color,
      rgb: HSV2RGB(hue, saturation, value),
    });
  }

  updateColorFromText = textfieldUpdate => {
    const {text: newValue, type, field} = textfieldUpdate;
    let {rgb, hue, saturation, value} = this.state;
    switch (field) {
      case 'R':
        rgb[0] = newValue;
        break;
      case 'G':
        rgb[1] = newValue;
        break;
      case 'B':
        rgb[2] = newValue;
        break;
      case 'H':
        hue = newValue;
        break;
      case 'S':
        saturation = newValue;
        break;
      case 'V':
        value = newValue;
        break;
    }
    if (type === 'rgb') {
      const newHSV = RGB2HSV(rgb);
      hue = newHSV[0];
      saturation = newHSV[1];
      value = newHSV[2];
    } else if (type === 'hsv') {
      rgb = HSV2RGB(hue, saturation, value);
    }
    const newColor = '#' + HSV2hex(hue, saturation, value);
    const {onColorSelected} = this.props;
    const newColorData = {
      name: newColor,
    };
    onColorSelected(newColorData);

    this.setState({
      hue,
      saturation,
      value,
      selectedColor: newColor,
      pantoneSelect: 'Select',
      rgb,
    });
  };

  onSatValPickerChange({saturation, value}) {
    const {hue} = this.state;
    this.setState({
      pantoneSelect: 'Select',
    });
    this.updateColor(hue, saturation, value);
  }

  onHuePickerChange({hue}) {
    const {saturation, value} = this.state;
    this.setState({
      pantoneSelect: 'Select',
    });
    this.updateColor(hue, saturation, value);
  }

  onSelectColorFromHistory = color => {
    const newHSV = hex2HSV(color);
    const pantone = getPantoneFromHex(color);
    this.setState({
      pantoneSelect: pantone,
    });
    this.updateColor(newHSV[0], newHSV[1], newHSV[2], color);
  };

  onDeleteColorFromHistory = color => {
    const {deleteColorFromHistory} = this.props;
    deleteColorFromHistory(color);
  };

  onFullscreenBackdropPressed = () => {
    this.setState({
      imageModalVisible: false,
    });
  };

  onFullscreenPressed = () => {
    this.setState({
      imageModalVisible: true,
    });
  };

  onSelectColor = ({hex}) => {
    // do something with the selected color.
    console.log(hex);
  };

  onChangePantoneColor = (pantone, index) => {
    const hexValue = getHexFromPantone(pantone);
    const newHSV = hex2HSV(hexValue);
    this.setState({
      pantoneSelect: pantone,
    });
    this.updateColor(
      newHSV[0],
      newHSV[1],
      newHSV[2],
      hexValue,
      `PANTONE ${pantone}`,
    );
  };

  render() {
    const {
      selectedColor,
      hue,
      saturation,
      value,
      rgb,
      imageModalVisible,
      pantoneSelect,
    } = this.state;
    const {orientation, colorHistory} = this.props;

    const dimension = Dimensions.get('screen');
    const viewWidth =
      orientation === 'portrait'
        ? dimension.width * 0.9
        : dimension.width * 0.8;
    const isPhone = dv === 'phone' ? true : false;

    let selectedColorView;
    selectedColorView = (
      <TouchableOpacity
        onPress={() => this.onFullscreenPressed()}
        disabled={!selectedColor || !selectedColor.startsWith('#')}>
        <View
          style={{
            backgroundColor: selectedColor ? selectedColor : 'white',
            width: isPhone ? 110 : 130,
            height: 30,
            marginLeft: 12,
            borderWidth: 3,
            borderColor: 'black',
            marginTop: 5,
          }}>
          <FontAwesomeIcon
            icon={faExpand}
            pull={'right'}
            size={18}
            color="white"
            style={{marginLeft: 5, marginTop: 3}}
          />
        </View>
      </TouchableOpacity>
    );

    const colorHistoryRaw = (
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          margin: 5,
          borderColor: 'black',
          backgroundColor: 'grey',
          height: dimension.height * 0.25,
          alignContent: 'center',
        }}>
        <Text
          style={{
            ...styles.textHeader,
            marginLeft: 3,
            fontFamily: fontf('FuturaPtBold'),
            fontSize: 18,
            color: 'black',
            fontStyle: 'italic',
          }}>
          Color History
        </Text>
        <Divider style={{backgroundColor: 'black', borderBottomWidth: 2}} />
        <View style={{flex: 1, marginBottom: 5}}>
          <ScrollView style={{marginHorizontal: 3, persistentScrollbar: true}}>
            <FlatList
              scrollIndicatorInsets={{right: 1}}
              showsHorizontalScrollIndicator={true}
              data={colorHistory}
              renderItem={({item}) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'center',
                    backgroundColor: '#D3D3D3',
                    borderColor: 'white',
                    borderWidth: 1,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.onDeleteColorFromHistory(item.name)}
                    style={{marginTop: 3, marginLeft: 3, marginRight: 8}}>
                    <FontAwesomeIcon icon={faTrash} size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.onSelectColorFromHistory(item.name)}>
                    <Text
                      style={{
                        ...styles.textWithShadow,
                        backgroundColor: item.name,
                        marginBottom: 2,
                        marginRight: 30,
                        width: '100%',
                        height: 30,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
        </View>
      </View>
    );

    let colorHistoryPanel;
    if (dimMgr[dv][orientation].showColorHistory) {
      colorHistoryPanel = colorHistoryRaw;
    }

    const pantoneCustomData = PANTONE;

    let historyButton;
    if (dv === 'phone') {
      historyButton = (
        <TouchableOpacity
          onPress={() => this.RBSheet.open()}
          style={{marginTop: 10, marginLeft: 15, marginRight: 20}}>
          <FontAwesomeIcon icon={faHistory} size={20} color="#67674f" />
        </TouchableOpacity>
      );
    } else {
      historyButton = <View />;
    }

    return (
      <ScrollView scrollEnabled={false}>
        <FullscreenImageModal
          backgroundColor={selectedColor}
          imageModalVisible={imageModalVisible}
          orientation={orientation}
          onBackdropPressed={this.onFullscreenBackdropPressed}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderWidth: 2,
            borderRadius: 7,
            height: '20%',
            margin: 5,
            flexDirection: 'row',
            backgroundColor: '#f9f9f9',
          }}>
          <View
            style={{
              width: '50%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{fontSize: 18, color: selectedColor ? 'black' : 'grey'}}>
              {selectedColor && selectedColor.startsWith('#')
                ? capitalize(selectedColor)
                : 'No Color'}
            </Text>
          </View>
          <View
            style={{
              width: '25%',
              marginBottom: 5,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            {selectedColorView}
            <RBSheet
              ref={ref => {
                this.RBSheet = ref;
              }}
              height={250}
              openDuration={250}
              customStyles={{
                container: {
                  backgroundColor: 'lightgray',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                },
              }}>
              {colorHistoryRaw}
            </RBSheet>
            {historyButton}
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            backgroundColor: '#f9f9f9',
            borderWidth: 0.7,
            maxWidth: isPhone ? '97%' : '99%',
            marginLeft: 5,
            marginTop: isPhone ? 0 : 5,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              marginTop: 5,
              marginLeft: 10,
              alignSelf: 'center',
            }}>
            PANTONE
          </Text>
          <DropdownPicker
            value={PANTONE[0].value}
            setValue={null}
            items={PANTONE}
            open={false}
            setOpen={null}
            style={{
              fontSize: 18,
              color: 'black',
              width: 100,
              marginLeft: 3,
              marginTop: 3,
              marginBottom: 3,
              alignSelf: 'center',
            }}
          />
        </View>
        <View
          scrollEnabled={true}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            backgroundColor: OCM.backgroundColorLight,
            margin: 5,
            marginTop: 10,
            width:
              dv === 'phone' ? (PLATFORM === 'iOS' ? '115%' : '110%') : '99%',
            marginLeft: -5,
            alignItems: 'center',
          }}>
          <View
            scrollEnabled={false}
            style={{
              width: dv === 'tablet' ? '40%' : '60%',
              marginLeft: 12,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <ColorPicker
              style={{width: '70%'}}
              value="lightGreen"
              onComplete={this.onSelectColor}
              boundedThumb={true}
              thumbSize={20}>
              <Preview hideInitialColor={true} />
              <Panel3 />
              <HueSlider />
              <OpacitySlider />
              <Swatches />
            </ColorPicker>
          </View>
          <View
            style={{
              justifyContent: 'center',
              width: '19%',
              marginTop: 3,
              marginLeft: isPhone ? '5%' : '15%',
              flexDirection: 'column',
            }}>
            <ColorPickerInput
              updateColorFromText={this.updateColorFromText}
              fieldName={'R'}
              fieldType={'rgb'}
              fieldValue={rgb[0]}
            />
            <ColorPickerInput
              updateColorFromText={this.updateColorFromText}
              fieldName={'G'}
              fieldType={'rgb'}
              fieldValue={rgb[1]}
            />
            <ColorPickerInput
              updateColorFromText={this.updateColorFromText}
              fieldName={'B'}
              fieldType={'rgb'}
              fieldValue={rgb[2]}
            />
            <ColorPickerInput
              updateColorFromText={this.updateColorFromText}
              fieldName={'H'}
              fieldType={'hsv'}
              fieldValue={Math.floor(hue)}
              suffix={'°'}
            />
            <ColorPickerInput
              updateColorFromText={this.updateColorFromText}
              fieldName={'S'}
              fieldType={'hsv'}
              fieldValue={Math.floor(
                saturation <= 1 ? saturation * 100 : saturation,
              )}
              suffix={'%'}
            />
            <ColorPickerInput
              updateColorFromText={this.updateColorFromText}
              fieldName={'V'}
              fieldType={'hsv'}
              fieldValue={Math.floor(value <= 1 ? value * 100 : value)}
              suffix={'%'}
            />
          </View>
          <View style={{width: '20%'}}>{colorHistoryPanel}</View>
        </View>
      </ScrollView>
    );
  }
}
