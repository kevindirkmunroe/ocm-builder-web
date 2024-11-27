import emailjs from "@emailjs/browser";
import { decode } from 'base64-arraybuffer';

import { BUILD_NUMBER, EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from "./AssetManager";
import alert from "../utils/Alert";
import { uploadFileToS3 } from "../utils/AmazonS3Service";

export default async function sendEmail(emailMessage, projectSettings, projectLayers, snapshot){

  const referenceNumber = `OCMB.${BUILD_NUMBER}.${Math.floor(100000 + Math.random() * 900000)}`;

  console.log(`EmailJSClient: INIT!`);
  emailjs.init(EMAILJS_PUBLIC_KEY);

  console.log(`sending email. msg: ${JSON.stringify(emailMessage)}`);
  console.log(`sending email. ref: ${JSON.stringify(referenceNumber)}`);
  console.log(`sending email. Settings: ${JSON.stringify(projectSettings)}`);
  console.log(`sending email. Layers: ${JSON.stringify(projectLayers)}`);

  try {
    // setLoading(true);
    let baseTemplateParams = {
      designer_name: projectSettings.designerName,
      date: new Date().toDateString(),
      project_name: projectSettings.projectName,
      message: emailMessage,
      company_name: projectSettings.companyName,
      request_samples: projectSettings.requestSamples ? 'Yes' : 'No',
      reference_number: referenceNumber,
      reply_to: projectSettings.email,
      designer_email: projectSettings.email,
      layer0_color: projectLayers[0].backgroundColor,
      layer0_print_roller: projectLayers[0].isColorMetallic ? 'Metallic' : 'BLANK',
    };

    let layers = {};
    for(i = 1; i < projectLayers.length; i++){
      layers[`layer${i}_color`] = projectLayers[i].backgroundColor;
      layers[`layer${i}_print_roller`] = projectLayers[i].patternName;
      layers[`layer${i}_opacity`] = projectLayers[i].patternOpacity;
    }

    const s3FileKey = `${projectSettings.companyName}/${projectSettings.projectName}_${referenceNumber}.png`;

    const data = snapshot.replace(/^data:image\/\w+;base64,/, "");
    await uploadFileToS3(s3FileKey, decode(data));

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        ...baseTemplateParams,
        ...layers,
        s3FileKey
    });
    alert('Send to OCM', `Project '${projectSettings.projectName}' sent to OCM, check mail inbox for copy.\n\nReference number ${referenceNumber}`);

  } catch (error) {
    if(Object.keys(error).length > 0){
      alert('ERROR', `Error sending Project '${projectSettings.projectName}' to OCM: ${JSON.stringify(error)}`);
    }
    console.log(error);
  } finally {
    // setLoading(false);
  }
}

