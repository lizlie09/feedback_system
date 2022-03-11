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
    method: [ 'GET', 'POST' ],
    path: '/noscript',
    handler: Handlers.noscript,
    config: {
      description: 'noscript',
      tags: ['api'],
    }
  },
  {
    method: [ 'GET', 'POST' ],
    path: '/{any*}',
    handler: Handlers.error404,
    config: {
      description: '404',
      tags: ['api'],
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: Handlers.landing,
    config: {
      auth: {
        strategy: 'standard',
      },
      description: 'Login in',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/landing',
    handler: Handlers.landing,
  },
  {
    method: 'POST',
    path: '/auth/login',
    handler: Handlers.authentication,
    config: {
      description: 'Authentication',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/logout',
    handler: Handlers.logout,
    config: {
      description: 'Logout',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/login',
    handler: Handlers.login,
    config: {
      description: 'Login',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/rate',
    handler: Handlers.rate,
    config: {
      description: 'Ratings',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/rate/ratings',
    handler: Handlers.ratings,
    config: {
      description: 'Rating',
      tags: ['api']
    }
  }
];

module.exports = internals;
