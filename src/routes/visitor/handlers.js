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
  var establishments = {};
	Async.series(
		[
      (callback) => {
        Users.find({
			$and: [
				{void: false},
				{isEstablishment: true}
			]
		})
					.lean()
					.exec((err, data) => {
						if (err) {
							console.log(err);
						}
						establishments = data;
						return callback(null);
					});
      },
    ],
    function (callback) {
		reply.view('visitor/rate.html', {
			credentials: req.auth.credentials,
			message: req.query.message,
			alertType: req.query.alertType,
			success: req.query.success,
			establishments
		});
    }
  );
}
//Creating Rating Stars
internals.ratings = function(req, reply){
	//Get year
	const d = new Date();
	let year = d.getFullYear();
	console.log(req.payload.rateComment);
	var concern = false;
	//Check if rate is null
	if (req.payload.star1 == null || req.payload.star2 == null || req.payload.star3 == null || req.payload.star4 == null || req.payload.star5 == null || req.payload.star6 == null || req.payload.star7 == null || req.payload.star8 == null || req.payload.star9 == null || req.payload.star10 == null || req.payload.establishment == null || req.payload.fullname == null){
		reply.redirect('/rate?message= Error Please fillup the form&alertType=danger');
	}
	else{
		//Check if comment is empty
		if(req.payload.rateComment == ''){
			concern=true
		}
		var payload = {
			rate: true,
			rateComment: req.payload.rateComment,
			fullname : req.payload.fullname,
			establishment : req.payload.establishment,
			rate_one : req.payload.star1,
			rate_two : req.payload.star2,
			rate_three : req.payload.star3,
			rate_four : req.payload.star4,
			rate_five : req.payload.star5,
			rate_six : req.payload.star6,
			rate_seven: req.payload.star7,
			rate_eight : req.payload.star8,
			rate_nine : req.payload.star9,
			rate_ten : req.payload.star10,
			concern: concern
		};
		
		console.log("===========D", req.payload.establishment, year);
		Ranking.findOne({
		$and:[
			{name: req.payload.establishment},
			{year: year}
		]})
		.lean()
		.exec((err, dataTotal) => {
			if (err) {
				console.log(err);
			}
			//Old establishment and year
			if(dataTotal!=null){
				var input = parseInt(req.payload.star1) + parseInt(req.payload.star2) + parseInt(req.payload.star3) + parseInt(req.payload.star4) + parseInt(req.payload.star5)
				 + parseInt(req.payload.star6) + parseInt(req.payload.star7) + parseInt(req.payload.star8) + parseInt(req.payload.star9) + parseInt(req.payload.star10);
				var total = parseInt(dataTotal.rate) + parseInt(input);
				var inc = parseInt(dataTotal.increment) + 1;
				var rankings = {
					name : req.payload.establishment,
					year : year,
					rate: total,
					increment: inc
				};
				Ranking.update(
					{ _id: dataTotal._id },
					{
						$set: rankings,
					},
					function (err, dataSave) {
						if (err) {
							console.log(err);
						}
						console.log(dataSave);
						var rate = new Rate(payload);
						rate.save(function(err, data){
							if(err){
								console.log(err)
							}
							console.log(data);
							reply.redirect('/visitor/dashboard?message=Successfully Rated&alertType=success');
						})
					},
				);
			}else{
			//New establishment and year
				var input = parseInt(req.payload.star1) + parseInt(req.payload.star2) + parseInt(req.payload.star3) + parseInt(req.payload.star4) + parseInt(req.payload.star5)
				+ parseInt(req.payload.star6) + parseInt(req.payload.star7) + parseInt(req.payload.star8) + parseInt(req.payload.star9) + parseInt(req.payload.star10);
				var inc = 1;
				var rankings = {
					name : req.payload.establishment,
					year : year,
					rate: input,
					increment: inc
				};
				console.log(input, '=========', rankings.rate);
				var rateTotal = new Ranking(rankings);
				rateTotal.save(function(err, dataSave){
					if(err){
						console.log(err)
					}
					console.log(dataSave);
					var rate = new Rate(payload);
					rate.save(function(err, data){
						if(err){
							console.log(err)
						}
						console.log(data);
						reply.redirect('/visitor/dashboard?message=Successfully Rated&alertType=success');
					})
				})
			}
		});
	}
	
}
internals.reports = function (req, reply) {
	var payload = req.payload;
	  var rate = new Rate(payload);
	  rate.save(function(err, data) {
		  if (err) {
		  console.log(err);
		  } else {
			  return reply({
				  status: 200,
				  message: '',
			  });
		  }
	  });
  }
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
					reply.redirect('/visitor/dashboard?message=Password Successfully Changed!&alertType=success');
				}
			},
		);
	}else{
		reply.redirect('/visitor/dashboard?message=Invalid Password!&alertType=danger');
	}
};
module.exports = internals;
