'use strict';
/**
 * ## Imports
 *
 */
//Handle the endpoints
var Handlers = require('./handlers'),

    CONFIG = require('../../config'),

    Joi = require('joi'),

    internals = {};

internals.endpoints = [
  {
    method: 'GET',
    path: '/signup',
    handler: Handlers.signup,
    config: {
      description: 'signup',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/create',
    handler: Handlers.create
  },
];

module.exports = internals;
