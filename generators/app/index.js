'use strict';
var path = require('path');
var mkdirp = require('mkdirp');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
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
        type: 'list',
        name: 'region',
        message: 'In what AWS region would you like your service deployed??',
        choices: [{
          name: 'us-east-1',
          value: 'us-east-1'
        }, {
          name: 'us-west-1',
          value: 'us-west-1'
        }],
        default: 1
      },
      {
        type: 'input',
        name: 'author',
        message: 'What is the name and/or email of the author?'
      },
      {
        type: 'input',
        name: 'githubUser',
        message: 'What is the GitHub User or Organization name for this repository?'
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

  default: function () {
    if (path.basename(this.destinationPath()) !== this.props.functionName) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.functionName + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.functionName);
      this.destinationRoot(this.destinationPath(this.props.functionName));
    }

  },

  writing: function () {
    var properties = {
      functionName: this.props.functionName,
      description: this.props.description,
      author: this.props.author,
      s3Bucket: this.props.s3Bucket,
      region: this.props.region,
      githubUser: this.props.githubUser
    };

    //Templated files
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('index.js'),
      properties
    );

    this.fs.copyTpl(
      this.templatePath('lambda-config.js'),
      this.destinationPath('lambda-config.js'),
      properties
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      properties
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      properties
    );

    this.fs.copyTpl(
      this.templatePath('.travis.yml'),
      this.destinationPath('.travis.yml'),
      properties
    );

    //Copied files
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
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
