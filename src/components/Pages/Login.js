import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Dimensions } from "react-native";
import {Route, Redirect, useHistory, useLocation} from '../../router/router';
import {useAuth} from './authContext';

export function PrivateRoute({children, ...rest}) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({location}) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: {from: location},
            }}
          />
        )
      }
    />
  );
}

function Login(props) {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let {from} = location.state || {from: {pathname: '/start'}};
  console.log(`FROM=${JSON.stringify(from)}`);
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  const {width, height} = Dimensions.get('window');
  return (
    <View style={styles.belowContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: width * 1.4}}>
        <Text style={styles.mainText}>Innovate unique paint finishes for metal architecture.</Text>
        <Text style={styles.mainText}>For roofs, walls, ceilings + more!</Text>
        <TouchableHighlight
          style={styles.btn}
          underlayColor="#f0f4f7"
          onPress={login}>
          <Text style={styles.btnClr}>Innovate!</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    color: 'black',
    fontSize: 30,
    width: '40%',
    padding: 20,
    fontWeight: 'bold',
  },
  btn: {
    width: 300,
    backgroundColor: '#209bfc',
    justifyContent: 'left',
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
  },
  btnClr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  belowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Login;
