import React, {useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import Loader from '../Loader/Loader';
import MemberFlatList from '../MemberFlatList/MemberFlatList';

const HpList = () => {
  const [hpList, setHpList] = useState([]);
  const [status, setStatus] = useState({loader: false, err: ''});

  const onPressGetHpList = () => {
    setStatus({loader: true, err: ''});
    fetch('https://hp-api.herokuapp.com/api/characters')
      .then(res => res.json())
      .then(data => {
        setStatus({loader: false, err: ''});
        setHpList(data);
      })
      .catch(err => {
        setStatus({loader: false, err: 'Some Error Occured'});
        console.error(err);
      });
  };
  return (
    <View style={styles.flexOne}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Fetch Harry Potter Characters"
          color="#c72a00"
          onPress={onPressGetHpList}
        />
      </View>
      <View style={styles.loaderContainer}>
        {status.loader ? (
          <Loader />
        ) : status.err ? (
          <Text style={styles.errMsg}>{status.err}</Text>
        ) : (
          <MemberFlatList memberList={hpList} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 30,
    borderBottomWidth: 1,
    borderColor: 'grey',
    flexShrink: 1,
  },
  loaderContainer: {
    padding: 20,
    flex: 1,
  },
  errMsg: {
    color: '#ff0000',
    backgroundColor: 'pink',
    borderWidth: 1,
    borderColor: '#ff0000',
    padding: 10,
  },
  flexOne: {
    flex: 1,
  },
});
export default HpList;
