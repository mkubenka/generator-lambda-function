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
        type: 'checkbox',
        name: 'region',
        message: 'In what AWS region would you like your service deployed??',
        choices: [{
          name: 'us-east-1',
          value: 'us-east-1',
          checked: true
        }, {
          name: 'us-west-1',
          value: 'us-west-1',
          checked: false
        }]},
      {
        type: 'input',
        name: 'author',
        message: 'What is the name and/or email of the author?',
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
      this.templatePath('index.js'),
      this.destinationPath('index.js')
    );

    this.fs.copy(
      this.templatePath('lambda-config.js'),
      this.destinationPath('lambda-config.js')
    );

    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );

    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );

    this.fs.copy(
      this.templatePath('default.env'),
      this.destinationPath('default.env')
    );

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('.npmignore'),
      this.destinationPath('.npmignore')
    );

    this.fs.copy(
      this.templatePath('.travis.yml'),
      this.destinationPath('.travis.yml')
    );

    //Test Files
    this.fs.copy(
      this.templatePath('test/bad-event.json'),
      this.destinationPath('test/bad-event.json')
    );

    this.fs.copy(
      this.templatePath('test/event.json'),
      this.destinationPath('test/event.json')
    );

    this.fs.copy(
      this.templatePath('test/hello-world-events-test.js'),
      this.destinationPath('test/hello-world-events-test.js')
    );

  },

  install: function () {
    this.installDependencies({ bower: false });
  }
});
