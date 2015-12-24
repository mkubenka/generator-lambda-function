'use strict';

module.exports = {
  region: 'us-east-1',
  handler: 'index.handler',
  description: 'Simple Lambda Function',
  role: process.env.IAM_ROLE,
  functionName: 'HelloWorldSample',
  timeout: 10,
  memorySize: 128,
  runtime: 'nodejs'
};
