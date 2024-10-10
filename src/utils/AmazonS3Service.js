import AWS from 'aws-sdk';

import { AWS_S3_ACCESS_KEY_ID, AWS_S3_BUCKET, AWS_S3_REGION, AWS_S3_SECRET_ACCESS_KEY } from "../utils/AssetManager";

export const uploadFileToS3 = async (companyName, projectName, referenceNumber, snapshot) => {
  const S3_BUCKET = AWS_S3_BUCKET;
  const REGION = AWS_S3_REGION;

  AWS.config.update({
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const params = {
    Bucket: S3_BUCKET,
    Key: `${companyName}/${projectName}_${referenceNumber}.png`,
    Body: snapshot,
  };

  const upload = s3
    .putObject(params)
    .on("httpUploadProgress", (evt) => {
      console.log(
        "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
      );
    })
    .promise();

  await upload.then((err, data) => {
    console.log(err);
    alert("File uploaded successfully.");
  });
};
