/**
 * # ErrorAlert.js
 *
 * This class uses a component which displays the appropriate alert
 * depending on the platform
 *
 * The main purpose here is to determine if there is an error and then
 * plucking off the message depending on the shape of the error object.
 */
'use strict';
/**
* ## Imports
*
*/
var internals = {};

internals.setAuthStrategy = function (server) {
  server.auth.strategy('standard', 'cookie', {
      password: 'p*ssword33cretl1zzlieee41321password33cretl1zzlieee41321', // cookie secret
      cookie: 'feedback-cookie',
      redirectTo: '/landing?message=Session expired! Please Sign in to continue.&alertType=warning',
      isSecure: false,
      ttl: 1000 * 60 * 60 * 24,
  });
};

module.exports = {
  setStrategy: internals.setAuthStrategy
};
