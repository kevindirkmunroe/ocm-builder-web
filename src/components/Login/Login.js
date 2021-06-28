import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
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
              pathname: '/login',
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

  let {from} = location.state || {from: {pathname: '/'}};
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <View style={styles.belowContainer}>
      <Text>You must log in to view the page</Text>

      <TouchableHighlight
        style={styles.btn}
        underlayColor="#f0f4f7"
        onPress={login}>
        <Text style={styles.btnClr}>Log in</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 200,
    backgroundColor: '#c72a00',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  btnClr: {
    color: '#fff',
  },
  belowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Login;
