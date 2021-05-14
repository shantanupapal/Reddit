const {
  AWS_ID,
  AWS_SECRET,
  AWS_BUCKET_NAME,
  awsPermission,
} = require("./awsImageUpload");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: AWS_ID,
  secretKey: AWS_SECRET,
});

function uploadFileToS3(file, module, user_id) {
  let promise = new Promise((resolve, reject) => {
    const params = {
      Bucket: AWS_BUCKET_NAME + "/" + module + "/" + user_id,
      Key: file.originalname,
      ContentType: file.mimetype,
      Body: file.originalname,
      ACL: awsPermission,
    };

    s3.upload(params, function (s3Err, resp) {
      if (s3Err) {
        console.log(s3Err);

        reject(s3Err);
      } else {
        imageUrl = resp.Location;

        resolve(resp);
      }
    });
  });
  return promise;
}

module.exports = uploadFileToS3;
