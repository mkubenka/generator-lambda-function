'use strict';

console.log('Loading function');

module.exports.handler = function (event, context) {

  if (typeof event.key1 !== 'undefined' &&
    typeof event.key2 !== 'undefined' &&
    typeof event.key3 !== 'undefined') {

    console.log('value1 =', event.key1);
    console.log('value2 =', event.key2);
    console.log('value3 =', event.key3);
    context.succeed(event.key1);  // Echo back the first key value

  } else {
    context.fail('Event specification invalid.');
  }

};
