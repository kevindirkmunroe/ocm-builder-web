import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LayerComponent from './LayerComponent';
import {getImageByNameAndType} from '../../lib/ImageManager';
import {Divider} from 'react-native-elements';
import {styles} from '../../lib/StyleManager';
import _ from 'lodash';
import {
  LayerStackComponentDimensions as dimMgr,
  DEVICE as dv,
} from '../../lib/DeviceDimensionManager';
import FullscreenImageModal from './FullscreenImageModal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faExpand, faHistory} from '@fortawesome/free-solid-svg-icons';
import DraggableFlatList from 'react-native-draggable-flatlist';
import RBSheet from 'react-native-raw-bottom-sheet';

export default class LayerStackComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenLayers: [],
      imageModalVisible: false,
    };
  }

  _getCurrentStyleSnapshot = styleHistory => {
    const currId = styleHistory.currSnapshotId;
    return _.find(styleHistory.snapshots, s => {
      return s.snapshotId === currId;
    });

  };

  _getStyleLayers = () => {
    const {history} = this.props;
    return this._getCurrentStyleSnapshot(history.styleHistory).styleLayers;
  };

  onSelectPrintRoller = (layerId, printRollerName, printRollerOpacity) => {
    const {onLayersUpdated} = this.props;
    const styleLayers = this._getStyleLayers();
    const toChange = _.find(styleLayers, ['layerId', layerId]);
    toChange.printRollerName = printRollerName;
    toChange.printRollerOpacity = printRollerOpacity;
    onLayersUpdated(styleLayers);
  };

  onSelectColor = (layerId, color) => {
    const {onLayersUpdated} = this.props;
    const styleLayers = this._getStyleLayers();
    const toChange = _.find(styleLayers, ['layerId', layerId]);
    toChange.color = color;
    onLayersUpdated(styleLayers, color);
  };

  onDeleteLayer = layerId => {
    const {onLayersUpdated} = this.props;
    const styleLayers = this._getStyleLayers();
    const updatedLayers = _.filter(styleLayers, function (o) {
      return o.layerId !== layerId;
    });
    onLayersUpdated(updatedLayers);
  };

  isLayerHidden = layerId => {
    const {hiddenLayers} = this.state;
    return hiddenLayers.find(x => x === layerId);
  };

  onHideLayer = layerId => {
    const {hiddenLayers} = this.state;
    if (!this.isLayerHidden(layerId)) {
      hiddenLayers.push(layerId);
      this.setState({
        hiddenLayers,
      });
    } else {
      const updatedArray = hiddenLayers.filter(function (el) {
        return el != layerId;
      });
      this.setState({
        hiddenLayers: updatedArray,
      });
    }
  };

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

  onListDragEnd = params => {
    const {from, to} = params;
    const styleLayers = this._getStyleLayers();
    [styleLayers[from], styleLayers[to]] = [styleLayers[to], styleLayers[from]];

    const {onLayersUpdated} = this.props;
    onLayersUpdated(styleLayers);
  };

  makeStyleSnapshot = (backgroundColor, styleLayers) => {
    let backgroundColorView;
    const compositeWidth = 40;
    const compositeHeight = 30;
    if (backgroundColor.name.startsWith('#')) {
      if (backgroundColor.metallic) {
        backgroundColorView = (
          <View style={{alignContent: 'center'}}>
            <Image
              style={{
                width: compositeWidth,
                zIndex: 0,
                height: compositeHeight,
                marginLeft: 3,
                borderRadius: 10,
              }}
              source={{uri: `data:image/png;base64,${bgMetallicBase64}`}}
            />
          </View>
        );
      } else {
        backgroundColorView = (
          <View
            style={{
              backgroundColor: backgroundColor.name,
              zIndex: 0,
              width: compositeWidth,
              height: compositeHeight,
              marginLeft: 3,
              borderRadius: 10,
            }}
          />
        );
      }
    } else {
      backgroundColorView = (
        <View style={{zIndex: 0}}>
          <Image
            style={{
              width: compositeWidth,
              height: compositeHeight,
              marginLeft: 3,
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
    return (
      <View style={{marginTop: 3}}>
        {backgroundColorView}
        {styleLayers.map(oneLayer => {
          return (
            <View style={{position: 'absolute', zIndex: currZindex++}}>
              <Image
                style={{
                  width: compositeWidth,
                  height: compositeHeight,
                  marginLeft: 3,
                  borderRadius: 10,
                  borderWidth: 1,
                  tintColor: oneLayer.color ? oneLayer.color.name : undefined,
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
    );
  };

  render() {
    const {
      orientation,
      history,
      deleteColorFromHistory,
      selectStyleFromHistory,
    } = this.props;
    const {imageModalVisible} = this.state;
    const currSnapshot = this._getCurrentStyleSnapshot(history.styleHistory);
    const {metallicImage: bgMetallicBase64} = currSnapshot.backgroundColor;
    const dimension = Dimensions.get('screen');
    const viewWidth = dimension.width * 0.94;

    const compositeWidth =
      dimension.width * dimMgr[dv][orientation].compositeWidthRatio;
    const compositeHeight =
      dimension.height * dimMgr[dv][orientation].compositeHeightRatio;

    // Styles need at least a background color to be displayed in history
    const displayableStyleHistoryList = history.styleHistory.snapshots.filter(
      snapshot => {
        return snapshot.backgroundColor !== undefined;
      },
    );

    console.debug(`LayerStackComponent: orientation=${orientation}`);
    let styleHistoryPanelPortrait = (
      <View
        style={{
          flex: 0,
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 10,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          flexGrow: 1,
          marginLeft: 3,
          height: orientation === 'portrait' ? compositeHeight : '40%',
          backgroundColor: 'gray',
        }}>
        <Text
          style={{
            ...styles.textItem,
            fontSize: 18,
            marginLeft: 5,
            fontStyle: 'italic',
            marginTop: -1,
          }}>
          {' '}
          Style History
        </Text>
        <Divider style={{backgroundColor: 'black', borderBottomWidth: 2}} />
        <ScrollView style={{flexGrow: 0, maxHeight: '90%'}}>
          <FlatList
            data={displayableStyleHistoryList}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignContent: 'center',
                  backgroundColor:
                    item.snapshotId === currSnapshot.snapshotId
                      ? '#f9f9f9'
                      : '#d4d4d4',
                  borderColor: 'black',
                  borderWidth: 0.7,
                  height: 40,
                }}>
                <TouchableOpacity
                  onPress={() => selectStyleFromHistory(item.snapshotId)}>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      {this.makeStyleSnapshot(
                        item.backgroundColor,
                        item.styleLayers,
                      )}
                    </View>
                    <View>
                      <Text
                        style={{
                          ...styles.textItem,
                          marginTop: 7,
                          marginLeft: 5,
                          flex: 1,
                          flexWrap: 'wrap',
                        }}>
                        {_.truncate(item.styleName, {
                          length: 30,
                          separator: ' ',
                        })}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
      </View>
    );

    let styleHistoryPanelLandscape = <Text />;
    if (orientation === 'landscape') {
      styleHistoryPanelLandscape = styleHistoryPanelPortrait;
      styleHistoryPanelPortrait = <Text />;
    }

    let backgroundColorView;
    if (currSnapshot.backgroundColor.name.startsWith('#')) {
      if (currSnapshot.backgroundColor.metallic) {
        backgroundColorView = (
          <View style={{alignContent: 'center'}}>
            <Image
              style={{
                width: compositeWidth,
                zIndex: 0,
                height: compositeHeight,
                marginLeft: 1,
                borderRadius: 10,
              }}
              source={{uri: `data:image/png;base64,${bgMetallicBase64}`}}
            />
          </View>
        );
      } else {
        backgroundColorView = (
          <View
            style={{
              backgroundColor: currSnapshot.backgroundColor.name,
              zIndex: 0,
              width: compositeWidth,
              height: compositeHeight,
              marginLeft: 1,
              borderRadius: 10,
            }}
          />
        );
      }
    } else {
      backgroundColorView = (
        <View style={{zIndex: 0}}>
          <Image
            style={{
              width: compositeWidth,
              height: compositeHeight,
              marginLeft: 1,
              borderRadius: 10,
              borderWidth: 1,
            }}
            source={getImageByNameAndType(
              currSnapshot.backgroundColor.name,
              'standardColor',
            )}
          />
        </View>
      );
    }

    let currZindex = 1;
    const blankSpaceWidth =
      dimension.width * dimMgr[dv][orientation].blankSpaceWidthRatio;

    let blankSpacePanel = (
      <View
        style={{
          backgroundColor: '#C8C8C8',
          width: blankSpaceWidth,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          borderRadius: 10,
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        }}>
        <Text />
      </View>
    );
    let compositeImagePanel = (
      <View
        style={{
          justifyContent: 'center',
          borderWidth: 4,
          borderRadius: 13,
          borderColor: 'black',
          alignContent: 'center',
        }}>
        <TouchableOpacity onPress={() => this.onFullscreenPressed()}>
          {backgroundColorView}
          {currSnapshot.styleLayers.map(oneLayer => {
            const margin = (currZindex - 1.7) * 3;
            const hidden = this.isLayerHidden(oneLayer.layerId);
            if (!hidden) {
              return (
                <View style={{position: 'absolute', zIndex: currZindex++}}>
                  <Image
                    style={{
                      width: compositeWidth,
                      height: compositeHeight,
                      borderRadius: 10,
                      borderColor: 'black',
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
            }
          })}
          <FontAwesomeIcon
            icon={faExpand}
            pull={'right'}
            size={23}
            color="white"
            style={{
              position: 'absolute',
              zIndex: currZindex++,
              marginLeft: 10,
              marginTop: 5,
            }}
          />
        </TouchableOpacity>
      </View>
    );
    let layersPanel = (
      <DraggableFlatList
        data={currSnapshot.styleLayers}
        renderItem={({item, index, drag, isActive}) => (
          <TouchableOpacity
            style={{
              height: 40,
              width: '100%',
              backgroundColor: item.backgroundColor,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
            onLongPress={drag}>
            <View>
              <LayerComponent
                orientation={orientation}
                printRollerName={item.printRollerName}
                printRollerOpacity={item.printRollerOpacity}
                layerId={item.layerId}
                color={item.color}
                onSelectPrintRoller={this.onSelectPrintRoller}
                onSelectColor={this.onSelectColor}
                onDeleteLayer={this.onDeleteLayer}
                onHideLayer={this.onHideLayer}
                isHidden={this.isLayerHidden(item.layerId)}
                colorHistory={history.colorHistory}
                deleteColorFromHistory={deleteColorFromHistory}
              />
              <Divider style={styles.headerDivider} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item.layerId}
        onDragEnd={params => this.onListDragEnd(params)}
      />
    );

    const historyButton = (
      <FontAwesomeIcon
        icon={faHistory}
        pull={'right'}
        size={23}
        color="#000000"
      />
    );

    if (orientation === 'portrait' && dv === 'phone') {
      return (
        <View
          style={{
            width: viewWidth,
            display: 'flex',
            flexDirection: 'column',
            marginTop: 5,
            justifyContent: 'space-between',
            backgroundColor: '#f2f2f2',
            marginLeft: 0,
            maxWidth: viewWidth,
          }}>
          <FullscreenImageModal
            backgroundColor={currSnapshot.backgroundColor.name}
            layers={currSnapshot.styleLayers}
            imageModalVisible={imageModalVisible}
            orientation={orientation}
            hiddenLayers={this.state.hiddenLayers}
            onBackdropPressed={this.onFullscreenBackdropPressed}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#f2f2f2',
              width: '98%',
            }}>
            {blankSpacePanel}
            {compositeImagePanel}
          </View>
          <View style={{backgroundColor: '#f2f2f2', marginTop: 10}}>
            {layersPanel}
          </View>
          <View
            style={{
              backgroundColor: '#f2f2f2',
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <RBSheet
              ref={ref => {
                this.RBSheet = ref;
              }}
              height={350}
              openDuration={250}
              customStyles={{
                container: {
                  backgroundColor: 'lightgray',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                },
              }}>
              {styleHistoryPanelPortrait}
            </RBSheet>
            <TouchableOpacity onPress={() => this.RBSheet.open()}>
              <Text
                style={{
                  ...styles.textItem,
                  fontSize: 20,
                  marginLeft: 5,
                  fontStyle: 'italic',
                }}>
                {' '}
                {historyButton} Style History
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (orientation === 'portrait') {
      return (
        <View
          style={{
            width: viewWidth,
            flexDirection: 'column',
            marginTop: 5,
            justifyContent: 'space-between',
            backgroundColor: '#f2f2f2',
            marginLeft: 0,
            maxWidth: viewWidth,
          }}>
          <FullscreenImageModal
            backgroundColor={currSnapshot.backgroundColor.name}
            layers={currSnapshot.styleLayers}
            imageModalVisible={imageModalVisible}
            orientation={orientation}
            hiddenLayers={this.state.hiddenLayers}
            onBackdropPressed={this.onFullscreenBackdropPressed}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#f2f2f2',
              width: '98%',
            }}>
            {blankSpacePanel}
            {compositeImagePanel}
            {styleHistoryPanelPortrait}
          </View>
          <View style={{backgroundColor: '#f2f2f2', marginTop: 10}}>
            {layersPanel}
          </View>
        </View>
      );
    } else {
      const height = dimension.height;
      return (
        <View
          style={{
            width: height > viewWidth ? height : viewWidth,
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'center',
            backgroundColor: 'white',
            minHeight: height * 0.5,
            maxHeight: '75%',
            marginLeft: orientation === 'portrait' ? 0 : 20,
          }}>
          <FullscreenImageModal
            backgroundColor={currSnapshot.backgroundColor.name}
            layers={currSnapshot.styleLayers}
            imageModalVisible={imageModalVisible}
            orientation={orientation}
            hiddenLayers={this.state.hiddenLayers}
            onBackdropPressed={this.onFullscreenBackdropPressed}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '60%',
              minHeight: '95%',
            }}>
            <View style={{backgroundColor: 'white', marginTop: 0}}>
              {compositeImagePanel}
            </View>
            <View>{layersPanel}</View>
          </View>
          <View style={{marginLeft: 5, marginRight: 30, width: '25%'}}>
            {styleHistoryPanelLandscape}
          </View>
        </View>
      );
    }
  }
}
