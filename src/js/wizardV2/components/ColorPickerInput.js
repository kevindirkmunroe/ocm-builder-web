import {Text, TextInput, View} from 'react-native';
import {styles} from '../../lib/StyleManager';
import React, {Component} from 'react';
import {PLATFORM} from '../../lib/DeviceDimensionManager';

export default class ColorPickerInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    {
      const {fieldName, fieldType, fieldValue, suffix, updateColorFromText} =
        this.props;
      let suffixView;
      if (suffix) {
        suffixView = (
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: PLATFORM === 'iOS' ? 10 : 18,
              marginLeft: 5,
              marginTop: 12,
            }}>
            {suffix}
          </Text>
        );
      }
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 3,
          }}>
          <Text
            style={{
              ...styles.textItem,
              alignItems: 'baseline',
              marginTop: 9,
              width: 20,
            }}>
            {fieldName}
          </Text>
          <TextInput
            style={{
              backgroundColor: 'white',
              height: 40,
              width: 35,
              alignItems: 'baseline',
              marginLeft: 5,
              borderWidth: 1,
            }}
            keyboardType={'numeric'}
            onChangeText={text =>
              updateColorFromText({text, type: fieldType, field: fieldName})
            }
            maxLength={3}
            value={fieldValue.toString()}
          />
          {suffixView}
        </View>
      );
    }
  }
}
