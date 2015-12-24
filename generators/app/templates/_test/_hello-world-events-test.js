'use strict';
var assert = require('assert');
var HelloWorld = require('../index');

require('dotenv').load();

describe('HelloWorld', function () {

  before(function (done) {
    done();
  });

  after(function (done) {
    done();
  });

  it('report all three values in the event', function (done) {


    var testObject = require('./event.json');
    var testContext = {
      succeed: function (message) {
        assert.equal(testObject.key1, message);
        done();
      }
    };

    HelloWorld.handler(testObject, testContext);

  });

  it('report an error if the event keys do not match', function (done) {


    var testObject = require('./bad-event.json');
    var testContext = {
      fail: function (message) {
        assert.equal('Event specification invalid.', message);
        done();
      }
    };

    HelloWorld.handler(testObject, testContext);

  });

});

