import { BUILD_NUMBER } from "../utils/AssetManager";

const downloadPdf = async (fileName, projectSettings, projectLayers, snapshot) => {
  import("jspdf").then(async (jspdf) => {
    const doc = jspdf.jsPDF();
    const referenceNumber = `OCMB.${BUILD_NUMBER}.${Math.floor(100000 + Math.random() * 900000)}`;

    doc.addImage(require('../assets/ocm-splash.png'), 1, 1, 55, 15);
    const layers = projectLayers.map((layer) => {
      return (`\n\t${layer.level === 'Background' ? 'B' : layer.level}. ${layer.patternName}\t/ ${layer.patternOpacity}%\t/ ${layer.backgroundColor.toUpperCase()}`);
    });
    doc.text(`\n${new Date().toDateString()}\n\nHere is an OCM Builder Project from ${projectSettings.companyName}.\n
        Company: ${projectSettings.companyName}
        Project: ${projectSettings.projectName}
        Designer: ${projectSettings.designerName}
        Contact Email: ${projectSettings.email}
        Request Samples: ${projectSettings.requestSamples ? 'Yes' : 'No'}
        Reference Number: ${referenceNumber}
        
        Layers:\t${layers}
        `, 10, 20);

    doc.addImage(snapshot, 'PNG', 15, 125, 180, 160);
    const fileToSave = fileName.endsWith('.pdf')
      ? fileName
      : `${fileName}.pdf`;
    doc.save(fileToSave);
  });
};


export default downloadPdf;
