import { Dimensions, Platform, StyleSheet, useWindowDimensions } from "react-native";

export function isLandscape(){
  const {width, height} = useWindowDimensions();
  return width > height;
}

export function isAndroidWebBrowser(){
  const userAgent = navigator.userAgent;
  return /Android/i.test(userAgent);
}

export function getBaseLayout(){
  return StyleSheet.create({
    header : {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      textAlign: 'center',
      color: 'white',
    },
    main: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 50 : (isAndroidWebBrowser() ? 40 : 60),
      left: 0,
      width:'100%',
      textAlign: 'center',
      color: 'white',
      overflow: 'scroll',
    },
    footer: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      inset: 'auto 0 0 0',
      width:'100%',
      textAlign: 'center',
      color: 'white',
      marginBottom: 20,
    },
    btn: {
      width:  Dimensions.get('window').width * 0.6,
      color: '#000000',
      justifyContent: 'left',
      alignItems: 'center',
      padding: 10,
      marginTop: 30,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 10,
    },
    mainText: {
      fontFamily: 'Futura',
      color: 'black',
      fontSize: 30,
      width: '80%',
      padding: isLandscape()? 2 : 20,
      marginTop: isLandscape() ? 5 : 10,
    },
  });
}
