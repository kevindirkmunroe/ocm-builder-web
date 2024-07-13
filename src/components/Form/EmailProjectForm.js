import React, { useState, useEffect } from 'react';
import {
  View, TextInput, TouchableOpacity,
  Text, StyleSheet, Dimensions,
} from "react-native";
import { useNavigate } from "react-router-dom";
import { sendOCMSummaryMail } from "../../utils/GoogleMailSender";

const EmailProjectForm = (projectLayers) => {

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

    const DUMMY_BASE64_IMAGE =
    'iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC';

    const handleDownloadPdf = () => {
      navigate('/save-as-pdf', {state :
          {form: {companyName, projectName, designerName, email, requestSamples }, projectLayers: projectLayers}});
    }
    const handleSubmit = async () => {
      if (isFormValid) {

        // Form is valid, perform the submission logic
        try {
          await sendOCMSummaryMail(projectLayers.projectLayers, DUMMY_BASE64_IMAGE, {
            companyName,
            projectName,
            designerName,
            email,
          }, false);
          alert(`Email sent to OCM from ${email}!`);
          navigate('/save-as-pdf', {state :
              {form: {companyName, projectName, designerName, email, requestSamples }, projectLayers: projectLayers}});
        }catch (error){
          // Try email again, or skip to save pdf
          const errAsString = error.message;
          alert(`ERROR sending email to OCM: ${errAsString.length > 200 ? errAsString.substring(0, 255) + '...': errAsString}`,[
              {text: 'OK', onPress: () => navigate('/save-as-pdf', {state :
                    {form: {companyName, projectName, designerName, email, requestSamples }, projectLayers: projectLayers}})},
            ]);
        }
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
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
            disabled={!isFormValid}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Email OCM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
            disabled={!isFormValid}
            onPress={handleDownloadPdf}
          >
            <Text style={styles.buttonText}>Download PDF</Text>
          </TouchableOpacity>
        </View>

        {/* Display error messages */}
        {Object.values(errors).map((error, index) => (
          <Text key={index} style={styles.error}>
            {error}
          </Text>
        ))}
      </View>
    );
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

export default EmailProjectForm;
