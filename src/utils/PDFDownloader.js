const downloadPdf = async (fileName, projectSettings, projectLayers, snapshot) => {
  import("jspdf").then((jspdf) => {
    const doc = jspdf.jsPDF();
    doc.addImage(require('../assets/ocm-splash.png'), 1, 1, 55, 15);
    const layers = projectLayers.map((layer) => {
      return (`\n\t${layer.level === 'Background' ? 'B' : layer.level}. ${layer.patternName}\t/ ${layer.patternOpacity}%\t/ ${layer.backgroundColor.toUpperCase()}`);
    });
    doc.text(`\n${new Date().toDateString()}\n\nOCM Builder - Project "${projectSettings.projectName}"\n
        Company Name: ${projectSettings.companyName}
        Contact Email: ${projectSettings.email}
        Designer Name: ${projectSettings.designerName}
        Request Samples: ${projectSettings.requestSamples ? 'Yes': 'No'}
        
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
