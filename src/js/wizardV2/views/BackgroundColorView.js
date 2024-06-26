import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {getImageByNameAndType} from '../../lib/ImageManager';
import {capitalize} from '../../utils';
import {FlatGrid} from 'react-native-super-grid';
import {styles} from '../../lib/StyleManager';
import StandardColorComponent from '../components/StandardColorComponent';
import MetallicColorComponent from '../components/MetallicColorComponent';
import CustomColorComponent from '../components/CustomColorComponent';
import {
  BackgroundColorViewDimensions as dimMgr,
  DEVICE as dv,
  PLATFORM,
} from '../../lib/DeviceDimensionManager';
import {OCM} from '../../lib/AppSkinManager';
import {fontf} from '../../lib/FontFamilyManager';

const colorTypes = ['standard', 'custom', 'metallic'];

export default class BackgroundColorView extends Component {
  constructor(props) {
    super(props);

    const {
      wizardData: {backgroundColor},
      onBackgroundColorSelected,
    } = props;
    let existingColorType;
    if (backgroundColor && backgroundColor.name) {
      existingColorType = backgroundColor.name.startsWith('#')
        ? 'custom'
        : 'standard';
      existingColorType = backgroundColor.name.startsWith('metallic')
        ? 'metallic'
        : existingColorType;
      onBackgroundColorSelected(backgroundColor); // for wizard to know state is valid
    }

    this.state = {
      selectedColorType: existingColorType,
    };
  }

  onColorTypeSelected(colorType) {
    this.setState({
      selectedColorType: colorType,
    });
  }

  render() {
    let {selectedColorType} = this.state;
    const {
      orientation,
      onBackgroundColorSelected,
      deleteColorFromHistory,
      wizardData: {backgroundColor},
      colorHistory,
    } = this.props;

    const dimension = Dimensions.get('screen');
    const marginTopMain = 0;
    let colorPanel;
    if (selectedColorType === 'standard') {
      colorPanel = (
        <View
          style={{
            marginTop:
              dv === 'phone' ? -20 : dimMgr[dv][orientation].marginTopStandard,
          }}>
          <StandardColorComponent
            orientation={orientation}
            storedSelectedColor={
              backgroundColor && backgroundColor.name.startsWith('metallic')
                ? ''
                : backgroundColor
            }
            onBackgroundColorSelected={onBackgroundColorSelected}
          />
        </View>
      );
    } else if (selectedColorType === 'metallic') {
      colorPanel = (
        <View
          style={{
            marginTop:
              dv === 'phone' ? -20 : dimMgr[dv][orientation].marginTopStandard,
          }}>
          <MetallicColorComponent
            orientation={orientation}
            storedSelectedColor={
              backgroundColor && backgroundColor.name.startsWith('metallic')
                ? backgroundColor
                : ''
            }
            onBackgroundColorSelected={onBackgroundColorSelected}
          />
        </View>
      );
    } else if (selectedColorType === 'custom') {
      colorPanel = (
        <View
          scrollEnabled={false}
          style={{
            marginTop:
              dv === 'phone' ? -10 : dimMgr[dv][orientation].marginTopCustom,
            width: '98%',
          }}>
          <CustomColorComponent
            orientation={orientation}
            storedSelectedColor={backgroundColor}
            metallicColorEnabled={true}
            onColorSelected={onBackgroundColorSelected}
            colorHistory={colorHistory}
            deleteColorFromHistory={deleteColorFromHistory}
          />
        </View>
      );
    } else {
      colorPanel = <View />;
    }

    return (
      <View
        scrollEnabled={false}
        style={{width: '98%', marginTop: dv === 'phone' ? 15 : 3}}>
        <Text style={{...styles.textHeader, color: OCM.fontColorTabHeader}}>
          Background Color
        </Text>
        <Divider style={styles.headerDivider} />
        <View
          style={{
            marginTop: marginTopMain,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatGrid
            itemDimension={
              PLATFORM === 'iOS' ? 95 : dimMgr[dv][orientation].tabWidth
            }
            data={colorTypes}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => this.onColorTypeSelected(item)}>
                <View
                  style={{
                    backgroundColor:
                      item === selectedColorType ? OCM.mainColor : 'white',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: fontf('FuturaPtLight'),
                      fontSize: 20,
                      color: item === selectedColorType ? 'white' : 'black',
                    }}>
                    {capitalize(item)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        {colorPanel}
      </View>
    );
  }
}
