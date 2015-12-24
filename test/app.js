'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-lambda-function:app', function () {

  before(function (done) {

    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done);

  });

  it('creates the core set of files', function () {
    assert.file([
      'index.js',
      'lambda-config.js',
      'gulpfile.js',
      'package.json',
      'README.md',
      'default.env',
      '.gitignore',
      '.npmignore',
      '.travis.yml'
    ]);
  });

  it('creates the test files', function () {
    assert.file([
      'test/hello-world-events-test.js',
      'test/event.json',
      'test/bad-event.json'
    ]);
  });

  //TODO
  // Setup Git repo and publish to Gitbuh?
  // Setup Travis CI?

});
