import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  useWindowDimensions,
} from 'react-native';

const popupBaseData = {
  image: {
    width: 100,
    height: 150,
  },
  modal: {
    maxWidth: 600,
    heightPer: 35,
    heightInvertPer: 50,
    minHeight: 250,
    margin: 20,
    padding: 15,
  },
  contentContainer: {
    flexBasisPer: 65,
  },
  imageContainer: {
    flexBasisPer: 35,
  },
};

const MemberItem = ({item}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const [imageDesign, setImageDesign] = useState({...popupBaseData.image});
  const [modalHeight, setModalHeight] = useState(
    popupBaseData.modal.heightPer + '%',
  );
  const {name, house, wand, actor, image} = item;
  const imageOrig = image.replace(/^http:\/\//, 'https://');
  const roboUrl = 'https://robohash.org/' + encodeURI(name) + '?size=60x60';
  let color = '#000';
  switch (house) {
    case 'Gryffindor':
      color = '#660000';
      break;
    case 'Slytherin':
      color = '#2f751c';
      break;
    case 'Hufflepuff':
      color = '#1f1e19';
      break;
    case 'Ravenclaw':
      color = '#1a3956';
      break;
  }

  useEffect(() => {
    const heightPer =
      windowWidth < windowHeight
        ? popupBaseData.modal.heightPer
        : popupBaseData.modal.heightInvertPer;
    setModalHeight(heightPer + '%');
    const width =
      windowWidth - popupBaseData.modal.margin * 2 <
      popupBaseData.modal.maxWidth
        ? windowWidth - popupBaseData.modal.margin * 2
        : popupBaseData.modal.maxWidth;
    const height =
      (windowHeight * heightPer) / 100 > popupBaseData.modal.minHeight
        ? (windowHeight * heightPer) / 100
        : popupBaseData.modal.minHeight;
    let imgWidth =
      (width - popupBaseData.modal.padding * 2) *
      (popupBaseData.imageContainer.flexBasisPer / 100);
    let imgHeight = height - popupBaseData.modal.padding * 2;

    setImageDesign({width: imgWidth, height: imgHeight});
  }, [windowWidth, windowHeight]);

  return (
    <View style={styles.flexOne}>
      <Pressable onPress={() => setModalVisible(true)}>
        <View style={styles.memberContainer}>
          <View style={styles.noPadding}>
            <Image source={{uri: roboUrl}} style={styles.logoImg} />
          </View>
          <View style={[styles.flexOne, {paddingLeft: 10}]}>
            <View style={styles.flexOne}>
              <Text style={styles.bold}>{name}</Text>
            </View>
            <View style={styles.flexOne}>
              <Text style={{color: color}}>{house}</Text>
            </View>
            <View style={styles.flexOne}>
              <Text>
                <Text style={styles.bold}>Played By:</Text> {actor}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {height: modalHeight}]}>
            <View
              style={{
                flexBasis: popupBaseData.imageContainer.flexBasisPer + '%',
              }}>
              <Image
                source={{uri: imageOrig}}
                resizeMode="cover"
                style={{
                  height: imageDesign.height,
                  width: imageDesign.width,
                }}
              />
            </View>
            <View style={styles.contentContainer}>
              <View>
                <Text>
                  <Text style={styles.bold}>Name:</Text> {name}
                </Text>
              </View>
              <View>
                <Text>
                  <Text style={styles.bold}>House:</Text> {house}
                </Text>
              </View>
              <View>
                <Text>
                  <Text style={styles.bold}>Played By:</Text> {actor}
                </Text>
              </View>
              <View>
                <Text>
                  <Text style={styles.bold}>Wand:</Text>
                </Text>
              </View>
              <View style={styles.leftPadded}>
                <Text>
                  <Text style={[styles.bold]}>Wood:</Text>{' '}
                  {wand.wood || 'unknown'}
                </Text>
                <Text>
                  <Text style={styles.bold}>Core:</Text>{' '}
                  {wand.core || 'unknown'}
                </Text>
                <Text>
                  <Text style={styles.bold}>Length:</Text>{' '}
                  {wand.length || 'unknown'}
                </Text>
              </View>
              <View>
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.hideModal}>
                  <Text
                    style={[styles.hideModalText, {backgroundColor: color}]}>
                    Hide
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  memberContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#123f63',
    flexDirection: 'row',
  },
  flexOne: {
    flex: 1,
  },
  logoImg: {
    width: 60,
    height: 60,
  },
  noPadding: {
    padding: 0,
  },
  bold: {
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000055',
  },
  modalView: {
    margin: popupBaseData.modal.margin,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: popupBaseData.modal.padding,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    justifyContent: 'space-between',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
    flexDirection: 'row',
    maxWidth: popupBaseData.modal.maxWidth,
    height: popupBaseData.modal.heightPer + '%',
    minHeight: popupBaseData.modal.minHeight,
  },
  contentContainer: {
    flexBasis: popupBaseData.contentContainer.flexBasisPer + '%',
    flexDirection: 'column',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    height: '100%',
  },
  hideModalText: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    color: '#fff',
  },
  hideModal: {
    marginTop: 10,
    alignSelf: 'center',
  },
  leftPadded: {
    marginLeft: 20,
  },
});

export default MemberItem;
