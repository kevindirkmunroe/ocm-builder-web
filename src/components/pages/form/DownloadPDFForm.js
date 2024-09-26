import { Dimensions, Text, TextInput, View, StyleSheet} from "react-native";
import React from "react";

function DownloadPDFForm({fileName, onSetFileName}){

  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ marginTop: 6, fontSize: 20, fontStyle: 'bold' }}>File Name:  </Text>
      <TextInput
        style={[styles.input, { flex: 2, marginLeft: 'auto' }]}
        placeholder="projectFile.pdf"
        value={fileName}
        onChangeText={onSetFileName}
      />
    </View>
  )
}

const {width, height} = Dimensions.get('window');

// Styles for the components
const styles = StyleSheet.create({
  input: {
    height: 40,
    maxWidth: width * 0.5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    marginLeft: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
  }
});
export default DownloadPDFForm;
