'use strict';

module.exports = {
  region: '<%= region %>',
  handler: 'index.handler',
  description: '<%= description %>',
  role: process.env.IAM_ROLE,
  functionName: '<%= functionName %>',
  timeout: 10,
  memorySize: 128,
  runtime: 'nodejs'
};
