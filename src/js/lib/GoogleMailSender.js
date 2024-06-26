import RNSmtpMailer from 'react-native-smtp-mailer';
import _ from 'lodash';
import {PLATFORM} from './DeviceDimensionManager';

const _generateImageName = (styleName, formData) => {
  const c = str => {
    return str.replace(/\W+/g, '_');
  };
  // Company-Project-Person-Style-Timestamp.png
  return `${c(formData.companyName)}-${c(formData.projectName)}-${c(
    formData.name,
  )}-${c(styleName)}-${Date.now()}.png`;
};

const EMAIL_CREDENTIALS = {
  mailtrap: {
    mailhost: 'smtp.mailtrap.io',
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

const CRED_SOURCE = 'OCM';

const _createOCMSummaryBody = (wizardData, formData) => {
  const {backgroundColor, styleLayers} = wizardData;

  let layersTable = '';
  styleLayers.forEach(layer => {
    layersTable +=
      '<tr><td>' +
      layer.layerId +
      '</td><td>' +
      layer.printRollerName +
      '</td><td>' +
      layer.color.name +
      '</td><td>' +
      (layer.printRollerOpacity
        ? Math.round(layer.printRollerOpacity * 100) + '%'
        : '100%') +
      '</td><td>' +
      (layer.color.notes || '') +
      '</td></tr>';
  });

  return (
    '<br>Cory,<br/><br/>Here is a custom material I designed on OCM Custom Builder ' +
    'on behalf of ' +
    (formData.companyName || 'UNNAMED') +
    ',</br>\n' +
    'as part of project "' +
    (formData.projectName || 'UNNAMED') +
    '"<br/>' +
    '<br/>Regards, <br/>' +
    (formData.name || 'UNNAMED') +
    '<br/>' +
    formData.email +
    '<br/><br/><br/>' +
    '<table>\n' +
    '<tbody>\n' +
    '<tr>\n' +
    '<td><span style="font-weight: bold">Style Name:</span></td>\n' +
    '<td>"' +
    wizardData.styleName +
    '"</td>\n' +
    '</tr>\n' +
    '<tr>\n' +
    '<td><span style="font-weight: bold;">Background Color:</span></td>\n' +
    '<td>' +
    (backgroundColor.name.startsWith('#')
      ? backgroundColor.name
      : _.startCase(backgroundColor.name)) +
    '  ' +
    (backgroundColor.notes || '') +
    '</td>\n' +
    '</tr>\n' +
    '</tbody>\n' +
    '</table>\n' +
    '<p style="font-weight: bold;">Print Roller Layers:</p>\n' +
    '<table style="width: 35%; border: 1px solid #ddd">\n' +
    '<tbody>\n' +
    '<tr>\n' +
    '<td><span style="font-weight: bold;">Layer No.</span></td>\n' +
    '<td><span style="font-weight: bold;">Print Roller</span></td>\n' +
    '<td><span style="font-weight: bold;">RGB Color</span></td>\n' +
    '<td><span style="font-weight: bold;">Opacity</span></td>\n' +
    '<td><span style="font-weight: bold;">Notes</span></td>\n' +
    '</tr>\n' +
    layersTable +
    '</tbody>\n' +
    '</table>\n' +
    '<p>&nbsp;</p>'
  );
};

const sendOCMSummaryMail = async (
  wizardData,
  snapshotName,
  snapshotURL,
  formData,
) => {
  const imageName = _generateImageName(wizardData.styleName, formData);
  console.debug(`GoogleMailSender: URL=${JSON.stringify(snapshotURL)}`);
  console.debug(`GoogleMailSender: TARGET=${CRED_SOURCE}`);
  RNSmtpMailer.sendMail({
    mailhost: EMAIL_CREDENTIALS[CRED_SOURCE].mailhost,
    port: EMAIL_CREDENTIALS[CRED_SOURCE].port,
    ssl: false, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
    username: EMAIL_CREDENTIALS[CRED_SOURCE].username,
    password: EMAIL_CREDENTIALS[CRED_SOURCE].password,
    from: EMAIL_CREDENTIALS[CRED_SOURCE].from,
    recipients: `${EMAIL_CREDENTIALS[CRED_SOURCE].recipients},${formData.email}`,
    subject: 'Request quote for Custom Material',
    htmlBody: _createOCMSummaryBody(wizardData, formData),
    attachmentPaths: [
      PLATFORM === 'iOS' ? snapshotURL : snapshotURL.substring(7),
    ],
    attachmentNames: [imageName],
    attachmentTypes: ['image/png'],
  })
    .then(success => {
      console.log(
        `GMAIL to host ${
          EMAIL_CREDENTIALS[CRED_SOURCE].mailhost
        } success: ${JSON.stringify(success)}`,
      );
      return success;
    })
    .catch(err => {
      console.log(
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
