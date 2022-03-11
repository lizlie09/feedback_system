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
    path: '/visitor/dashboard',
    handler: Handlers.dashboard,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['visitor'],
      },
      description: 'Visitor Dashboard',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/visitor/ratings',
    handler: Handlers.ratings,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['visitor'],
      },
      description: 'Visitor Dashboard',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/visitor/reports',
    handler: Handlers.reports,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['visitor'],
      },
      description: 'Visitor Dashboard',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/visitor/dashboard/changepassword',
    handler: Handlers.change,
    config: {
        auth: {
            strategy: 'standard',
            scope: ['visitor'],
        },
        description: 'Update password',
        tags: ['api']
    }
  },
];

module.exports = internals;
