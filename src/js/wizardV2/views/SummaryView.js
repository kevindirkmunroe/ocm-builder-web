import React, {Component} from 'react';
import {Divider} from 'react-native-elements';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  ImageBackground,
} from 'react-native';
import {styles} from '../../lib/StyleManager';
import SummaryLayerStackComponent from '../components/SummaryLayerStackComponent';
import {getImageByNameAndType} from '../../lib/ImageManager';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import {OCM} from '../../lib/AppSkinManager';
import {fontf} from '../../lib/FontFamilyManager';
import {PLATFORM, DEVICE} from '../../lib/DeviceDimensionManager';

export default class SummaryView extends Component {
  constructor(props) {
    super(props);
  }

  _dotDotDot(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }

    return str.slice(0, maxLength - 3) + '...';
  }

  render() {
    const {
      wizardData: {styleName, backgroundColor, styleLayers},
      orientation,
      onSummarySnapshotReady,
    } = this.props;
    const dimension = Dimensions.get('screen');
    const viewWidth = dimension.width * 0.93;

    let backgroundColorView;
    if (backgroundColor.name.startsWith('#')) {
      backgroundColorView = (
        <View
          style={{
            backgroundColor: backgroundColor.name,
            height: 30,
            marginLeft: 20,
            borderWidth: 1,
            borderColor: backgroundColor.name,
            borderRadius: 2,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              fontWeight: 'bold',
              flex: 1,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 3,
              alignSelf: 'center',
            }}>
            {backgroundColor.name}
          </Text>
        </View>
      );
    } else {
      backgroundColorView = (
        <ImageBackground
          style={{
            height: 30,
            borderRadius: 2,
            marginLeft: 20,
            borderWidth: 1,
          }}
          source={getImageByNameAndType(backgroundColor.name, 'standardColor')}>
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              fontFamily: fontf('FuturaPtLight'),
              flex: 1,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 3,
              alignSelf: 'center',
            }}>
            {this._dotDotDot(
              _.startCase(backgroundColor.name),
              DEVICE === 'phone' ? 19 : 120,
            )}
          </Text>
        </ImageBackground>
      );
    }

    return (
      <View style={{width: viewWidth}}>
        <Text style={{...styles.textHeader, color: OCM.fontColorTabHeader}}>
          {' '}
          Style Summary
        </Text>
        <Divider style={styles.headerDivider} />
        <View style={{backgroundColor: '#ececec'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              marginTop: 5,
              color: 'black',
            }}>
            {' '}
            <FontAwesomeIcon icon={faCheck} size={18} color={OCM.fontColor} /> "
            {styleName}"
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                marginTop: 3,
                color: 'black',
              }}>
              {' '}
              <FontAwesomeIcon
                icon={faCheck}
                size={18}
                color={OCM.fontColor}
              />{' '}
              Background
            </Text>
            <View
              style={{
                flex: 1,
                width: '40%',
                flexDirection: 'row',
                marginTop: PLATFORM === 'iOS' ? 3 : 7,
                flexWrap: 'wrap',
              }}>
              {backgroundColorView}
            </View>
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 25, color: 'black'}}>
            {' '}
            <FontAwesomeIcon
              icon={faCheck}
              size={18}
              color={OCM.fontColor}
            />{' '}
            Layers
          </Text>
          <ScrollView
            contentContainerStyle={{
              marginTop: orientation === 'portrait' ? 20 : 0,
              flex: 1,
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
            <SummaryLayerStackComponent
              onSummarySnapshotReady={onSummarySnapshotReady}
              orientation={orientation}
              backgroundColor={backgroundColor}
              styleLayers={styleLayers}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}
