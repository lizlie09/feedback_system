'use strict';

var HapiServer = require('./src/config/hapi');
var Mongoose = require('mongoose');
var Transactionwatch = require('./src/lib/project/transactionwatch/lib/transactionwatch');

Transactionwatch.init(Mongoose);

var roller = Transactionwatch.Roller();

require('./src/database/mongodb');

roller.roll()
.then(function(){
//   start server
	HapiServer.start(function () {
		console.log('Server is running: ' + HapiServer.info.uri);
	});
});
