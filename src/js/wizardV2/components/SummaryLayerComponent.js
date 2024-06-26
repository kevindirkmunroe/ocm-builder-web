import React, {Component} from 'react';
import {Text, View, Image, Dimensions} from 'react-native';
import {getImageByNameAndType} from '../../lib/ImageManager';
import {styles} from '../../lib/StyleManager';
import {capitalize} from '../../utils';
import {DEVICE as dv} from '../../lib/DeviceDimensionManager';

export default class SummaryLayerComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {printRollerName, color, layerId} = this.props;
    const isPhone = dv === 'phone' ? true : false;

    const dimension = Dimensions.get('screen');
    const viewWidth = dimension.width;
    return (
      <View
        style={{
          width: viewWidth,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#f9f9f9',
        }}>
        <Text
          style={{
            ...styles.textItemWithMargin,
            backgroundColor: '#D3D3D3',
            width: isPhone ? '3%' : '10%',
          }}>
          {isPhone ? '' : 'Layer '}
          {layerId}
        </Text>
        <Text
          style={{
            ...styles.textItemWithMargin,
            width: isPhone ? '30%' : '25%',
          }}>
          {capitalize(printRollerName)}
        </Text>
        <Image
          style={{
            height: 35,
            width: isPhone ? '22%' : '25%',
            border: 10,
            backgroundColor: color ? color.name : 'white',
          }}
          source={getImageByNameAndType(printRollerName, 'printRoller')}
        />
        <Text
          style={{...styles.textItemWithMargin, marginLeft: 10, width: '25%'}}>
          {capitalize(color ? color.name : 'No Color')}
        </Text>
      </View>
    );
  }
}
