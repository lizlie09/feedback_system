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
    path: '/admin/dashboard',
    handler: Handlers.dashboard,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['admin'],
      },
      description: 'Admin Dashboard',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/admin/ranking',
    handler: Handlers.ranking,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['admin'],
      },
      description: 'Admin Ranks',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/admin/establishment',
    handler: Handlers.establishment,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['admin'],
      },
      description: 'Admin Establishment',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/admin/dashboard_search',
    handler: Handlers.dashboard_search,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['admin'],
      },
      description: 'Admin Dashboard search',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/admin/ranking_search',
    handler: Handlers.ranking_search,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['admin'],
      },
      description: 'Admin Ranking search',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/admin/create_establishment',
    handler: Handlers.createEstablishment,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['admin'],
      },
      description: 'Admin create Establishment',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/admin/update_establishment',
    handler: Handlers.updateEstablishment,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['admin'],
      },
      description: 'Admin create Establishment',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/admin/dashboard/update-reports',
    handler: Handlers.reply_reports,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['admin'],
      },
      description: 'admin Reply reports',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/admin/dashboard/update-concern',
    handler: Handlers.reply_concern,
    config: {
      auth: {
        strategy: 'standard',
        scope: ['admin'],
      },
      description: 'admin Reply reports',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/admin/dashboard/changepassword',
    handler: Handlers.change,
    config: {
        auth: {
            strategy: 'standard',
            scope: ['admin'],
        },
        description: 'Update password',
        tags: ['api']
    }
  },
];

module.exports = internals;
