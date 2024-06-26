import React, {Component} from 'react';
import {Divider} from 'react-native-elements';
import {Text, TextInput, View, Dimensions, StyleSheet} from 'react-native';
import {styles} from '../../lib/StyleManager';
import {
  StyleNameViewDimensions as dimMgr,
  DEVICE as dv,
} from '../../lib/DeviceDimensionManager';
import {RFValue} from 'react-native-responsive-fontsize';
import {OCM} from '../../lib/AppSkinManager';
import {fontf} from '../../lib/FontFamilyManager';

const nameViewStyles = StyleSheet.create({
  buttonGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center', // if you want to fill rows left to right
    justifyContent: 'center',
  },
  item: {
    width: '18%', // is 50% of container width
  },
});

export default class StyleNameView extends Component {
  constructor(props) {
    super(props);
  }

  updateStyleName(styleName) {
    const {onStyleNameSet} = this.props;
    onStyleNameSet(styleName);
  }

  render() {
    const {wizardData, orientation} = this.props;
    let styleName = '';
    if (wizardData) {
      styleName = wizardData.styleName;
    }
    const dim = Dimensions.get('screen');
    const screenHeight = orientation === 'portrait' ? dim.height : dim.width;
    const textBoxRatio = orientation === 'portrait' ? 0.08 : 0.1;
    const labelMarginBottomRatio = orientation === 'portrait' ? 0.025 : 0.032;

    return (
      <View
        style={{
          marginTop: dimMgr[dv][orientation].marginTop,
          width: '96%',
          height: dim.height * 0.3,
        }}>
        <Text style={{...styles.textHeader, color: OCM.fontColorTabHeader}}>
          Style Name
        </Text>
        <Divider style={styles.headerDivider} />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              ...nameViewStyles.item,
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginRight: 20,
              marginBottom: dim.height * labelMarginBottomRatio,
            }}>
            <Text
              style={{
                fontFamily: fontf('FuturaPtLight'),
                fontSize: RFValue(24, screenHeight),
              }}>
              Name
            </Text>
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            <TextInput
              style={{
                height: dim.height * textBoxRatio,
                width: dim.width * 0.65,
                paddingLeft: 3,
                borderWidth: 2,
                borderRadius: 7,
                fontSize: RFValue(20, screenHeight),
              }}
              onChangeText={text => this.updateStyleName(text)}
              value={styleName}
            />
          </View>
        </View>
      </View>
    );
  }
}
