import React from "react";
import axios from 'axios';


const OCM_BUILDER_SERVICE_ENDPOINT = 'http://localhost'; //https://master.dvzbj2bf60zbt.amplifyapp.com';
const OCM_BUILDER_SERVICE_PORT = 3000; // 80;

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

export async function sendEmail(params){
  const req = `${OCM_BUILDER_SERVICE_ENDPOINT}:${OCM_BUILDER_SERVICE_PORT}/post`;
  console.log(`OCMBuilderServiceClient: POST ${req}`);
  const response = await axios.get(req, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods' :    'GET'
    }
  });
  return response.data;
}
