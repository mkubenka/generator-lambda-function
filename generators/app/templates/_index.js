'use strict';

console.log('Loading function');

exports.handler = function (event, context) {

  if (typeof event.key1 !== 'undefined' &&
    typeof event.key2 !== 'undefined' &&
    typeof event.key3 !== 'undefined') {

    console.log('v1 =', event.key1);
    console.log('value2 =', event.key2);
    console.log('vTHREE =', event.key3);
    context.succeed(event.key1);  // Echo back the first key value

  } else {
    context.fail('Event specification invalid.');
  }

};
