import React, { useState, useEffect } from "react";
import {
  View, TextInput, TouchableOpacity,
  Text, StyleSheet, Dimensions, Image,
} from "react-native";

const ProjectSettingsForm = ({projectSettings, validation}) => {

  // State variables to store form inputs,
  // errors, and form validity
  const [companyName, setCompanyName] = useState(projectSettings.companyName);
  const [projectName, setProjectName] = useState(projectSettings.projectName);
  const [designerName, setDesignerName] = useState(projectSettings.designerName);
  const [email, setEmail] = useState(projectSettings.email);
  const [requestSamples, setRequestSamples] = useState(projectSettings.requestSamples);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [companyName, email, projectName, designerName, requestSamples]);

  const onRequestSamplesChange = () => {
    setRequestSamples(!requestSamples);
  }

  const validateForm = () => {
    let errors = {};
    if (!companyName) {
      errors.companyName = 'Company Name is required.';
    }
    if (!projectName) {
      errors.projectName = 'Project Name is required.';
    }
    if (!designerName) {
      errors.designerName = 'Designer Name is required.';
    }

    // Validate email field
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    validation(isFormValid, {companyName, projectName, designerName, email, requestSamples});
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginTop: 6, fontSize: 20, fontStyle: 'bold' }}>Company Name: </Text>
        <TextInput
          style={[styles.input, { flex: 2, marginLeft: 'auto' }]}
          placeholder="Company Name"
          value={companyName}
          onChangeText={setCompanyName}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginTop: 6, fontSize: 20, fontStyle: 'bold' }}>Project Name:     </Text>
        <TextInput
          style={[styles.input, { flex: 2, marginLeft: 'auto' }]}
          placeholder="Project Name"
          value={projectName}
          onChangeText={setProjectName}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginTop: 6, fontSize: 20, fontStyle: 'bold' }}>Designer Name:  </Text>
        <TextInput
          style={[styles.input, { flex: 2, marginLeft: 'auto' }]}
          placeholder="Designer Name"
          value={designerName}
          onChangeText={setDesignerName}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginTop: 6, fontSize: 20, fontStyle: 'bold'}}>Email Address:    </Text>
        <TextInput
          style={[styles.input, { flex: 2, marginLeft: 'auto' }]}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity onPress={onRequestSamplesChange}>
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          <Text style={{ fontSize: 18, padding: 3, fontStyle: 'bold' }}>Request Samples</Text>
          <Image
            style={{ width: 20, height: 20, marginTop: 4, marginLeft: 3 }}
            source={
              !requestSamples
                ? require('../../../assets/checkbox_blank_outline_icon_139814.png')
                : require('../../../assets/checkbox_icon_151467.png')
            }
          />
        </View>
      </TouchableOpacity>
      {/* Display error messages */}
      {Object.values(errors).map((error, index) => (
        <Text key={index} style={styles.error}>
          • {error}
        </Text>
      ))}
    </View>
  )
};

const {width, height} = Dimensions.get('window');

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: width * 0.6,
    justifyContent: 'center',
  },
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
  },
  button: {
    backgroundColor: '#5DA75E',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 12,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

export default React.memo(ProjectSettingsForm);
