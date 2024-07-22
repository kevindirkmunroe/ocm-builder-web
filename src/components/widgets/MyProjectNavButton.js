import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigate } from "react-router-dom";

import alert from "../../utils/Alert";

export default function MyProjectNavButton({isDisabled, projectLayers}){

  const buttonIsDisabled = isDisabled;
  const navigate = useNavigate();
  let onGoHome = () => {
    navigate('/my-project', {state: {projectLayers}});
  }

  return(
    <TouchableOpacity disabled={buttonIsDisabled} onPress={onGoHome}>
      <View style={{flexDirection: 'row'}}>
        <Image style={{ width: 14, height: 14, marginTop: 8, marginLeft: 5, borderRadius: 5}} source={require('../../assets/layer-group.png')} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 5,
            marginTop: 7,
            color: buttonIsDisabled ? 'gray' : 'black'
          }}>
          My Project
        </Text>
      </View>
    </TouchableOpacity>
  )
}
