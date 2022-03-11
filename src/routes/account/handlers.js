'use strict';

var 
    Crypto = require('../../lib/Crypto'),
    Async = require("async"),
    _ = require('underscore'),

    Users = require('../../database/models/users'),

    internals = {};

/**
* Handlers
*/
internals.signup = function (req, reply) {
  reply.view('signup.html', {
    message: req.query.message,
    alertType: req.query.alertType,
    success: req.query.success
  });
}
//CREATE ACCOUNT
internals.create = function(req, reply){

  var payload = {
    firstname: req.payload.firstname,
    lastname: req.payload.lastname,
    middlename: req.payload.middlename,
    email: req.payload.email,
    password: Crypto.encrypt(req.payload.password),
    scope: ['visitor']
  };
  Users.findOne({email: req.payload.email})
    .lean()
    .exec((err, data) => {
      if (err) {
        console.log(err);
      }
      //check email if existed
      if(data!=null){
        reply.redirect(
          "/signup?message=Email is already exist! &alertType=danger"
        );
      }else{
        var user = new Users(payload);
        user.save(function(err, user) {
          if (err) {
            console.log(err);
          } else {
            console.log(user);
            reply.redirect(
              "/login?message=Hello " +
                req.payload.lastname + ", " + req.payload.firstname +
                " you have successfully registered! Please sign in to continue.&alertType=success"
            );
          }
        });
      }
   });
}

module.exports = internals;
