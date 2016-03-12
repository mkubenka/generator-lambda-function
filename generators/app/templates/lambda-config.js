'use strict';

require('dotenv').config();

module.exports = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID : '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY : '',
  profile: process.env.AWS_PROFILE ? process.env.AWS_PROFILE : '',
  region: '<%= region %>',
  handler: 'index.handler',
  description: '<%= description %>',
  role: process.env.IAM_ROLE,
  functionName: '<%= functionName %>',
  timeout: 10,
  memorySize: 128,
  runtime: 'nodejs'
};
