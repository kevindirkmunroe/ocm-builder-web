import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {getImageByNameAndType} from '../../lib/ImageManager';
import {styles} from '../../lib/StyleManager';
import FullscreenImageModal from './FullscreenImageModal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faExpand} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

const standardColors = [
  {name: 'Aged Bronze', colorName: 'agedBronze'},
  {name: 'Brick Red', colorName: 'brickRed'},
  {name: 'Colonial Red', colorName: 'colonialRed'},
  {name: 'Dark Bronze', colorName: 'darkBronze'},
  {name: 'Evergreen', colorName: 'evergreen'},
  {name: 'Forest Green', colorName: 'forestGreen'},
  {name: 'Matte Black', colorName: 'matteBlack'},
  {name: 'Old Town Gray', colorName: 'oldTownGray'},
  {name: 'Patina Green', colorName: 'patinaGreen'},
  {name: 'Rawhide', colorName: 'rawhide'},
  {name: 'Redwood', colorName: 'redwood'},
  {name: 'Regal Blue', colorName: 'regalBlue'},
  {name: 'Regal White', colorName: 'regalWhite'},
  {name: 'Sandstone', colorName: 'sandstone'},
  {name: 'Slate Blue', colorName: 'slateBlue'},
  {name: 'Slate Gray', colorName: 'slateGray'},
  {name: 'Snowdrift White', colorName: 'snowdriftWhite'},
  {name: 'Surrey Beige', colorName: 'surreyBeige'},
];

export default class StandardColorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: props.storedSelectedColor
        ? props.storedSelectedColor.name
        : undefined,
      imageModalVisible: false,
    };
  }

  updateColor(color) {
    const {onBackgroundColorSelected} = this.props;
    const newColor = {
      name: color,
    };
    onBackgroundColorSelected(newColor);
    this.setState({
      selectedColor: color,
    });
  }

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

  onFullscreenPressedWithColor = colorName => {
    this.setState({
      imageModalVisible: true,
    });

    this.updateColor(colorName);
  };

  getVisibleName = colorName => {
    const standardColor = _.find(standardColors, {colorName});
    if (standardColor) {
      return standardColor.name;
    }
  };

  render() {
    const {selectedColor, imageModalVisible} = this.state;
    const {orientation} = this.props;
    let selectedColorView;
    if (selectedColor && !selectedColor.startsWith('#')) {
      selectedColorView = (
        <TouchableOpacity
          onPress={() => this.onFullscreenPressed()}
          disabled={!selectedColor}>
          <View
            style={{
              backgroundColor: selectedColor ? selectedColor : 'white',
              width: 130,
              height: 30,
              borderWidth: 3,
              marginBottom: 3,
              borderColor: 'black',
              marginTop: 3,
            }}>
            <ImageBackground
              style={{
                backgroundColor: selectedColor ? selectedColor : 'white',
                height: 25,
              }}
              source={getImageByNameAndType(selectedColor, 'standardColor')}>
              <FontAwesomeIcon
                icon={faExpand}
                pull={'right'}
                size={18}
                color="white"
                style={{marginLeft: 5, marginTop: 2}}
              />
            </ImageBackground>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <ScrollView>
        <FullscreenImageModal
          backgroundColor={selectedColor}
          orientation={orientation}
          imageModalVisible={imageModalVisible}
          onBackdropPressed={this.onFullscreenBackdropPressed}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 2,
            borderRadius: 7,
            backgroundColor: '#f9f9f9',
            height: 44,
            margin: 5,
            marginTop: 15,
          }}>
          <View
            style={{
              width: '50%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                height: 30,
                marginRight: 20,
                color:
                  selectedColor && !selectedColor.startsWith('#')
                    ? 'black'
                    : 'grey',
              }}>
              {!selectedColor || selectedColor.startsWith('#')
                ? 'No Color'
                : this.getVisibleName(selectedColor)}
            </Text>
          </View>
          <View
            style={{
              width: '50%',
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            {selectedColorView}
          </View>
        </View>
        <View
          alwaysBounceVertical={false}
          showsHorizontalScrollIndicator={true}
          style={{flex: 1, marginLeft: 25, maxHeight: '150%'}}>
          <FlatGrid
            style={{height: '200%'}}
            itemDimension={90}
            data={standardColors}
            renderItem={({item}) => (
              <View>
                <Text
                  style={{...styles.textItem, marginLeft: -1, fontSize: 15}}>
                  {item.name}
                </Text>
                <TouchableOpacity
                  onLongPress={() =>
                    this.onFullscreenPressedWithColor(item.colorName)
                  }
                  onPress={() => this.updateColor(item.colorName)}>
                  <Image
                    style={{height: 25, width: 90}}
                    source={getImageByNameAndType(
                      item.colorName,
                      'standardColor',
                    )}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
    );
  }
}
