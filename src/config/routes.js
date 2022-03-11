'use strict';

var AuthRoutes = require('../routes/auth/endpoints'),
    SignupRoutes = require('../routes/account/endpoints'),

    //Admin
    AdminRoutes = require('../routes/admin/endpoints'),

    //Visitor
    VisitorRoutes = require('../routes/visitor/endpoints'),

    //Establishment
    EstablishmentRoutes = require('../routes/establishment/endpoints'),

    internals = {};

//Concatentate the routes into one array
internals.routes = [].concat(
                            //Account
                            AuthRoutes.endpoints,
                            //Signup
                            SignupRoutes.endpoints,
                            //Admin
                            AdminRoutes.endpoints,
                            //Visitor
                            VisitorRoutes.endpoints,
                            //Establishment
                            EstablishmentRoutes.endpoints
                            );

//set the routes for the server
internals.init = function (server) {
    server.route(internals.routes);
};

module.exports = internals;
