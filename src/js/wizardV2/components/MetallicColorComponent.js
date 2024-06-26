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
import {Divider} from 'react-native-elements';
import _ from 'lodash';

const standardColorsMetallic = [
  {name: 'Brass', colorName: 'metallicBrass', visibleName: 'Aged Bronze'},
  {
    name: 'Bright Copper',
    colorName: 'metallicBrightCopper',
    visibleName: 'Bright Copper',
  },
  {name: 'Champagne', colorName: 'metallicChampagne', visibleName: 'Champagne'},
  {
    name: 'Dark Blue Metal',
    colorName: 'metallicDarkBlueMetallic',
    visibleName: 'Dark Blue Metal',
  },
  {
    name: 'Dark Pewter',
    colorName: 'metallicDarkPewter',
    visibleName: 'Dark Pewter',
  },
  {
    name: 'Emerald Green',
    colorName: 'metallicEmeraldGreenMetallic',
    visibleName: 'Emerald Green',
  },
  {name: 'Gold', colorName: 'metallicGold', visibleName: 'Gold'},
  {
    name: 'Light Blue',
    colorName: 'metallicLightBlueMetallic',
    visibleName: 'Light Blue',
  },
  {name: 'Pewter', colorName: 'metallicPewter', visibleName: 'Pewter'},
  {name: 'Pink', colorName: 'metallicPinkMetallic', visibleName: 'Pink'},
  {
    name: 'Red Copper',
    colorName: 'metallicRedCopper',
    visibleName: 'Red Copper',
  },
  {name: 'Silver', colorName: 'metallicSilver', visibleName: 'Silver'},
];

export default class MetallicColorComponent extends Component {
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
    const metallicColor = _.find(standardColorsMetallic, {colorName});
    if (metallicColor) {
      return metallicColor.visibleName;
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
      <View>
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
                color: selectedColor ? 'black' : 'grey',
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
        <ScrollView style={{flex: 1, marginLeft: 25, bounces: false}}>
          <FlatGrid
            itemDimension={130}
            data={standardColorsMetallic}
            renderItem={({item}) => (
              <View>
                <Text style={styles.textItem}>{item.name}</Text>
                <TouchableOpacity
                  onLongPress={() =>
                    this.onFullscreenPressedWithColor(item.colorName)
                  }
                  onPress={() => this.updateColor(item.colorName)}>
                  <Image
                    style={{height: 25, width: 130}}
                    source={getImageByNameAndType(
                      item.colorName,
                      'standardColor',
                    )}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}
