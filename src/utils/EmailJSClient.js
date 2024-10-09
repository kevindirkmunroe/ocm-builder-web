import { BUILD_NUMBER } from "./AssetManager";
import alert from "../utils/Alert";

export default async function sendEmail(emailMessage, projectSettings, projectLayers, snapshot){

  const referenceNumber = `OCMB.${BUILD_NUMBER}.${Math.floor(100000 + Math.random() * 900000)}`;

  console.log(`sending email. msg: ${JSON.stringify(emailMessage)}`);
  console.log(`sending email. ref: ${JSON.stringify(referenceNumber)}`);
  console.log(`sending email. Settings: ${JSON.stringify(projectSettings)}`);
  console.log(`sending email. Layers: ${JSON.stringify(projectLayers)}`);

  alert('Send to OCM', `Project '${projectSettings.projectName}' sent to OCM, check mail inbox for copy.\n\nReference number ${referenceNumber}`);
}

