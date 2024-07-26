import React from "react";
import axios from 'axios';


const OCM_BUILDER_SERVICE_ENDPOINT = 'http://localhost'; //https://master.dvzbj2bf60zbt.amplifyapp.com';
const OCM_BUILDER_SERVICE_PORT = 4443; // 80;

export async function pingService(params){

  // Function to fetch data using Axios
  try {
    const req = `${OCM_BUILDER_SERVICE_ENDPOINT}:${OCM_BUILDER_SERVICE_PORT}`;
    console.log(`OCMBuilderServiceClient: GET ${req}`);
    const response = await axios.get(req, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods' :    'GET'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return `OCM Builder Server ERROR: ${error}`;
  }
};

export async function sendEmail(form, projectLayers, snapshot){
  const req = `${OCM_BUILDER_SERVICE_ENDPOINT}:${OCM_BUILDER_SERVICE_PORT}/sendEmail`;
  const body = {
    form, projectLayers, snapshot
  };
  const response = await axios.post(req, body,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    }
  );
  return JSON.stringify(response.data);
}
