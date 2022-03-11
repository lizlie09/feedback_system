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
    path: '/establishment/dashboard',
    handler: Handlers.dashboard,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['establishment'],
      },
      description: 'Establishment Dashboard',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/establishment/dashboard_search',
    handler: Handlers.dashboard_search,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['establishment'],
      },
      description: 'Establishment Dashboard search',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/establishment/reply-reports',
    handler: Handlers.reply_reports,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['establishment'],
      },
      description: 'Establishment Reply reports',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/establishment/reply-concern',
    handler: Handlers.reply_concern,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['establishment'],
      },
      description: 'Establishment Reply concern',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/establishment/dashboard/changepassword',
    handler: Handlers.change,
    config: {
        auth: {
            strategy: 'standard',
            scope: ['establishment'],
        },
        description: 'Update password',
        tags: ['api']
    }
  },
];

module.exports = internals;
