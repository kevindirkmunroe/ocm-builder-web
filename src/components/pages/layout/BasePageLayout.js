import { StyleSheet, useWindowDimensions } from "react-native";

export function isLandscape(){
  const {width, height} = useWindowDimensions();
  return width > height;
}

export function getBaseLayout(){
  return StyleSheet.create({
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width:'100%',
      textAlign: 'center',
      backgroundColor: 'indigo',
      color: 'white'
    },
    main: {
      position: 'absolute',
      top: isLandscape() ? 0 : 100,
      left: 0,
      width:'100%',
      textAlign: 'center',
      backgroundColor: 'purple',
      color: 'white',
      overflow: 'scroll',
    }
  });
}
