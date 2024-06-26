import {StyleSheet} from 'react-native';
import {fontf} from './FontFamilyManager';

const styles = StyleSheet.create({
  /* OCM SWATCH:
        HTML/HEX code:	#acac84
        RGB code:	rgb(172, 172, 132)
    */

  /* Text Styles */
  textHeader: {
    fontSize: 20,
    color: '#67674f',
    fontFamily: fontf('FuturaPtBold'),
  },
  textItem: {
    fontSize: 18,
    marginLeft: 3,
    color: 'black',
    fontFamily: fontf('FuturaPTLight'),
  },
  textItemTyped: {
    fontSize: 18,
    marginLeft: 3,
    color: 'black',
  },
  textItemSelected: {
    fontSize: 18,
    color: 'black',
    fontFamily: fontf('FuturaPtBold'),
  },
  textItemWithMargin: {
    fontSize: 18,
    marginLeft: 15,
    width: 85,
    color: 'black',
    fontFamily: fontf('FuturaPtBold'),
  },
  textItemWithMarginPhone: {
    fontSize: 18,
    marginLeft: 15,
    width: 30,
    color: 'black',
    fontFamily: fontf('FuturaPtBold'),
  },
  textWithShadow: {
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 0},
    textShadowRadius: 1,
    fontSize: 16,
    fontWeight: '800',
  },
  textItemSummaryName: {
    fontSize: 18,
    textAlignVertical: 'bottom',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    color: 'black',
    fontFamily: fontf('FuturaPtBold'),
  },
  textItemSummaryValue: {
    fontSize: 18,
    textAlignVertical: 'bottom',
    color: 'green',
    fontFamily: fontf('FuturaPtBold'),
  },
  textItemSummaryValueFinal: {
    fontSize: 18,
    marginLeft: 10,
    textAlignVertical: 'bottom',
    flexGrow: 1,
    color: 'green',
    fontFamily: fontf('FuturaPtBold'),
  },

  /* Image Styles */
  headerDivider: {
    height: 2,
  },
  imageSelectedItem_tablet: {
    width: 130,
    height: 30,
    marginLeft: 10,
    marginTop: 5,
  },
  imageLarge_tablet: {
    height: 180,
    width: 220,
  },
  imageLarge_phone: {
    height: 140,
    width: 180,
  },
  imageBrandIcon: {
    position: 'absolute',
    top: 30,
    left: 0,
  },
  imageBrandIcon_phone: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  imageSummaryItem: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 5,
  },

  /* View Layout Styles */
  viewSelectedItem: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
});

module.exports = {
  styles,
};
