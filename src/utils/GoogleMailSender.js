import {Platform} from 'react-native';
import RNSmtpMailer from "react-native-smtp-mailer";

const _generateImageName = formData => {
  // Company-Project-Timestamp.png
  return `${formData.companyName}-${formData.projectName}-${
    formData.designerName
  }-${Date.now()}.png`;
};

const EMAIL_CREDENTIALS = {
  mailtrap: {
    mailhost: 'sandbox.smtp.mailtrap.io',
    port: '465',
    username: '4b2e7cbe827d77',
    password: '66314a44e8e6cf',
    from: 'ocm-android-app@e-ocm.com',
    recipients: 'kevin.munroe@gmail.com',
  },
  OCM: {
    mailhost: 'smtp.gmail.com',
    port: '465',
    username: 'ocmcoil18@gmail.com',
    password: 'Baseball$2',
    from: 'ocm-android-app@e-ocm.com',
    recipients: 'ocmcoil18@gmail.com',
  },
};

const CRED_SOURCE = 'mailtrap';

const _createOCMSummaryBody = (projectLayers, formData) => {
  let layersTable = '';
  for (const layer of projectLayers) {
    layersTable +=
      '<tr><td>' +
      layer.level +
      '</td><td>' +
      layer.patternName +
      '</td><td>' +
      layer.backgroundColor +
      '</td><td>' +
      layer.patternOpacity +
      '%' +
      '</td></tr>';
  };

  return (
    '<br>Cory,<br/><br/>Here is a custom material I designed on OCM Custom Builder ' +
    'on behalf of ' +
    (formData.companyName || 'UNNAMED') +
    ',</br>\n' +
    'as part of project "' +
    (formData.projectName || 'UNNAMED') +
    '"<br/>' +
    '<br/>Regards, <br/>' +
    (formData.designerName || 'UNNAMED') +
    '<br/>' +
    formData.email +
    '<br/><br/><br/>' +
    '<p style="font-weight: bold;">Finish Layers:</p>\n' +
    '<table style="width: 35%; border: 1px solid #ddd">\n' +
    '<tbody>\n' +
    '<tr>\n' +
    '<td><span style="font-weight: bold;">Layer</span></td>\n' +
    '<td><span style="font-weight: bold;">Pattern</span></td>\n' +
    '<td><span style="font-weight: bold;">HEX Color</span></td>\n' +
    '<td><span style="font-weight: bold;">Opacity</span></td>\n' +
    '</tr>\n' +
    layersTable +
    '</tbody>\n' +
    '</table>\n' +
    '<p>&nbsp;</p>'
  );
};

const sendOCMSummaryMail = async (projectLayers, snapshotURL, formData) => {
  const imageName = _generateImageName(formData);
  console.debug(`GoogleMailSender: RNSmtpMailer.sendMail=${RNSmtpMailer.sendMail}`);
  RNSmtpMailer.sendMail({
    mailhost: EMAIL_CREDENTIALS[CRED_SOURCE].mailhost,
    port: EMAIL_CREDENTIALS[CRED_SOURCE].port,
    ssl: true, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
    username: EMAIL_CREDENTIALS[CRED_SOURCE].username,
    password: EMAIL_CREDENTIALS[CRED_SOURCE].password,
    from: EMAIL_CREDENTIALS[CRED_SOURCE].from,
    recipients: `${EMAIL_CREDENTIALS[CRED_SOURCE].recipients},${formData.email}`,
    subject: 'Request quote for Custom Material',
    htmlBody: _createOCMSummaryBody(projectLayers, formData),
    attachmentPaths: [
      Platform.OS === 'ios' ? snapshotURL : snapshotURL.substring(7),
    ],
    attachmentNames: [imageName],
    attachmentTypes: ['image/png'],
  })
    .then(success => {
      alert(
        `GMAIL to host ${
          EMAIL_CREDENTIALS[CRED_SOURCE].mailhost
        } success: ${JSON.stringify(success)}`,
      );
      return success;
    })
    .catch(err => {
      alert(
        `GMAIL to host ${
          EMAIL_CREDENTIALS[CRED_SOURCE].mailhost
        } WTF: ${JSON.stringify(err)}`,
      );
      return err;
    });
};

module.exports = {
  sendOCMSummaryMail,
};
