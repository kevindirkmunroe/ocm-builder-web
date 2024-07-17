import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigate } from "react-router-dom";

import alert from "../../utils/Alert";

export default function HomeNavButton(){

  const navigate = useNavigate();

  let onGoHome = () => {
    alert('Start Over', 'Start Over clears all your Project\'s changes. Continue?', [
      {
        text: 'No, keep my changes',
        style: 'cancel',
      },
      {
        text: 'Yes, Reset', onPress: () => navigate('/start'),
      },
    ]);
  }

  return(
    <TouchableOpacity onPress={onGoHome}>
      <View style={{flexDirection: 'row'}}>
        <Image style={{ width: 16, height: 16, marginTop: 8, marginLeft: 5, borderRadius: 5}} source={require('../../assets/ocm-icon.png')} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 5,
            marginTop: 7,
          }}>
          Start
        </Text>
      </View>
    </TouchableOpacity>
  )
}
