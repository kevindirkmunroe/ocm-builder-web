import React, { useState, useEffect } from 'react';
import {
  View, TextInput, TouchableOpacity,
  Text, StyleSheet, Dimensions, Image,
} from "react-native";
import { useNavigate } from "react-router-dom";
import { pingService, sendEmail } from '../../../utils/OCMBuilderServiceClient';

const EmailProjectForm = (projectLayers) => {

    const snapshot = projectLayers.snapshot;
    const navigate = useNavigate();

    // State variables to store form inputs,
    // errors, and form validity
    const [companyName, setCompanyName] = useState('TEST-13-cname');
    const [projectName, setProjectName] = useState('TEST-13-project');
    const [designerName, setDesignerName] = useState('TEST-13-designer');
    const [email, setEmail ] = useState('kevin.munroe@gmail.com');
    const [requestSamples, setRequestSamples] = useState('N');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const referenceNumber = `OBA4${Math.floor(100000 + Math.random() * 900000)}`;

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

    const handleDownloadPdf = () => {
      navigate('/save-as-pdf', {state :
          {projectLayers: projectLayers,
            form:
              {companyName, projectName, designerName, referenceNumber, email, requestSamples },
            snapshot}});
    }

    const handleSubmit = async () => {
      if (isFormValid) {

        // form is valid, perform the submission logic
        try {
          await pingService();

          await sendEmail({
              companyName,
              projectName,
              designerName,
              referenceNumber,
              email,
            },
            projectLayers.projectLayers,
            snapshot);

          alert(`Email sent to OCM from ${email}!`);
          //
          // No more auto-navigate after email, check w/OCM about change
          //
          // navigate('/save-as-pdf', {state :
          //     {form: {companyName, projectName, designerName, email, requestSamples }, projectLayers: projectLayers.projectLayers, snapshot}});
        }catch (error){
          // Try email again, or skip to save pdf
          const errAsString = error.message;
          alert(`ERROR sending email to OCM: ${errAsString.length > 200 ? errAsString.substring(0, 255) + '...': errAsString}`,[
              {text: 'OK', onPress: () => navigate('/save-as-pdf', {state :
                    {form: {companyName, projectName, designerName, email, requestSamples }, projectLayers: projectLayers}})},
            ]);
        }
      } else {

        // form is invalid, display error messages
        console.log('form has errors. Please correct them.');
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
        <View style={{flexDirection: 'row', justifyContent: 'center', width: width * 0.5, padding: 10}}>
          <TouchableOpacity
            style={[styles.button, { flexDirection: 'row', width: 150, opacity: isFormValid ? 1 : 0.4 }]}
            disabled={!isFormValid}
            onPress={handleSubmit}
          ><Image
            style={{width: 24, height: 24, marginTop: 5, marginLeft: 5}}
            source={require('../../../assets/mail-black-envelope-symbol_icon-icons.com_56519.png')}
          />
            <Text style={styles.buttonText}>&nbsp;Email OCM</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { flexDirection: 'row', width: 150, marginLeft: 20, opacity: isFormValid ? 1 : 0.4 }]}
            disabled={!isFormValid}
            onPress={handleDownloadPdf}
          >          <Image
            style={{width: 24, height: 24, marginTop: 5, marginLeft: 5}}
            source={require('../../../assets/PDF-48_46492.png')}
          />
            <Text style={styles.buttonText}>&nbsp;Download PDF</Text>
          </TouchableOpacity>
        </View>

        {/* Display error messages */}
        {Object.values(errors).map((error, index) => (
          <Text key={index} style={styles.error}>
            • {error}
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
      maxWidth: width * 0.5,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 12,
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

export default EmailProjectForm;
