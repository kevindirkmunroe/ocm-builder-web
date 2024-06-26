import React, {Component} from 'react';
import {
  View,
  Image,
  Dimensions,
  NativeModules,
  TouchableOpacity,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import SummaryLayerComponent from './SummaryLayerComponent';
import {getImageByNameAndType} from '../../lib/ImageManager';
import {Divider} from 'react-native-elements';
import {styles} from '../../lib/StyleManager';
import ViewShot from 'react-native-view-shot';
import FullscreenImageModal from './FullscreenImageModal';
import {DEVICE as dv, PLATFORM as pf} from '../../lib/DeviceDimensionManager';

export default class SummaryLayerStackComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageModalVisible: false,
    };
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

  onCapture = async uri => {
    const {onSummarySnapshotReady} = this.props;
    onSummarySnapshotReady(uri);
  };

  render() {
    const {orientation, styleLayers, backgroundColor} = this.props;
    const {imageModalVisible} = this.state;
    const dimension = Dimensions.get('screen');
    const viewWidth =
      orientation === 'portrait'
        ? dimension.width * 0.94
        : dimension.width * 0.91;

    const compositeWidth =
      orientation === 'portrait'
        ? dv === 'phone'
          ? dimension.width
          : dimension.width * 0.94
        : dimension.width * 0.3;
    const compositeHeight =
      orientation === 'portrait'
        ? dimension.height * 0.3
        : dimension.height * 0.4;

    let backgroundColorView;
    if (backgroundColor.name.startsWith('#')) {
      backgroundColorView = (
        <View
          style={{
            backgroundColor: backgroundColor.name,
            zIndex: 0,
            width: compositeWidth - (pf === 'iOS' ? 48 : 52),
            height: compositeHeight,
            borderRadius: 10,
          }}
        />
      );
    } else {
      backgroundColorView = (
        <View style={{zIndex: 0, width: compositeWidth - 50}}>
          <Image
            style={{
              width: compositeWidth - (dv === 'phone' ? 50 : 90),
              height: compositeHeight,
              borderRadius: 10,
              borderWidth: 1,
            }}
            source={getImageByNameAndType(
              backgroundColor.name,
              'standardColor',
            )}
          />
        </View>
      );
    }

    let currZindex = 1;
    const compositePicMarginTop = 0;

    return (
      <View
        style={{
          width: viewWidth,
          flexDirection: orientation === 'portrait' ? 'column' : 'row',
          backgroundColor: '#ececec',
          alignItems: 'center',
          alignContent: 'stretch',
          justifyContent: 'center',
        }}>
        <FullscreenImageModal
          backgroundColor={backgroundColor.name}
          layers={styleLayers}
          imageModalVisible={imageModalVisible}
          hiddenLayers={[]}
          orientation={orientation}
          onBackdropPressed={this.onFullscreenBackdropPressed}
        />
        <FlatGrid
          itemDimension={viewWidth}
          data={styleLayers}
          renderItem={({item}) => (
            <View>
              <SummaryLayerComponent
                printRollerName={item.printRollerName}
                layerId={item.layerId}
                color={item.color}
              />
              <Divider style={styles.headerDivider} />
            </View>
          )}
        />
        <ViewShot onCapture={this.onCapture} captureMode="mount">
          <TouchableOpacity
            onPress={() => this.onFullscreenPressed()}
            style={{
              borderWidth: 4,
              borderColor: 'black',
              maxWidth: '95%',
              borderRadius: 13,
            }}>
            <View
              style={{
                alignContent: 'center',
                borderRadius: 13,
                marginRight: 10,
                marginTop: compositePicMarginTop,
              }}>
              {backgroundColorView}
              {styleLayers.map(oneLayer => {
                const margin = currZindex - 1;
                return (
                  <View style={{position: 'absolute', zIndex: currZindex++}}>
                    <Image
                      style={{
                        width:
                          compositeWidth -
                          (dv === 'phone' ? 54 : compositeWidth * 0.15),
                        height: compositeHeight,
                        borderRadius: 10,
                        tintColor: oneLayer.color
                          ? oneLayer.color.name
                          : undefined,
                        opacity: oneLayer.printRollerOpacity,
                        marginLeft: margin,
                      }}
                      source={getImageByNameAndType(
                        oneLayer.printRollerName,
                        'printRoller',
                      )}
                    />
                  </View>
                );
              })}
            </View>
          </TouchableOpacity>
        </ViewShot>
      </View>
    );
  }
}
