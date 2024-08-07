import React from "react";
import axios from 'axios';

//const OCM_BUILDER_SERVICE_ENDPOINT = 'https://pxlsg2dhpl.execute-api.us-west-1.amazonaws.com/production';
const OCM_BUILDER_SERVICE_ENDPOINT = 'https://master.dvzbj2bf60zbt.amplifyapp.com';

export async function pingService(){
  // Function to fetch data using Axios
  try {
    const req = `${OCM_BUILDER_SERVICE_ENDPOINT}`;
    console.log(`OCMBuilderServiceClient: GET ${req}`);
    const response = await axios.get(req, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods' : '*',
        'Access-Control-Allow-Headers' : 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error PINGing service:", error);
    throw error;
  }
}

export async function sendEmail(form, projectLayers, snapshot){
  const req = `${OCM_BUILDER_SERVICE_ENDPOINT}/sendEmail`;
  const body = {
    form, projectLayers, snapshot
  };
  const response = await axios.post(req, body,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
  return JSON.stringify(response.data);
}
