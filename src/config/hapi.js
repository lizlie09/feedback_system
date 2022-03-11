'use strict';

/**
* ## Imports
*
*/
var 
    Config = require('../config'),
    Hapi = require('hapi'),
    // // the authentication strategy
    Auth = require('../auth/strategy'),
    // // kind of like underscore, but specific to Hapi
    Hoek = require('hoek'),

    // some additional services
    Plugins = require('./plugins'),
    // the routes we'll support
    Routes = require('./routes'),
    // the view, mainly for reset password
    Views = require('./views');

var internals = {};

//The real Hapi server!
internals.server = new Hapi.Server({ debug: { request: ['error'] } });
internals.server.payload = new Buffer(104857610);
//Setup the connection for the environment
//
internals.server.connection({
  host: Config.env.dev ? '0.0.0.0' : '127.0.0.1',
  port: 80,
  // routes: {log: true, cors: false},
  routes: {
    cors: {
        origin: ['*'], // an array of origins or 'ignore'
        headers: ['Authorization'], // an array of strings - 'Access-Control-Allow-Headers'
        // headers: ["Access-Control-Allow-Origin", "*"], 
        // res.header("Access-Control-Allow-Origin", "*");
        headers: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"],
        exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
        additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
        maxAge: 60,
        credentials: true // boolean - 'Access-Control-Allow-Credentials'
    },
    log: true
  },
});

// register plugins
internals.server.register(Plugins.get(), (err) => {
  Hoek.assert(!err,err);
});

// // configure jwt strategy
Auth.setStrategy(internals.server);

// set views
Views.init(internals.server);

// set routes
Routes.init(internals.server);

module.exports = internals.server;
