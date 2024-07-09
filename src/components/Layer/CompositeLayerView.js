import React from 'react';
import { Text} from "react-native";

export default function CompositeLayerView({key, color, opacity}){
  return(<Text>COMPOSITE key: {key} color: {color} opacity: {opacity}</Text>)
}
