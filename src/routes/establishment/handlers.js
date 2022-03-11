'use strict';

var 
    Crypto = require('../../lib/Crypto'),

    _ = require('underscore'),
    Async = require('async'),

    Users = require('../../database/models/users'),
    Rate = require('../../database/models/rate'),
    Ranking = require('../../database/models/ranking'),

    internals = {};

/**
* Handlers
*/
internals.dashboard = function (req, reply) {

var rate = {};
var reports = {};
var comment = {};
Async.series(
		[
		function(callback) {
			Rate.find({
        $and: [
          {establishment: req.auth.credentials.name},
          {report: true},
          {void: false}
        ]
      })
				.lean()
				.exec((err, data) => {
					if (err) {
						console.log(err);
					}
					reports=data;
					return callback(null);
				});
			},
      function(callback) {
        Rate.find({
          $and: [
            {establishment: req.auth.credentials.name},
            {concern: false},
            {rate: true},
            {report: false},
            {void: false}
          ]
        })
          .lean()
          .exec((err, data) => {
            if (err) {
              console.log(err);
            }
            comment=data;
            return callback(null);
          });
        },
        function(callback) {
            var condition = {
              $and: [
                {establishment: req.auth.credentials.name},
                {report: false},
                {rate: true},
                {void: false}
              ]
            };
            Rate.aggregate([
            { $match: condition },
            {
              $group: {
                _id: null,
                rCount: { $sum: 1 },
                rone: { $sum: "$rate_one" },
                rtwo: { $sum: "$rate_two" },
                rthree: { $sum: "$rate_three" },
                rfour: { $sum: "$rate_four" },
                rfive: { $sum: "$rate_five" },
                rsix: { $sum: "$rate_six" },
                rseven: { $sum: "$rate_seven" },
                reight: { $sum: "$rate_eight" },
                rnine: { $sum: "$rate_nine" },
                rten: { $sum: "$rate_ten" },
              }
            }
          ]).exec((err, data) => {
            if (err) {
              console.log("err", err);
            }
            if (data[0]) {
              rate.Cnt = data[0].rCount;
              rate.rateOne = data[0].rone.toFixed(2);
              rate.rateTwo = data[0].rtwo.toFixed(2);
              rate.rateThree = data[0].rthree.toFixed(2);
              rate.rateFour = data[0].rfour.toFixed(2);
              rate.rateFive = data[0].rfive.toFixed(2);
              rate.rateSix = data[0].rsix.toFixed(2);
              rate.rateSeven = data[0].rseven.toFixed(2);
              rate.rateEight = data[0].reight.toFixed(2);
              rate.rateNine = data[0].rnine.toFixed(2);
              rate.rateTen = data[0].rten.toFixed(2);
            } else {
              rate.rateOne = 0;
              rate.rateTwo = 0;
              rate.rateThree = 0;
              rate.rateFour = 0;
              rate.rateFive = 0;
              rate.rateSix = 0;
              rate.rateSeven = 0;
              rate.rateEight = 0;
              rate.rateNine = 0;
              rate.rateTen = 0;
            }
            return callback(null);
          });
        },
		],
		function (callback) {
      reply.view('establishment/dashboard.html', {
        credentials: req.auth.credentials,
        message:req.query.message,
        alertType: req.query.alertType,
        success: req.query.success,
        reports: reports,
        comment: comment,
        rate
      });
		},
	);
}
//Dashboard Search
internals.dashboard_search = function (req, reply) {
 
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;
  var start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  var end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  if(startDate == '' || endDate == ''){
    console.log('trueeeeeee')
    reply.redirect('/establishment/dashboard');
  }

  var rate = {};
  var reports = {};
  var comment = {};


  Async.series(
      [
        function(callback) {
          Rate.find({
            $and: [
              {createdAt: { $gte: start, $lt: end}},
              {establishment: req.auth.credentials.name},
              {concern: false},
              {rate: true},
              {report: false},
              {void: false}
            ]
          })
            .lean()
            .exec((err, data) => {
              if (err) {
                console.log(err);
              }
              comment=data;
              return callback(null);
            });
          },
      function(callback) {
        var condition = {
          $and: [
            {establishment: req.auth.credentials.name},
            {createdAt: { $gte: start, $lt: end}},
            {report: true},
            {void: false}
          ]
        };
        Rate.aggregate([{
          $match: condition
        }])
          .exec((err, data) => {
            if (err) {
              console.log(err);
            }
            reports=data;
            return callback(null);
          });
        },
          function(callback) {
            var condition = {
              $and: [
                {establishment: req.auth.credentials.name},
                {createdAt: { $gte: start, $lt: end}},
                {report: false},
                {rate: true},
                {void: false}
              ]
            };
            Rate.aggregate([
            { $match: condition },
            {
              $group: {
                _id: null,
                rCount: { $sum: 1 },
                rone: { $sum: "$rate_one" },
                rtwo: { $sum: "$rate_two" },
                rthree: { $sum: "$rate_three" },
                rfour: { $sum: "$rate_four" },
                rfive: { $sum: "$rate_five" },
                rsix: { $sum: "$rate_six" },
                rseven: { $sum: "$rate_seven" },
                reight: { $sum: "$rate_eight" },
                rnine: { $sum: "$rate_nine" },
                rten: { $sum: "$rate_ten" },
              }
            }
          ]).exec((err, data) => {
            if (err) {
              console.log("err", err);
            }
            if (data[0]) {
              rate.Cnt = data[0].rCount;
              rate.rateOne = data[0].rone.toFixed(2);
              rate.rateTwo = data[0].rtwo.toFixed(2);
              rate.rateThree = data[0].rthree.toFixed(2);
              rate.rateFour = data[0].rfour.toFixed(2);
              rate.rateFive = data[0].rfive.toFixed(2);
              rate.rateSix = data[0].rsix.toFixed(2);
              rate.rateSeven = data[0].rseven.toFixed(2);
              rate.rateEight = data[0].reight.toFixed(2);
              rate.rateNine = data[0].rnine.toFixed(2);
              rate.rateTen = data[0].rten.toFixed(2);
            } else {
              rate.rateOne = 0;
              rate.rateTwo = 0;
              rate.rateThree = 0;
              rate.rateFour = 0;
              rate.rateFive = 0;
              rate.rateSix = 0;
              rate.rateSeven = 0;
              rate.rateEight = 0;
              rate.rateNine = 0;
              rate.rateTen = 0;
            }
            return callback(null);
          });
        },
      ],
      function (callback) {
        reply.view('establishment/dashboard.html', {
          credentials: req.auth.credentials,
          reports: reports,
          comment: comment,
          rate
        });
      },
    );
  }

  internals.reply_reports = function (req, reply) {
    var payload = {
      reply: req.payload.reply,
    };
    Rate.update(
      { _id: req.payload._id },
      {
        $set: payload,
      },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          reply.redirect('/establishment/dashboard?message=Successfully submit!&alertType=success');
        }
      },
    );
  };
  internals.reply_concern = function (req, reply) {
    var payload = {
      reply: req.payload.reply,
    };
    Rate.update(
      { _id: req.payload._id },
      {
        $set: payload,
      },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          reply.redirect('/establishment/dashboard?message=Successfully submit!&alertType=success');
        }
      },
    );
  };
  //UPDATE PASSWORD
internals.change = function (req, reply) {

	var payload = {
		password: Crypto.encrypt(req.payload.password),
	};
	if(req.auth.credentials.password == Crypto.encrypt(req.payload.confirmPassword)){
		console.log('Updated by: ', req.auth.credentials._id);
		Users.update(
			{ _id: req.auth.credentials._id },
			{
				$set: payload,
			},
			function (err, data) {
				if (err) {
					console.log(err);
				} else {
					reply.redirect('/establishment/dashboard?message=Password Successfully Changed!&alertType=success');
				}
			},
		);
	}else{
		reply.redirect('/establishment/dashboard?message=Invalid Password!&alertType=danger');
	}
};
module.exports = internals;
