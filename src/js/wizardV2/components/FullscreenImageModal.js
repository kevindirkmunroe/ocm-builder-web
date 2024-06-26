import React, {Component} from 'react';
import {
  Image,
  Dimensions,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import {getImageByNameAndType} from '../../lib/ImageManager';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {PLATFORM, DEVICE as dv} from '../../lib/DeviceDimensionManager';

export default class FullscreenImageModal extends Component {
  constructor(props) {
    super(props);
  }

  onBackdropPress = () => {
    const {onBackdropPressed} = this.props;
    onBackdropPressed();
  };

  isLayerHidden = (hiddenLayers, layerId) => {
    return hiddenLayers.find(x => x === layerId);
  };

  render() {
    const {
      backgroundColor,
      imageModalVisible,
      layers,
      hiddenLayers,
      orientation,
    } = this.props;
    const isPhone = dv === 'phone';

    let fullImage;
    if (layers) {
      let currZindex = 1;
      let backgroundColorView;
      if (backgroundColor && backgroundColor.startsWith('#')) {
        backgroundColorView = (
          <View
            style={{
              zIndex: 0,
              backgroundColor: backgroundColor,
              width: '100%',
              height: isPhone ? '99%' : '93%',
              marginTop: isPhone ? 5 : 30,
              borderRadius: 10,
            }}
          />
        );
      } else {
        backgroundColorView = (
          <View style={{zIndex: 0, borderColor: 'green'}}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
              source={getImageByNameAndType(backgroundColor, 'standardColor')}
            />
          </View>
        );
      }
      fullImage = (
        <View>
          {backgroundColorView}
          {layers.map(oneLayer => {
            const hidden = this.isLayerHidden(hiddenLayers, oneLayer.layerId);
            if (!hidden) {
              let currMaxHeight =
                Dimensions.get('screen').height *
                (isPhone ? 0.84 : orientation === 'portrait' ? 0.9 : 0.92);
              let layerMaxHeight;
              if (orientation === 'portrait') {
                if (isPhone) {
                  layerMaxHeight = currMaxHeight * 0.94;
                } else {
                  layerMaxHeight =
                    PLATFORM === 'iOS'
                      ? currMaxHeight * 0.85
                      : currMaxHeight * 0.9;
                }
              } else {
                layerMaxHeight =
                  currMaxHeight * (PLATFORM === 'iOS' ? 0.84 : 0.86);
              }
              return (
                <View
                  style={{
                    position: 'absolute',
                    zIndex: currZindex++,
                    maxWidth: '90%',
                  }}>
                  <Image
                    style={{
                      borderRadius: 10,
                      maxHeight: layerMaxHeight,
                      maxWidth: isPhone ? '120%' : '123%',
                      tintColor: oneLayer.color
                        ? oneLayer.color.name
                        : undefined,
                      opacity: oneLayer.printRollerOpacity,
                      marginLeft: (currZindex - 1.3) * 3,
                    }}
                    source={getImageByNameAndType(
                      oneLayer.printRollerName,
                      'printRoller',
                    )}
                  />
                </View>
              );
            }
          })}
          <TouchableOpacity
            style={{position: 'absolute', zIndex: currZindex++}}
            onPress={() => this.onBackdropPress()}>
            <FontAwesomeIcon
              icon={faWindowClose}
              pull={'right'}
              size={40}
              color="white"
              style={{marginLeft: 10, marginTop: 5}}
            />
          </TouchableOpacity>
        </View>
      );
    } else if (backgroundColor && backgroundColor.startsWith('#')) {
      let customMarginTop;
      if (PLATFORM === 'iOS') {
        if (isPhone) {
          customMarginTop = -350;
        } else {
          customMarginTop = orientation === 'portrait' ? -530 : -320;
        }
      } else {
        if (isPhone) {
          customMarginTop = -285;
        } else {
          customMarginTop = orientation === 'portrait' ? -410 : -300;
        }
      }
      fullImage = (
        <View
          style={{
            backgroundColor: backgroundColor ? backgroundColor : 'white',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            alignSelf: 'flex-start',
          }}>
          <TouchableOpacity onPress={() => this.onBackdropPress()}>
            <FontAwesomeIcon
              icon={faWindowClose}
              pull={'right'}
              size={40}
              color="white"
              style={{marginLeft: 10, marginTop: customMarginTop}}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      fullImage = (
        <View
          style={{
            backgroundColor: backgroundColor ? backgroundColor : 'white',
          }}>
          <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
            <ImageBackground
              style={{
                backgroundColor: backgroundColor ? backgroundColor : 'white',
                height: '100%',
              }}
              source={getImageByNameAndType(backgroundColor, 'standardColor')}>
              <TouchableOpacity onPress={() => this.onBackdropPress()}>
                <FontAwesomeIcon
                  icon={faWindowClose}
                  pull={'right'}
                  size={40}
                  color="white"
                  style={{marginLeft: 10, marginTop: 5}}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      );
    }

    return (
      <Modal
        isVisible={imageModalVisible}
        style={{
          backgroundColor: backgroundColor,
          borderColor: 'black',
          borderWidth: 7,
          borderRadius: 10,
          marginTop: PLATFORM === 'iOS' ? 50 : 0,
          width: '90%',
          maxHeight: PLATFORM === 'iOS' ? '80.5%' : '90%',
        }}
        onBackdropPress={() => this.onBackdropPress()}>
        {fullImage}
      </Modal>
    );
  }
}
