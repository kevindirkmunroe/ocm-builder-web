import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable, Modal} from 'react-native';

const MemberItem = ({item}) => {
  const [modalVisible, setModalVisible] = useState(false);
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
  return (
    <View>
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
          <View style={styles.modalView}>
            <View>
              <Image source={{uri: imageOrig}} style={styles.bigImg} />
            </View>
            <View style={styles.contentContainer}>
              <Text>
                <Text style={styles.bold}>Name:</Text> {name}
              </Text>
              <Text>
                <Text style={styles.bold}>House:</Text> {house}
              </Text>
              <Text>
                <Text style={styles.bold}>Played By:</Text> {actor}
              </Text>
              <Text>
                <Text style={styles.bold}>Wand:</Text>
              </Text>
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
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.hideModal}>
                <Text style={[styles.hideModalText, {backgroundColor: color}]}>
                  Hide
                </Text>
              </Pressable>
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
    marginTop: 22,
    backgroundColor: '#00000055',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
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
    maxWidth: 400,
  },
  bigImg: {
    width: 100,
    height: 150,
  },
  contentContainer: {
    flex: 2,
    flexDirection: 'column',
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  hideModalText: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    color: '#fff',
  },
  hideModal: {
    margin: 10,
    alignSelf: 'center',
  },
  leftPadded: {
    marginLeft: 20,
  },
});

export default MemberItem;
