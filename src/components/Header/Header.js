import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import {useHistory} from '../../router/router';
import {useAuth} from '../Login/authContext';

const Header = () => {
  const auth = useAuth();
  let history = useHistory();
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Harry Potter Dictionary</Text>
      {auth.user ? (
        <TouchableHighlight
          style={styles.btn}
          underlayColor="#f0f4f7"
          onPress={() => auth.signout(() => history.push('/'))}>
          <Text style={styles.btnClr}>Sign Out</Text>
        </TouchableHighlight>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#123f63',
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#c72a00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginLeft: 'auto',
  },
  btnClr: {
    color: '#fff',
  },
});

export default Header;
