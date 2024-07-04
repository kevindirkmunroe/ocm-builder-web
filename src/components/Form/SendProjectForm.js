import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity,
  Text, StyleSheet } from 'react-native';
import { useNavigate } from "react-router-dom";

const SendProjectForm = (projectLayers) => {

    const navigate = useNavigate();

    // State variables to store form inputs,
    // errors, and form validity
    const [companyName, setCompanyName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [designerName, setDesignerName] = useState('');
    const [email, setEmail ] = useState('');
    const [requestSamples, setRequestSamples] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
      // Trigger form validation when name,
      // email, or password changes
      validateForm();
    }, [companyName, email, projectName, designerName, requestSamples ]);

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

      if (!requestSamples) {
        errors.email = 'RequestSamples is required (Y|N).';
      } else if(!/[YN]/.test(requestSamples)){
        errors.email = 'RequestSamples is required (Y|N).';
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
    };

    const handleSubmit = () => {
      if (isFormValid) {

        // Form is valid, perform the submission logic
        console.log(`Form OK: companyName: ${companyName} projectName: ${projectName} designerName: ${designerName} email: ${email} requestSamples: ${requestSamples}`);
        console.log(`Content: ${JSON.stringify(projectLayers)}`);
        // TODO: email form + project content...

        navigate('/save-print-pdf', {state :
            {form: {companyName, projectName, designerName, email, requestSamples }, projectLayers: projectLayers}});

      } else {

        // Form is invalid, display error messages
        console.log('Form has errors. Please correct them.');
      }
    };


    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          value={companyName}
          onChangeText={setCompanyName}
        />
        <TextInput
          style={styles.input}
          placeholder="Project Name"
          value={projectName}
          onChangeText={setProjectName}
        />
        <TextInput
          style={styles.input}
          placeholder="Designer Name"
          value={designerName}
          onChangeText={setDesignerName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Request Samples? (Y|N)"
          value={requestSamples}
          onChangeText={setRequestSamples}
        />
        <TouchableOpacity
          style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
          disabled={!isFormValid}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* Display error messages */}
        {Object.values(errors).map((error, index) => (
          <Text key={index} style={styles.error}>
            {error}
          </Text>
        ))}
      </View>
    );
};

// Styles for the components
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
    },
    input: {
      height: 60,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 10,
      borderRadius: 8,
      fontSize: 16,
    },
    button: {
      backgroundColor: 'green',
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

export default SendProjectForm;
