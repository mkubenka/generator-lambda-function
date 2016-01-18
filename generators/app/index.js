'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('AWS Lambda Function') + ' generator is powered up and fully operational!'
    ));
    this.log(yosay(
      'Please answer the following questions to setup the initial configuration. ' +
      'You can always change these settings later.'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'functionName',
        message: 'What is the name of your service?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'How would you describe the purpose of your service?',
        default: 'A riddle, wrapped in a mystery, inside an enigma.'
      },
      {
        type: 'input',
        name: 'region',
        message: 'In what AWS region would you like your service configured?',
        default: 'us-east-1'
      },
      {
        type: 'input',
        name: 'author',
        message: 'What is the name and/or email of the author?',
        default: ''
      },
      {
        type: 'input',
        name: 'githubUser',
        message: 'What is the GitHub User Name?',
        default: ''
      },
      {
        type: 'input',
        name: 's3Bucket',
        message: 'What S3 bucket would you like to store the artifacts?',
        default: 'dist-lambda-service'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {

    //Root files
    this.fs.copy(
      this.templatePath('_index.js'),
      this.destinationPath('index.js')
    );

    this.fs.copy(
      this.templatePath('_lambda-config.js'),
      this.destinationPath('lambda-config.js')
    );

    this.fs.copy(
      this.templatePath('_gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    this.fs.copy(
      this.templatePath('_package.json'),
      this.destinationPath('package.json')
    );

    this.fs.copy(
      this.templatePath('_README.md'),
      this.destinationPath('README.md')
    );

    this.fs.copy(
      this.templatePath('_default.env'),
      this.destinationPath('default.env')
    );

    this.fs.copy(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('_.npmignore'),
      this.destinationPath('.npmignore')
    );

    this.fs.copy(
      this.templatePath('_.travis.yml'),
      this.destinationPath('.travis.yml')
    );

    //Test Files
    this.fs.copy(
      this.templatePath('_test/_bad-event.json'),
      this.destinationPath('test/bad-event.json')
    );

    this.fs.copy(
      this.templatePath('_test/_event.json'),
      this.destinationPath('test/event.json')
    );

    this.fs.copy(
      this.templatePath('_test/_hello-world-events-test.js'),
      this.destinationPath('test/hello-world-events-test.js')
    );

  },

  install: function () {
    this.installDependencies();
  }
});
